/*
  Warnings:

  - The primary key for the `TodoObject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authorId` on the `TodoObject` table. All the data in the column will be lost.
  - The required column `Id` was added to the `TodoObject` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TodoObject" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subject" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "timeFrame" TEXT NOT NULL DEFAULT '1 Week',
    "userId" TEXT,
    CONSTRAINT "TodoObject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TodoObject" ("createdAt", "subject", "task", "timeFrame", "userId") SELECT "createdAt", "subject", "task", "timeFrame", "userId" FROM "TodoObject";
DROP TABLE "TodoObject";
ALTER TABLE "new_TodoObject" RENAME TO "TodoObject";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
