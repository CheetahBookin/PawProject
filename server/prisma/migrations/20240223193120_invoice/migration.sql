/*
  Warnings:

  - You are about to drop the column `bookingId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the `BookingDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bookings` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `BookingDetails` DROP FOREIGN KEY `BookingDetails_accomodationId_fkey`;

-- DropForeignKey
ALTER TABLE `BookingDetails` DROP FOREIGN KEY `BookingDetails_bookingId_fkey`;

-- DropForeignKey
ALTER TABLE `Bookings` DROP FOREIGN KEY `Bookings_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_bookingId_fkey`;

-- AlterTable
ALTER TABLE `Invoice` DROP COLUMN `bookingId`,
    ADD COLUMN `orderId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `BookingDetails`;

-- DropTable
DROP TABLE `Bookings`;

-- CreateIndex
CREATE UNIQUE INDEX `Invoice_orderId_key` ON `Invoice`(`orderId`);

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
