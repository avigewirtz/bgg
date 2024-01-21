/*
  Warnings:

  - Added the required column `contentWord` to the `PressRelease` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PressRelease" ADD COLUMN     "contentWord" STRING NOT NULL;
