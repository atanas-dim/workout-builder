import type { NextApiRequest, NextApiResponse } from "next";

import { Timestamp, doc, updateDoc } from "firebase/firestore";

import { firestore } from "../../firebase/config";

import Cors from "cors";

export function initMiddleware(middleware: any) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function appVersionUpdate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run cors
  await cors(req, res);

  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  if (req.body.deployment_status.state === "success") {
    const docRef = doc(firestore, "app", "general");

    await updateDoc(docRef, {
      updated: Timestamp.fromDate(new Date()).seconds,
    });
  }
  res.status(200);
}
