/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastNames` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `names` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rolId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "name",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "lastNames" TEXT NOT NULL,
ADD COLUMN     "names" TEXT NOT NULL,
ADD COLUMN     "rolId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Rol" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rol_name_key" ON "public"."Rol"("name");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "public"."Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
