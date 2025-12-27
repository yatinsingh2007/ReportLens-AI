/*
  Warnings:

  - You are about to drop the column `file` on the `UserQuery` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `UserQuery` table. All the data in the column will be lost.
  - Added the required column `query` to the `UserQuery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserQuery" DROP COLUMN "file",
DROP COLUMN "question",
ADD COLUMN     "query" TEXT NOT NULL;
