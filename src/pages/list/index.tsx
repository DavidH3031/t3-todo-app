import type { TodoObject } from "@prisma/client";
import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import CardForm from "../../components/CardForm";
import Navbar from "../../components/Navbar";
import TodoCard from "../../components/TodoCard";
import prisma from "../../server/db";

export default function List({ UserTodo }: { UserTodo: TodoObject[] }) {
  const [todos, setTodos] = useState<TodoObject[]>([...UserTodo] || []);

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
      <Navbar />
      <main className="mt-8 flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {/* Header */}
        <div className="container flex flex-col items-center gap-12 px-4 py-10 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Your To-Do List
          </h1>
        </div>
        {/* List of To-dos */}
        <section className="mt-0 flex max-w-[1420px] flex-row flex-wrap gap-7 px-12">
          {todos.length === 0 ? (
            <TodoCard
              id={"strtrtrt"}
              subject="Example Card"
              task="Example card to show you the style, there is a maximum of 190 characters for the Task field, and maximum of 22 Characters for subject. This will disappear once you add your first task"
              index={0}
              setTodos={setTodos}
            />
          ) : null}
          {todos.map((todo, index) => {
            return (
              <TodoCard
                key={todo.Id}
                id={todo.Id}
                subject={todo.subject}
                task={todo.task}
                index={index}
                setTodos={setTodos}
              />
            );
          })}
          <CardForm setTodos={setTodos} />
        </section>
      </main>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  const todosForUser = await prisma.todoObject.findMany({
    where: {
      userEmail: session?.user?.email || "",
    },
  });
  if (!session) {
    return {
      redirect: { destination: "/" },
    };
  }
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    props: { UserTodo: JSON.parse(JSON.stringify(todosForUser)) } || {},
  };
};
