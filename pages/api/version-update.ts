import type { NextApiRequest, NextApiResponse } from "next";

import { Timestamp, doc, updateDoc } from "firebase/firestore";

import { firestore } from "../../firebase/config";

import crypto from "crypto";

const WEBHOOK_SECRET = process.env.NEXT_PUBLIC_VERSION_UPDATE_SECRET;

const SIG_HEADER_NAME = "X-Hub-Signature-256";
const SIG_HASH_ALG = "sha256";

function validateJsonWebhook(request: NextApiRequest) {
  if (!WEBHOOK_SECRET) return;

  const signatureHeader = request.headers["x-hub-signature-256"];

  const sig =
    "sha256=" +
    crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(JSON.stringify(request.body))
      .digest("hex");

  if (signatureHeader === sig) return true;

  return false;
}

export default async function appVersionUpdate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
  }

  const validated = validateJsonWebhook(req);

  if (!validated) return res.status(403).end();

  if (req.body.deployment_status.state === "success") {
    const docRef = doc(firestore, "app", "general");

    await updateDoc(docRef, {
      updated: Timestamp.fromDate(new Date()).seconds,
    })
      .then(() => {
        return res.status(200).send({ updated: true });
      })
      .catch((error) => {
        return res.status(400).send({ error });
      });
  }

  return res.status(200).end();
}
