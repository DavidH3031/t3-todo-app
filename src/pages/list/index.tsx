import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import TodoCard from "../../components/TodoCard";
import { auth } from "../../server/auth";

const List: NextPage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      const user = prisma?.user
        .findUnique({
          where: {
            id: auth.currentUser.uid,
          },
        })
        .then((user) => {
          // setTodos(user?.todos);
        });
    }
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
        </div>
        <TodoCard />
      </main>
    </>
  );
};

export default List;
