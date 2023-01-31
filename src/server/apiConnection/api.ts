/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from "axios";
import type { Session } from "next-auth";

const BASE_URL = "http://localhost:3000";

export async function fetchTodoForUser() {
  const response = await axios.get(`${BASE_URL}/api/todo`);

  if (!response) {
    throw new Error("Error");
  }

  return response.data;
}

export async function deleteTodoForUser(id: string) {
  const response = await axios.delete(`${BASE_URL}/api/${id}`);
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
  return axios.post(`${BASE_URL}/api/todo`, {
    ...newTodo,
    session,
  });
}
