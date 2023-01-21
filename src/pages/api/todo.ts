/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { User } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(req.body);
    const { uid, task, subject } = req.body;
    const newTodo = await prisma.todoObject.create({
      data: {
        subject: subject,
        task: task,
        userId: uid,
      },
    });
    console.log(newTodo);
    res.status(201).json({ data: newTodo });
  }
}
