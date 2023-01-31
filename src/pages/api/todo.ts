/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { task, subject, session } = req.body;

    const newTodo = await prisma.todoObject.create({
      data: {
        subject,
        task,
        User: {
          connect: { email: session.user.email },
        },
      },
    });
    res.status(201).send({ data: newTodo });
  }
}
