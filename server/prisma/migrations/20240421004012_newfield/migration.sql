/*
  Warnings:

  - You are about to drop the `BookedDates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `BookedDates` DROP FOREIGN KEY `BookedDates_hotelId_fkey`;

-- AlterTable
ALTER TABLE `UserProfile` ADD COLUMN `level` VARCHAR(191) NOT NULL DEFAULT 'Rookie';

-- DropTable
DROP TABLE `BookedDates`;
