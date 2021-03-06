-- MySQL Script generated by MySQL Workbench
-- Fri Mar 12 16:10:27 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Bakery_B&B
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Bakery_B&B
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Bakery_B&B` DEFAULT CHARACTER SET utf8mb4 ;
USE `Bakery_B&B` ;

-- -----------------------------------------------------
-- Table `Bakery_B&B`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bakery_B&B`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(255) NOT NULL,
  `firstName` VARCHAR(255) NULL,
  `lastName` VARCHAR(255) NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NULL,
  `admin` INT UNSIGNED NOT NULL DEFAULT '0',
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `deletedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`userName` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Bakery_B&B`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bakery_B&B`.`categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` LONGTEXT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `deletedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `Id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Bakery_B&B`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bakery_B&B`.`products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,0) NOT NULL,
  `image` VARCHAR(255) NULL,
  `description` LONGTEXT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `deletedAt` DATETIME NULL,
  `categories_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `Id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_products_categories1_idx` (`categories_id` ASC) VISIBLE,
  CONSTRAINT `fk_products_categories1`
    FOREIGN KEY (`categories_id`)
    REFERENCES `Bakery_B&B`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Bakery_B&B`.`carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bakery_B&B`.`carts` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `total` DECIMAL(10,0) NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `deletedAt` DATETIME NULL,
  `users_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `Id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_carts_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_carts_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `Bakery_B&B`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Bakery_B&B`.`cart_detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bakery_B&B`.`cart_detail` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `quantity` INT UNSIGNED NOT NULL,
  `salePrice` DECIMAL(10,0) NOT NULL,
  `subTotal` DECIMAL(10,0) NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `deletedAt` DATETIME NULL,
  `carts_id` INT UNSIGNED NOT NULL,
  `products_id` INT UNSIGNED NOT NULL,
  INDEX `fk_carts_has_products_products1_idx` (`products_id` ASC) VISIBLE,
  INDEX `fk_carts_has_products_carts1_idx` (`carts_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_carts_has_products_carts1`
    FOREIGN KEY (`carts_id`)
    REFERENCES `Bakery_B&B`.`carts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carts_has_products_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `Bakery_B&B`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
