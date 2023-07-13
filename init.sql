CREATE TABLE IF NOT EXISTS Elado (
    `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `tipus` char(7) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
    `ar` float(8,4) NOT NULL,
    `alapterulet` smallint(5) UNSIGNED NOT NULL,
    `szobaszam` tinyint(3) UNSIGNED NOT NULL,
    `emelet` tinyint(3) UNSIGNED NOT NULL,
    `varos` char(22) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
    `utcanev` char(25) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
    `kozterulet` char(17) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
    `hazszam` char(7) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
    `kepek` tinyint(1) NOT NULL DEFAULT '0',
    `leiras` varchar(500) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
    `hirdetesazon` bigint(20) UNSIGNED NOT NULL,
    `kapcstel` char(12) CHARACTER SET latin2 COLLATE latin2_hungarian_ci NOT NULL,
    `kapcsemail` char(50) CHARACTER SET latin2 COLLATE latin2_hungarian_ci NOT NULL,
    `userid` int(10) UNSIGNED NOT NULL DEFAULT '0'
);

CREATE TABLE IF NOT EXISTS Kiado (
    `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `tipus` char(7) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
    `ar` float(8,4) NOT NULL,
    `alapterulet` smallint(5) UNSIGNED NOT NULL,
    `szobaszam` tinyint(3) UNSIGNED NOT NULL,
    `emelet` tinyint(3) UNSIGNED NOT NULL,
    `varos` char(22) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
    `utcanev` char(25) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
    `kozterulet` char(17) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
    `hazszam` char(7) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
    `kepek` tinyint(1) NOT NULL DEFAULT '0',
    `leiras` varchar(500) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
    `hirdetesazon` bigint(20) UNSIGNED NOT NULL,
    `kapcstel` char(12) CHARACTER SET latin2 COLLATE latin2_hungarian_ci NOT NULL,
    `kapcsemail` char(50) CHARACTER SET latin2 COLLATE latin2_hungarian_ci NOT NULL,
    `userid` int(10) UNSIGNED NOT NULL DEFAULT '0'
);

CREATE TABLE IF NOT EXISTS Users (
    `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `veznev` char(14) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
    `kernev` char(15) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
    `email` char(50) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
    `pass` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL
);