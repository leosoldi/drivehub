/*
  Warnings:

  - You are about to drop the column `isPrimaryVehicle` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleBrand` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleChassis` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleColor` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleEngine` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleIpvaMonth` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleIpvaYear` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleLicensingDate` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleMileage` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleModel` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `vehiclePlate` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleYear` on the `driver` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `driver` DROP COLUMN `isPrimaryVehicle`,
    DROP COLUMN `vehicleBrand`,
    DROP COLUMN `vehicleChassis`,
    DROP COLUMN `vehicleColor`,
    DROP COLUMN `vehicleEngine`,
    DROP COLUMN `vehicleIpvaMonth`,
    DROP COLUMN `vehicleIpvaYear`,
    DROP COLUMN `vehicleLicensingDate`,
    DROP COLUMN `vehicleMileage`,
    DROP COLUMN `vehicleModel`,
    DROP COLUMN `vehiclePlate`,
    DROP COLUMN `vehicleYear`,
    ALTER COLUMN `updatedAt` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Vehicle` (
    `id` VARCHAR(191) NOT NULL,
    `driverId` VARCHAR(191) NOT NULL,
    `vehicleBrand` VARCHAR(191) NOT NULL,
    `vehicleModel` VARCHAR(191) NOT NULL,
    `vehicleYear` VARCHAR(191) NOT NULL,
    `vehicleColor` VARCHAR(191) NOT NULL,
    `vehicleEngine` VARCHAR(191) NOT NULL,
    `vehiclePlate` VARCHAR(191) NOT NULL,
    `vehicleChassis` VARCHAR(191) NULL,
    `vehicleMileage` VARCHAR(191) NULL,
    `vehicleIpvaMonth` VARCHAR(191) NULL,
    `vehicleIpvaYear` VARCHAR(191) NULL,
    `vehicleLicensing` VARCHAR(191) NULL,
    `isPrimaryVehicle` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Vehicle_vehiclePlate_key`(`vehiclePlate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Vehicle` ADD CONSTRAINT `Vehicle_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
