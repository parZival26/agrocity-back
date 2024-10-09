-- AlterTable
ALTER TABLE `PlantUserMission` MODIFY `status` ENUM('pending', 'completed', 'failed', 'blocked') NOT NULL DEFAULT 'blocked';
