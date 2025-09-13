/*
  Warnings:

  - Added the required column `consecutiveId` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Company" ADD COLUMN     "consecutiveId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Consecutive" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Consecutive_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Consecutive_name_key" ON "public"."Consecutive"("name");

-- AddForeignKey
ALTER TABLE "public"."Company" ADD CONSTRAINT "Company_consecutiveId_fkey" FOREIGN KEY ("consecutiveId") REFERENCES "public"."Consecutive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
