/*
  Warnings:

  - Added the required column `title` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Wifi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cards" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Wifi" ADD COLUMN     "title" TEXT NOT NULL;
