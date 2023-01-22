/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
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

  if (req.method === "GET") {
    const todoListForUser = await prisma.todoObject.findMany({
      where: { userId: current_user },
    });
    console.log(current_user);
    console.log(todoListForUser);
    res.status(200).json(todoListForUser);
  }
}
