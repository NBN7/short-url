/*
  Warnings:

  - You are about to alter the column `description` on the `Link` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.

*/
-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "description" SET DATA TYPE VARCHAR(40);
