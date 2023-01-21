/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { User } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { uid, email, displayName } = JSON.parse(req.body);
    const user = await prisma.user.create({
      data: {
        id: uid,
        email: email,
        name: displayName,
      },
    });
    console.log(user);
    res.status(201).json({ data: user });
  }
}
