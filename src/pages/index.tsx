import type { GetServerSidePropsContext } from "next";
import { type NextPage } from "next";
import Head from "next/head";
import { useSession, signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  function handleLogin(e: React.MouseEvent) {
    e.preventDefault();
    signIn()
      .then(() => {
        console.log("logged in");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!session) {
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
        <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              David&apos;s{" "}
              <span className="text-[hsl(280,100%,70%)]">Todo</span> App
            </h1>
          </div>
          <div className="flex flex-row gap-12">
            <button
              onClick={(e) => {
                handleLogin(e);
              }}
              type="button"
              className="rounded-lg bg-blue-700 px-6 py-3.5 text-center text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Welcome{" "}
              <span className="text-[hsl(280,100%,70%)]">
                {session.user?.name}
              </span>{" "}
            </h1>
          </div>
          <button
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
            onClick={() => {
              router.push("/list").catch((err) => {
                console.log(err);
              });
            }}
          >
            Go to your list
          </button>
        </main>
      </>
    );
  }
};

export default Home;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  // if (session) {
  //   return {
  //     redirect: { destination: "/list" },
  //   };
  // }
  return {
    props: { session },
  };
};
