-- AlterTable
ALTER TABLE `portions` ADD COLUMN `discountedPrice` DECIMAL(10, 2) NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `discountedPrice` DECIMAL(10, 2) NULL;
