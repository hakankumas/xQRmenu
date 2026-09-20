/*
  Warnings:

  - You are about to drop the column `sort` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `favorites` DROP FOREIGN KEY `favorite_productId`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `sort`,
    ADD COLUMN `categorySort` INTEGER NULL,
    ADD COLUMN `favoriteSort` INTEGER NULL;

-- DropTable
DROP TABLE `favorites`;
