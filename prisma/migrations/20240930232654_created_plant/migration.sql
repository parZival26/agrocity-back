-- CreateTable
CREATE TABLE `Plant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `commonName` VARCHAR(255) NOT NULL,
    `scientificName` VARCHAR(255) NOT NULL,
    `family` VARCHAR(255) NOT NULL,
    `type` ENUM('hierba', 'arbusto', 'arbol', 'trepadora') NOT NULL DEFAULT 'hierba',
    `lifeCycle` ENUM('anual', 'bianual', 'perenne') NOT NULL DEFAULT 'anual',
    `climate` VARCHAR(255) NOT NULL,
    `maxHeigth` FLOAT NOT NULL,
    `minHeigth` FLOAT NOT NULL,
    `irrigation` VARCHAR(255) NOT NULL,
    `sunLight` ENUM('sol_directo', 'semisombra', 'sombra') NOT NULL DEFAULT 'sol_directo',
    `sowingSeason` VARCHAR(255) NOT NULL,
    `harvestSeason` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `imageURL` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
