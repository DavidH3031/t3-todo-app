/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { TodoObject } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { postTodoForUser } from "../server/apiConnection/api";

// eslint-disable-next-line @typescript-eslint/ban-types
function CardForm({ setTodos }: { setTodos: Function }) {
  const [subject, setSubject] = useState("");
  const [task, setTask] = useState("");
  const { data: session } = useSession();

  const handleNewToDo = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = { subject, task };
    postTodoForUser(newTodo, session!)
      .then(({ data: { data } }) => {
        setTodos((curr: Array<TodoObject>) => {
          const newTodoList = [...curr, data];
          return newTodoList;
        });
        setSubject("");
        setTask("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-[240px] w-[310px] rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-[#15162c] dark:bg-[#15162c] sm:p-6 md:px-6 md:py-2">
      <form
        className="space-y-3"
        onSubmit={(e) => {
          handleNewToDo(e);
        }}
      >
        <h5 className="m-0 p-0 text-2xl font-medium text-gray-900 dark:text-white">
          Create a new task
        </h5>
        <div>
          <input
            type="text"
            name="subject"
            id="subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            maxLength={22}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
            placeholder="Subject"
            required
          />
        </div>
        <div>
          <textarea
            name="task"
            id="task"
            placeholder="Task"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
            maxLength={190}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
            required
          />
        </div>
        <div className="flex items-start"></div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CardForm;
