/*
  Warnings:

  - You are about to drop the `RoomRates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `RoomRates` DROP FOREIGN KEY `RoomRates_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `RoomRates` DROP FOREIGN KEY `RoomRates_userId_fkey`;

-- DropTable
DROP TABLE `RoomRates`;

-- CreateTable
CREATE TABLE `Rates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hotelId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `rate` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rates` ADD CONSTRAINT `Rates_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Accomodation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rates` ADD CONSTRAINT `Rates_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
