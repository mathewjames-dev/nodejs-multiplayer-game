/*
 Navicat MySQL Data Transfer

 Source Server         : Local
 Source Server Type    : MySQL
 Source Server Version : 100406
 Source Host           : localhost:3306
 Source Schema         : mathewjamesdev_nodegame

 Target Server Type    : MySQL
 Target Server Version : 100406
 File Encoding         : 65001

 Date: 01/12/2020 19:10:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for inventory
-- ----------------------------
DROP TABLE IF EXISTS `inventory`;
CREATE TABLE `inventory`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `user_id` int(3) UNSIGNED NULL DEFAULT NULL,
  `max_size` int(3) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for inventory_items
-- ----------------------------
DROP TABLE IF EXISTS `inventory_items`;
CREATE TABLE `inventory_items`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `inventory_id` int(11) NULL DEFAULT NULL,
  `item_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for items
-- ----------------------------
DROP TABLE IF EXISTS `items`;
CREATE TABLE `items`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for map_sounds
-- ----------------------------
DROP TABLE IF EXISTS `map_sounds`;
CREATE TABLE `map_sounds`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `map_id` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for maps
-- ----------------------------
DROP TABLE IF EXISTS `maps`;
CREATE TABLE `maps`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sprites
-- ----------------------------
DROP TABLE IF EXISTS `sprites`;
CREATE TABLE `sprites`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sheet_width` int(11) NULL DEFAULT NULL,
  `sheet_height` int(11) NULL DEFAULT NULL,
  `number_of_rows` tinyint(3) NULL DEFAULT NULL,
  `number_of_cols` tinyint(3) NULL DEFAULT NULL,
  `tracking_down_row` tinyint(3) NULL DEFAULT NULL,
  `tracking_up_row` tinyint(3) NULL DEFAULT NULL,
  `tracking_left_row` tinyint(3) NULL DEFAULT NULL,
  `tracking_right_row` tinyint(3) NULL DEFAULT NULL,
  `total_frames` tinyint(3) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `health` int(3) NULL DEFAULT NULL,
  `maxHealth` int(3) NULL DEFAULT NULL,
  `x` int(3) NULL DEFAULT NULL,
  `y` int(3) NULL DEFAULT NULL,
  `map_id` int(3) NULL DEFAULT NULL,
  `sprite_id` int(3) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
