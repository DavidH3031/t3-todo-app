/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from "axios";

const BASE_URL = "localhost:3000";

export async function fetchTodoForUser() {
  const response = await axios.get("http://localhost:3000/api/todo");

  if (!response) {
    throw new Error("Error");
  }
  console.log(response.data);

  return response.data;
}
