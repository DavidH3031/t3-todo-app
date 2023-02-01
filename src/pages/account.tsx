import React from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import type { GetServerSidePropsContext } from "next";

function Account() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div>
        <p>Welcome {session.user?.name}</p>
        <button
          className="w-full rounded-lg bg-[#63026D] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          onClick={() => {
            signOut()
              .then(() => {
                console.log("Logged out");
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Signout
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not signed in</p>
      </div>
    );
  }
}

export default Account;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: { destination: "/" },
    };
  }
  return {
    props: { session },
  };
};
