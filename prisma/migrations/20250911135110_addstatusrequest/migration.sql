/*
  Warnings:

  - Added the required column `statusId` to the `AdvanceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."AdvanceRequest" ADD COLUMN     "statusId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Status_name_key" ON "public"."Status"("name");

-- AddForeignKey
ALTER TABLE "public"."AdvanceRequest" ADD CONSTRAINT "AdvanceRequest_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "public"."Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
