/*
  Warnings:

  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menuitem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `menuitem` DROP FOREIGN KEY `MenuItem_categoryId_fkey`;

-- DropTable
DROP TABLE `category`;

-- DropTable
DROP TABLE `menuitem`;

-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NULL DEFAULT 'default.webp',
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `Categories_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `content` TEXT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `preparedTime` INTEGER NULL,
    `slug` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NULL DEFAULT 'default.webp',
    `categoryId` INTEGER UNSIGNED NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `Products_slug_key`(`slug`),
    INDEX `categoryId`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `products_categoryId` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
