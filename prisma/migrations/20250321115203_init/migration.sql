-- AlterTable
ALTER TABLE "MedicalRecord" ALTER COLUMN "fileUrl" SET NOT NULL,
ALTER COLUMN "fileUrl" DROP DEFAULT,
ALTER COLUMN "fileUrl" SET DATA TYPE TEXT;
