/*
  Warnings:

  - You are about to drop the column `dailyScore` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `endScore` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `finalScore` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `midScore` on the `Result` table. All the data in the column will be lost.
  - Added the required column `academicYearId` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semesterId` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionKnowledge` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionSkill` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kkm` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `knowledgeScore` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `predicatKnowledge` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `predicatSkill` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillsScore` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortName` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('GANJIL', 'GENAP');

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "academicYearId" TEXT NOT NULL,
ADD COLUMN     "semesterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "dailyScore",
DROP COLUMN "endScore",
DROP COLUMN "finalScore",
DROP COLUMN "midScore",
ADD COLUMN     "descriptionKnowledge" TEXT NOT NULL,
ADD COLUMN     "descriptionSkill" TEXT NOT NULL,
ADD COLUMN     "kkm" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "knowledgeScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "predicatKnowledge" TEXT NOT NULL,
ADD COLUMN     "predicatSkill" TEXT NOT NULL,
ADD COLUMN     "skillsScore" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "avatar" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "shortName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "avatar" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AcademicYear" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "semester" "Semester" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademicYear_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AcademicYear_name_key" ON "AcademicYear"("name");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
