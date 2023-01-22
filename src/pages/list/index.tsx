import type { TodoObject } from "@prisma/client";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import TodoCard from "../../components/TodoCard";
import { fetchTodoForUser } from "../../server/apiConnection/api";

export default function List() {
  const [todos, setTodos] = useState<TodoObject[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    fetchTodoForUser()
      .then((todosForUser) => {
        // setTodos(todosForUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Davids Todo</title>
        <meta
          name="Todo App"
          content="Todo list application created with Typescript, React and NextJS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Your Todo List
          </h1>
          <p>Current User: {session?.user?.image} </p>
        </div>
        {todos.map((todo) => {
          return (
            <TodoCard key={todo.Id} subject={todo.subject} task={todo.task} />
          );
        })}
      </main>
    </>
  );
}
