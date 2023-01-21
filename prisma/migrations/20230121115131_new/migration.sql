/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TodoObject` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT,
    "name" TEXT
);
INSERT INTO "new_User" ("email", "id", "name") SELECT "email", "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE TABLE "new_TodoObject" (
    "authorId" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subject" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "timeFrame" TEXT NOT NULL DEFAULT '1 Week',
    "userId" TEXT,
    CONSTRAINT "TodoObject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TodoObject" ("authorId", "createdAt", "subject", "task", "timeFrame", "userId") SELECT "authorId", "createdAt", "subject", "task", "timeFrame", "userId" FROM "TodoObject";
DROP TABLE "TodoObject";
ALTER TABLE "new_TodoObject" RENAME TO "TodoObject";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
