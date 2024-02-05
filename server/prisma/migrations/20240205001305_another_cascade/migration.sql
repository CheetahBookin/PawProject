-- DropForeignKey
ALTER TABLE `Bookings` DROP FOREIGN KEY `Bookings_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Rates` DROP FOREIGN KEY `Rates_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Bookings` ADD CONSTRAINT `Bookings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rates` ADD CONSTRAINT `Rates_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
