/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from "axios";
import type { Session } from "next-auth";

export async function fetchTodoForUser() {
  const response = await axios.get(`${process.env.BASE_URL || ""}/api/todo`);

  if (!response) {
    throw new Error("Error");
  }

  return response.data;
}

export async function deleteTodoForUser(id: string) {
  const response = await axios.delete(
    `${process.env.BASE_URL || ""}/api/${id}`
  );
  console.log("DELETE");
  return response.data;
}

export function postTodoForUser(
  newTodo: {
    task: string;
    subject: string;
  },
  session: Session
) {
  return axios.post(`${process.env.BASE_URL || ""}/api/todo`, {
    ...newTodo,
    session,
  });
}
