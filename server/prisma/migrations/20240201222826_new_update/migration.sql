/*
  Warnings:

  - You are about to drop the column `price` on the `Rooms` table. All the data in the column will be lost.
  - Added the required column `childrenPrice` to the `Rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peopleCapacity` to the `Rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceForPerson` to the `Rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Rooms` DROP COLUMN `price`,
    ADD COLUMN `childrenPrice` DOUBLE NOT NULL,
    ADD COLUMN `peopleCapacity` INTEGER NOT NULL,
    ADD COLUMN `priceForPerson` DOUBLE NOT NULL;
