/*
  Warnings:

  - You are about to drop the column `academicfacultyId` on the `academic_departments` table. All the data in the column will be lost.
  - You are about to drop the column `academicfacultyId` on the `faculties` table. All the data in the column will be lost.
  - You are about to drop the column `academicfacultyId` on the `students` table. All the data in the column will be lost.
  - Added the required column `academicFacultyId` to the `academic_departments` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `year` on the `academic_semesters` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `academicFacultyId` to the `faculties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academicFacultyId` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "academic_departments" DROP CONSTRAINT "academic_departments_academicfacultyId_fkey";

-- DropForeignKey
ALTER TABLE "faculties" DROP CONSTRAINT "faculties_academicfacultyId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_academicfacultyId_fkey";

-- AlterTable
ALTER TABLE "academic_departments" DROP COLUMN "academicfacultyId",
ADD COLUMN     "academicFacultyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "academic_semesters" DROP COLUMN "year",
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "faculties" DROP COLUMN "academicfacultyId",
ADD COLUMN     "academicFacultyId" TEXT NOT NULL,
ALTER COLUMN "contactNo" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "academicfacultyId",
ADD COLUMN     "academicFacultyId" TEXT NOT NULL,
ALTER COLUMN "contactNo" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "academic_departments" ADD CONSTRAINT "academic_departments_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "academic_faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "academic_faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "academic_faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
