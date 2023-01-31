/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import type { TodoObject } from "@prisma/client";
import { deleteTodoForUser } from "../server/apiConnection/api";

interface todoProps {
  id: string;
  subject: string;
  task: string;
  index: number;
  setTodos: Function;
}

function TodoCard({ id, subject, task, index, setTodos }: todoProps) {
  function handleComplete() {
    deleteTodoForUser(id)
      .then(() => {
        setTodos((curr: Array<TodoObject>) => {
          curr.splice(index, 1);
          return [...curr];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className="flex h-[240px] w-[310px] flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-[#15162c] dark:bg-[#15162c]">
        <h5 className="text-bg-[#15162c] mb-2 text-2xl font-bold tracking-tight dark:text-white">
          {subject}
        </h5>
        <p className="text-wrap mb-3 font-normal text-gray-700 dark:text-gray-400">
          {task}
        </p>
        <button
          onClick={handleComplete}
          className="mt-auto inline-flex w-7/12 items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Mark as complete
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TodoCard;
