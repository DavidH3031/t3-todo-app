/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
    res.status(201).json({ data: user });
  }
}
