/*
  Warnings:

  - Added the required column `authorId` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "authorId" TEXT NOT NULL;
