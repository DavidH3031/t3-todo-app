/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div>
      <nav className="fixed top-0 w-full border-gray-200 bg-white px-2 py-2.5 dark:bg-[#15162c] sm:px-4">
        <div className="flex w-max flex-wrap content-between items-center justify-between">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            David To-Do App
          </span>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-[#15162c] md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-[#15162c]">
              <li>
                <a
                  href="#"
                  onClick={() => {
                    router.push("/").catch((err) => {
                      console.log(err);
                    });
                  }}
                  className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white hover:text-white dark:text-white md:bg-transparent md:p-0 md:text-gray-400"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    router.push("/list").catch((err) => {
                      console.log(err);
                    });
                  }}
                  className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                >
                  List
                </a>
              </li>
              {session ? (
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      signOut().catch((err) => {
                        console.log(err);
                      });
                    }}
                    className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                  >
                    Logout
                  </a>
                </li>
              ) : (
                <li>
                  <a
                    onClick={() => {
                      signIn().catch((err) => {
                        console.log(err);
                      });
                    }}
                    className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                  >
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const session = await getSession(context);
//   return {
//     props: { session },
//   };
// };
