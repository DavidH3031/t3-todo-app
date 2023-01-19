import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Clicked");
  res.status(200).json({ name: "Skeen donald" });
}
