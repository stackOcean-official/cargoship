import type { NextApiRequest, NextApiResponse } from "next";

///api/submissionSession
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // POST /api/r/host
  // Host a new R model
  // Required fields in body: -
  // Optional fields in body: -
  if (req.method === "POST") {
    console.log(JSON.stringify(req.body, null, 2));
    res.json({ id: "abcde" });
  }
  // Unknown HTTP Method
  else {
    throw new Error(`The HTTP ${req.method} method is not supported by this route.`);
  }
}
