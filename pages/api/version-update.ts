import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/config";

const WEBHOOK_SECRET = process.env.NEXT_PUBLIC_VERSION_UPDATE_SECRET;
const SIG_HEADER_NAME = "x-hub-signature-256";
const SIG_HASH_ALG = "sha256";

function validateJsonWebhook(request: NextApiRequest) {
  if (!WEBHOOK_SECRET) return;

  const signatureHeader = request.headers[SIG_HEADER_NAME];

  const expectedSignature =
    SIG_HASH_ALG +
    "=" +
    crypto
      .createHmac(SIG_HASH_ALG, WEBHOOK_SECRET)
      .update(JSON.stringify(request.body))
      .digest("hex");

  if (signatureHeader === expectedSignature) return true;

  return false;
}

export default async function appVersionUpdate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
  }

  if (req.body.deployment.environment !== "Production")
    return res
      .status(200)
      .send({ environment: req.body.deployment.environment });

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
