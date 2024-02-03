-- CreateTable
CREATE TABLE `BookedDates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hotelId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookedDates` ADD CONSTRAINT `BookedDates_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Accomodation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
