/*
  Warnings:

  - You are about to drop the column `favorite` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `favoriteSort` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `favorite`,
    DROP COLUMN `favoriteSort`,
    ADD COLUMN `productType` TINYINT NULL;

-- CreateTable
CREATE TABLE `Favorites` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `productId` INTEGER UNSIGNED NOT NULL,
    `sort` INTEGER NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Favorites` ADD CONSTRAINT `favorite_productId` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
