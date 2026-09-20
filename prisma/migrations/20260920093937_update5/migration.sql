-- CreateTable
CREATE TABLE `Portions` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `productId` INTEGER UNSIGNED NOT NULL,
    `portion` TEXT NULL,
    `grammage` TEXT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL,
    `deletedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Portions` ADD CONSTRAINT `portions_productId` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
