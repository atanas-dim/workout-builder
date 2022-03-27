import type { NextApiRequest, NextApiResponse } from "next";

import { Timestamp, doc, updateDoc } from "firebase/firestore";

import { firestore } from "../../firebase/config";

export default async function appVersionUpdate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
  }

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

  return res.status(500).end();
}
