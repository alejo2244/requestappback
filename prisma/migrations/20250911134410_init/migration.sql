-- CreateTable
CREATE TABLE "public"."AdvanceRequest" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "consecutive" TEXT NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "supplierTaxId" TEXT NOT NULL,
    "supplierName" TEXT NOT NULL,
    "supplierAddress" TEXT,
    "supplierPhone" TEXT,
    "costCenter" TEXT NOT NULL,
    "concept" TEXT NOT NULL,
    "baseAmount" DOUBLE PRECISION NOT NULL,
    "vatRate" TEXT NOT NULL,
    "vatTotal" DOUBLE PRECISION,
    "approvedPercentage" DOUBLE PRECISION NOT NULL,
    "totalAdvance" DOUBLE PRECISION NOT NULL,
    "amountToTransfer" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "responsible" TEXT NOT NULL,
    "preparedBy" TEXT NOT NULL,
    "approvedBy" TEXT NOT NULL,
    "documentUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdvanceRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."AdvanceRequest" ADD CONSTRAINT "AdvanceRequest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
