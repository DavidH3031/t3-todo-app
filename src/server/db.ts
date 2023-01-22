import { PrismaClient } from "@prisma/client";

import { env } from "../env/server.mjs";

// const prisma = new PrismaClient();

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
