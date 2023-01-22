/*
  Warnings:

  - You are about to drop the column `userId` on the `TodoObject` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `userEmail` to the `TodoObject` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TodoObject" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subject" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "timeFrame" TEXT NOT NULL DEFAULT '1 Week',
    "userEmail" TEXT NOT NULL,
    CONSTRAINT "TodoObject_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TodoObject" ("Id", "createdAt", "subject", "task", "timeFrame") SELECT "Id", "createdAt", "subject", "task", "timeFrame" FROM "TodoObject";
DROP TABLE "TodoObject";
ALTER TABLE "new_TodoObject" RENAME TO "TodoObject";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT
);
INSERT INTO "new_User" ("email", "id", "name") SELECT "email", "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
