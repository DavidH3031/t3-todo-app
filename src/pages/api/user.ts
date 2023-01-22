/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { User } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("req.body", req.body);
    const { email, name } = JSON.parse(req.body);
    const user = await prisma.user.upsert({
      where: {
        email: email,
      },
      update: {},
      create: {
        email: email,
        name: name,
      },
    });
    console.log(user);
    res.status(201).json({ data: user });
  }
}
