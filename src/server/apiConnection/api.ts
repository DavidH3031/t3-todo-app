import type { UserCredential } from "firebase/auth";

export async function createPrismaUser(fbUser: UserCredential) {
  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify(fbUser.user),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await response.json();
}
