/*
  Warnings:

  - Added the required column `plant_id` to the `Mission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Mission` ADD COLUMN `plant_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_plant_id_fkey` FOREIGN KEY (`plant_id`) REFERENCES `Plant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
