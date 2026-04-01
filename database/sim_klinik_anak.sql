-- MariaDB dump 10.17  Distrib 10.4.11-MariaDB, for osx10.10 (x86_64)
--
-- Host: localhost    Database: sim_klinik_anak
-- ------------------------------------------------------
-- Server version	10.4.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `usere` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passworde` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto_profil` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`usere`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','VHVZWXFNdVJjU3B2VEo0bm5ldm9adz09','/storage/avatars/profile_admin.png','Super Admin');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_log`
--

DROP TABLE IF EXISTS `audit_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audit_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_address` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_log`
--

LOCK TABLES `audit_log` WRITE;
/*!40000 ALTER TABLE `audit_log` DISABLE KEYS */;
INSERT INTO `audit_log` VALUES (1,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REGISTER_PASIEN','Mendaftarkan pasien baru No. RM: 000001','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 04:02:39'),(2,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Mendaftarkan pasien ke Poli Anak. No Rawat: 2026/03/12/0001','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 04:38:36'),(3,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Registrasi Baru Detail: 2026/03/12/0002','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 04:51:22'),(4,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REGISTER_PASIEN','Mendaftarkan pasien baru No. RM: 000002','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 05:07:01'),(5,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Registrasi Baru Detail: 2026/03/12/0003','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 05:20:27'),(6,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','CANCEL_REG_POLI','Membatalkan registrasi No Rawat: 2026/03/12/0001 untuk Pasien: 000001','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 05:29:15'),(7,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','CANCEL_REG_POLI','Membatalkan registrasi No Rawat: 2026/03/12/0002 untuk Pasien: 000001','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 05:31:32'),(8,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','CANCEL_REG_POLI','Membatalkan registrasi No Rawat: 2026/03/12/0003 untuk Pasien: 000002','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 05:31:39'),(9,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Registrasi Baru Detail: 2026/03/12/0001','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 05:31:45'),(10,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','SIMPAN_RME','Mengisi Rekam Medis No Rawat: 2026/03/12/0001','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 05:56:58'),(11,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Registrasi Baru Detail: 2026/03/12/0002','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 06:19:13'),(12,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','HAPUS_RME','Hapus Rekam Medis No Rawat: 2026/03/12/0001','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 08:35:07'),(13,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','SIMPAN_RME','Mengisi Rekam Medis No Rawat: 2026/03/12/0001','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 08:35:44'),(14,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','UPDATE_RME','Update Rekam Medis No Rawat: 2026/03/12/0001','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 08:35:54'),(15,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','UPDATE_RME','Update Rekam Medis No Rawat: 2026/03/12/0001','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 08:39:36'),(16,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','SIMPAN_RME','Mengisi Rekam Medis No Rawat: 2026/03/12/0001','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 08:57:48'),(17,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','HAPUS_RME','Hapus Rekam Medis No Rawat: 2026/03/12/0001','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 08:58:36'),(18,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','HAPUS_RME','Hapus Rekam Medis No Rawat: 2026/03/12/0001','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 09:02:07'),(19,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','SIMPAN_RME','Mengisi Rekam Medis No Rawat: 2026/03/12/0001','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 09:02:20'),(20,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-12 13:26:06'),(21,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-13 00:46:41'),(22,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-13 06:18:59'),(23,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','UPDATE_PASIEN','Mengubah data pasien No. RM: 000002','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-13 07:30:43'),(24,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-14 00:25:31'),(25,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 01:15:08'),(26,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','LOGOUT','User logged out: Super Admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 01:51:23'),(27,'allVUTYzM1dCUUovY2Q3ZkpJcldUZz09','LOGIN_SUCCESS','Pegawai login: bara ji','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 01:51:33'),(28,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 01:51:44'),(29,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','LOGOUT','User logged out: Super Admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 02:17:52'),(30,'allVUTYzM1dCUUovY2Q3ZkpJcldUZz09','LOGIN_SUCCESS','Pegawai login: bara ji','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 02:18:02'),(31,'GUEST','LOGIN_SUCCESS','Pegawai login: bara ji','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 02:26:59'),(32,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 02:27:51'),(33,'GUEST','LOGIN_SUCCESS','Pegawai login: bara ji','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 02:41:38'),(34,'GUEST','LOGIN_SUCCESS','Pegawai login: bara ji','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 02:42:09'),(35,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','LOGOUT','User logged out: Super Admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 03:10:20'),(36,'GUEST','LOGIN_SUCCESS','Pegawai login: bara ji','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 03:10:27'),(37,'allVUTYzM1dCUUovY2Q3ZkpJcldUZz09','LOGOUT','User logged out: bara ji','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 03:10:34'),(38,'GUEST','LOGIN_SUCCESS','Pegawai login: bara ji','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 03:10:42'),(39,'LzZEaGNtQkVNQkZ4S01IKzFCOVoyQT09','LOGOUT','User logged out: bara ji','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 03:10:54'),(40,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 03:11:01'),(41,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','LOGOUT','User logged out: Super Admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 03:11:40'),(42,'GUEST','LOGIN_SUCCESS','Pegawai login: Dr. Siska, Sp.A','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 03:11:45'),(43,'MlhOeEJMMmQyREFvS0JWM3JZUVd3Zz09','LOGOUT','User logged out: Dr. Siska, Sp.A','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 03:18:43'),(44,'GUEST','LOGIN_SUCCESS','Pegawai login: Dr. Siska, Sp.A','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 03:19:03'),(45,'MlhOeEJMMmQyREFvS0JWM3JZUVd3Zz09','LOGOUT','User logged out: Dr. Siska, Sp.A','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 03:22:00'),(46,'GUEST','LOGIN_SUCCESS','Pegawai login: bara ji','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 03:22:17'),(47,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 08:07:19'),(48,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 13:05:38'),(49,'GUEST','LOGIN_FAILED','Failed login attempt for username: admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 14:46:46'),(50,'GUEST','LOGIN_FAILED','Failed login attempt for username: admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 14:49:07'),(51,'GUEST','LOGIN_FAILED','Failed login attempt for username: bara.n.fahrun','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 14:49:26'),(52,'GUEST','LOGIN_FAILED','Failed login attempt for username: 08511747600123','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 14:49:47'),(53,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-15 14:50:58'),(54,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-16 00:21:29'),(55,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-16 03:12:47'),(56,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Registrasi Baru Detail: 2026/03/16/0001','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-16 03:19:02'),(57,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-16 09:44:52'),(58,'GUEST','LOGIN_FAILED','Failed login attempt for username: admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-16 10:51:51'),(59,'GUEST','LOGIN_FAILED','Failed login attempt for username: adminadmin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-16 10:52:34'),(60,'GUEST','LOGIN_FAILED','Failed login attempt for username: admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-16 10:52:46'),(61,'GUEST','LOGIN_FAILED','Failed login attempt for username: adminsuperadmin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-16 10:54:47'),(62,'GUEST','LOGIN_FAILED','Failed login attempt for username: anjasmara','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-16 10:56:05'),(63,'GUEST','LOGIN_FAILED','Failed login attempt for username: anjasmara','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-16 10:56:24'),(64,'GUEST','LOGIN_FAILED','Failed login attempt for username: admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-16 10:56:37'),(65,'GUEST','LOGIN_FAILED','Failed login attempt for username: superadmin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-16 10:57:01'),(66,'GUEST','LOGIN_FAILED','Failed login attempt for username: admin123','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-16 10:59:23'),(67,'GUEST','LOGIN_FAILED','Failed login attempt for username: admin','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-16 11:00:24'),(68,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-18 03:03:35'),(69,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Registrasi Baru Detail: 2026/03/18/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-18 03:04:04'),(70,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-18 03:31:08'),(71,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Mendaftarkan pasien ke Poli Anak. No Rawat: 2026/03/18/0002','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36','2026-03-18 04:34:40'),(72,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','CANCEL_REG_POLI','Membatalkan registrasi No Rawat: 2026/03/18/0001 untuk Pasien: 000002','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-18 09:54:57'),(73,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','CANCEL_REG_POLI','Membatalkan registrasi No Rawat: 2026/03/18/0002 untuk Pasien: 000002','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-18 09:55:00'),(74,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Mendaftarkan pasien ke Poli Anak. No Rawat: 2026/03/18/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-18 12:50:09'),(75,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','SIMPAN_RME','Mengisi Rekam Medis No Rawat: 2026/03/18/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-18 13:27:59'),(76,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','UPDATE_RME','Update Rekam Medis No Rawat: 2026/03/12/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-18 14:08:14'),(77,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-18 20:08:06'),(78,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','LOGOUT','User logged out: Super Admin','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-18 20:11:10'),(79,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-18 20:42:44'),(80,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','HAPUS_RME','Hapus Rekam Medis No Rawat: 2026/03/18/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-18 20:49:11'),(81,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','HAPUS_RME','Hapus Rekam Medis No Rawat: 2026/03/12/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-18 20:49:16'),(82,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 00:43:16'),(83,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','SIMPAN_RME','Mengisi Rekam Medis No Rawat: 2026/03/18/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 02:09:47'),(84,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Mendaftarkan pasien ke Poli Anak. No Rawat: 2026/03/19/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 02:10:13'),(85,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','SIMPAN_RME','Mengisi Rekam Medis No Rawat: 2026/03/19/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 02:10:47'),(86,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','HAPUS_RME','Hapus Rekam Medis No Rawat: 2026/03/18/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 02:11:09'),(87,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','HAPUS_RME','Hapus Rekam Medis No Rawat: 2026/03/19/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 02:11:13'),(88,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Mendaftarkan pasien ke Poli Anak. No Rawat: 2026/03/19/0002','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 02:37:39'),(89,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','SIMPAN_RME','Mengisi Rekam Medis No Rawat: 2026/03/19/0002','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 02:38:33'),(90,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Mendaftarkan pasien ke Poli Anak. No Rawat: 2026/03/19/0003','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 02:57:46'),(91,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Mendaftarkan pasien ke Poli Anak. No Rawat: 2026/03/19/0004','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 03:07:54'),(92,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','CANCEL_REG_POLI','Membatalkan registrasi No Rawat: 2026/03/19/0001 untuk Pasien: 000002','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 03:09:05'),(93,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','CANCEL_REG_POLI','Membatalkan registrasi No Rawat: 2026/03/19/0002 untuk Pasien: 000001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 03:09:08'),(94,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','CANCEL_REG_POLI','Membatalkan registrasi No Rawat: 2026/03/19/0003 untuk Pasien: 000002','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 03:09:11'),(95,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','CANCEL_REG_POLI','Membatalkan registrasi No Rawat: 2026/03/19/0004 untuk Pasien: 000002','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 03:09:15'),(98,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 08:17:56'),(99,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Registrasi Baru Detail: 2026/03/19/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 08:30:33'),(100,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','CANCEL_REG_POLI','Membatalkan registrasi No Rawat: 2026/03/19/0001 untuk Pasien: 000002','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 08:30:39'),(101,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Mendaftarkan pasien ke Poli Anak. No Rawat: 2026/03/19/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 10:12:47'),(102,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','SIMPAN_RME','Mengisi Rekam Medis No Rawat: 2026/03/19/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 10:12:59'),(103,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 13:12:37'),(104,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','HAPUS_RME','Hapus Rekam Medis No Rawat: 2026/03/19/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 13:13:02'),(105,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','SIMPAN_RME','Mengisi Rekam Medis No Rawat: 2026/03/19/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 13:13:23'),(106,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','HAPUS_RME','Hapus Rekam Medis No Rawat: 2026/03/19/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 13:20:48'),(107,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','SIMPAN_RME','Mengisi Rekam Medis No Rawat: 2026/03/19/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-19 13:21:15'),(108,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-20 12:43:36'),(109,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Mendaftarkan pasien ke Poli Anak. No Rawat: 2026/03/20/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-20 12:43:50'),(110,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','SIMPAN_RME','Mengisi Rekam Medis No Rawat: 2026/03/20/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-20 12:44:03'),(111,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-20 21:36:37'),(112,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','LOGOUT','User logged out: Super Admin','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-20 22:37:57'),(113,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-20 22:47:45'),(114,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Mendaftarkan pasien ke Poli Anak. No Rawat: 2026/03/21/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-21 00:30:08'),(115,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Registrasi Baru Detail: 2026/03/21/0002','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-21 01:46:42'),(116,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','CANCEL_REG_POLI','Membatalkan registrasi No Rawat: 2026/03/21/0001 untuk Pasien: 000002','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-21 03:01:14'),(117,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','CANCEL_REG_POLI','Membatalkan registrasi No Rawat: 2026/03/21/0002 untuk Pasien: 000001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-21 03:01:17'),(118,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Registrasi Baru Detail: 2026/03/21/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-21 03:01:32'),(119,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-21 08:10:20'),(120,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','CANCEL_REG_POLI','Membatalkan registrasi No Rawat: 2026/03/21/0001 untuk Pasien: 000002','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-21 08:23:52'),(121,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Registrasi Baru Detail: 2026/03/21/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-21 08:24:54'),(122,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','HAPUS_RME','Hapus Rekam Medis No Rawat: 2026/03/20/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-21 08:25:20'),(123,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','SIMPAN_RME','Mengisi Rekam Medis No Rawat: 2026/03/21/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-21 08:25:24'),(124,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REGISTER_PASIEN','Mendaftarkan pasien baru No. RM: 000003','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-21 09:10:32'),(125,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Registrasi Baru Detail: 2026/03/21/0002','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-21 09:10:44'),(126,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','SIMPAN_RME','Mengisi Rekam Medis No Rawat: 2026/03/21/0002','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-21 09:10:58'),(127,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-22 00:05:13'),(128,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','LOGOUT','User logged out: Super Admin','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-22 00:36:54'),(129,'GUEST','LOGIN_SUCCESS','Admin login: Super Admin','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-26 02:53:17'),(130,'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09','REG_POLI','Registrasi Baru Detail: 2026/03/26/0001','127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','2026-03-26 02:53:36');
/*!40000 ALTER TABLE `audit_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `databarang`
--

DROP TABLE IF EXISTS `databarang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `databarang` (
  `kode_brng` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_brng` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_sat` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hargajual` double NOT NULL DEFAULT 0,
  `status` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`kode_brng`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `databarang`
--

LOCK TABLES `databarang` WRITE;
/*!40000 ALTER TABLE `databarang` DISABLE KEYS */;
INSERT INTO `databarang` VALUES ('0054','paracetamol 500mg','TAB',1000,'1','2026-03-12 06:02:01','2026-03-12 06:02:01'),('0145','ANTALGIN','TAB',100,'1','2026-03-13 00:42:41','2026-03-13 00:42:41'),('0214','CTM','TAB',1000,'1','2026-03-12 06:02:20','2026-03-12 06:02:20');
/*!40000 ALTER TABLE `databarang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_penerimaan_obat`
--

DROP TABLE IF EXISTS `detail_penerimaan_obat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detail_penerimaan_obat` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `no_faktur` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_brng` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jml` double NOT NULL,
  `harga_beli` double NOT NULL,
  `tgl_expired` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `detail_penerimaan_obat_no_faktur_foreign` (`no_faktur`),
  CONSTRAINT `detail_penerimaan_obat_no_faktur_foreign` FOREIGN KEY (`no_faktur`) REFERENCES `penerimaan_obat` (`no_faktur`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_penerimaan_obat`
--

LOCK TABLES `detail_penerimaan_obat` WRITE;
/*!40000 ALTER TABLE `detail_penerimaan_obat` DISABLE KEYS */;
INSERT INTO `detail_penerimaan_obat` VALUES (4,'sdfsd','0214',50,100,'2026-11-11','2026-03-12 22:54:17','2026-03-12 22:54:17'),(8,'123234345','0145',1000,100,'2027-11-11','2026-03-22 00:27:43','2026-03-22 00:27:43'),(10,'TEST-002','0054',20,800,'2026-03-20','2026-03-22 00:29:24','2026-03-22 00:29:24');
/*!40000 ALTER TABLE `detail_penerimaan_obat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_tagihan_tindakan`
--

DROP TABLE IF EXISTS `detail_tagihan_tindakan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detail_tagihan_tindakan` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `no_rawat` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_tarif` bigint(20) unsigned NOT NULL,
  `biaya` int(11) NOT NULL,
  `qty` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `detail_tagihan_tindakan_id_tarif_foreign` (`id_tarif`),
  CONSTRAINT `detail_tagihan_tindakan_id_tarif_foreign` FOREIGN KEY (`id_tarif`) REFERENCES `tarif_tindakan` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_tagihan_tindakan`
--

LOCK TABLES `detail_tagihan_tindakan` WRITE;
/*!40000 ALTER TABLE `detail_tagihan_tindakan` DISABLE KEYS */;
INSERT INTO `detail_tagihan_tindakan` VALUES (1,'2026/03/12/0001',1,5000,1,'2026-03-15 07:03:19','2026-03-15 07:03:19'),(2,'2026/03/16/0001',2,20000,1,'2026-03-16 01:54:58','2026-03-16 01:54:58'),(5,'2026/03/18/0001',1,5000,1,'2026-03-17 20:09:45','2026-03-17 20:09:45'),(6,'2026/03/18/0001',2,20000,1,'2026-03-18 05:29:22','2026-03-18 05:29:22'),(7,'2026/03/19/0002',1,5000,1,'2026-03-18 18:38:14','2026-03-18 18:38:14'),(8,'2026/03/20/0001',2,20000,1,'2026-03-20 12:44:23','2026-03-20 12:44:23'),(9,'2026/03/21/0002',1,5000,1,'2026-03-21 09:56:48','2026-03-21 09:56:48'),(10,'2026/03/21/0002',2,20000,1,'2026-03-21 09:57:16','2026-03-21 09:57:16'),(11,'2026/03/21/0002',3,30000,1,'2026-03-21 09:57:51','2026-03-21 09:57:51');
/*!40000 ALTER TABLE `detail_tagihan_tindakan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dokter`
--

DROP TABLE IF EXISTS `dokter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dokter` (
  `kd_dokter` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nm_dokter` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `jk` enum('L','P') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tmp_lahir` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `gol_darah` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agama` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_telp` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stts_nikah` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alumni` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_sip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`kd_dokter`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dokter`
--

LOCK TABLES `dokter` WRITE;
/*!40000 ALTER TABLE `dokter` DISABLE KEYS */;
INSERT INTO `dokter` VALUES ('12345','bara ji','2026-03-13 21:50:02','2026-03-13 21:50:12','L','palopo','1984-11-11','-','Islam','palopo','0813422649','Menikah','palopo','133456987'),('D001','Dr. Siska, Sp.A','2026-03-11 20:12:39','2026-03-11 20:12:39',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `dokter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2026_03_11_071457_create_sik_style_auth_tables',1),(6,'2026_03_12_022817_create_pasiens_table',2),(7,'2026_03_12_030507_create_audit_logs_table',2),(8,'2026_03_12_041113_create_clinic_core_tables_simple',3),(9,'2026_03_12_044608_add_detailed_columns_to_reg_periksa_table',4),(10,'2026_03_12_045641_add_detailed_columns_to_pasiens_table',5),(11,'2026_03_12_051748_increase_no_ktp_length_in_reg_periksa_table',6),(12,'2026_03_12_053337_create_pemeriksaan_ralan_table',7),(13,'2026_03_12_054026_add_soapie_columns_to_pemeriksaan_ralan_table',8),(14,'2026_03_12_084331_create_pemeriksaan_ralan_template_table',9),(15,'2026_03_12_131226_create_pharmacy_tables',10),(16,'2026_03_12_140522_create_stok_obat_table',11),(17,'2026_03_13_024820_create_penerimaan_obat_tables',12),(18,'2026_03_14_052905_add_details_to_dokter_table',13),(19,'2026_03_14_055802_add_details_to_user_pegawai_table',14),(20,'2026_03_14_060104_add_more_hr_details_to_user_pegawai_table',15),(21,'2026_03_14_070000_create_settings_table',16),(23,'2026_03_15_141358_create_tarif_tindakan_table',17),(24,'2026_03_15_143247_create_tagihan_tindakan_table',18),(25,'0000_00_00_000000_create_websockets_statistics_entries_table',19),(26,'2026_03_21_084829_create_resep_dokter_racikan_tables',20),(27,'2026_03_21_182512_add_status_closing_to_reg_periksa_table',21);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pasien`
--

DROP TABLE IF EXISTS `pasien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pasien` (
  `no_rkm_medis` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nm_pasien` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nik` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jk` enum('L','P') COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_lahir` date NOT NULL,
  `nm_ibu` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_tlp` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_daftar` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `tmp_lahir` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agama` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pekerjaan` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stts_nikah` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gol_darah` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pendidikan` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_peserta` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `suku_bangsa` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bahasa_pasien` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cacat_fisik` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kelurahan` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kecamatan` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kabupaten` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `propinsi` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`no_rkm_medis`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pasien`
--

LOCK TABLES `pasien` WRITE;
/*!40000 ALTER TABLE `pasien` DISABLE KEYS */;
INSERT INTO `pasien` VALUES ('000001','tes','VisrQjBkcjdvaDNaV2RIL1NMcUltUT09','L','1979-11-11','ibu','0813422648841','palopo','2026-03-11 20:02:39','2026-03-11 20:02:39','2026-03-11 20:02:39',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('000002','bara','Vjh0NlFrL0x5Qmo5cE1jNm84TUlOZz09','L','2025-12-11','siti','0823485444','Palopo\nTanjung','2026-03-11 21:07:01','2026-03-11 21:07:01','2026-03-12 23:30:43','palopo','ISLAM','-','BELUM MENIKAH','-','-','000454454','baranurfahrun@gmail.com','-','BAHASA INDONESIA','-','palopo','palopo','palopo','Sulawesi Selatan'),('000003','hendra','S3VmRk5kL0hrMFpZQnZ6bVdGRFg0UT09','L','2024-11-11','ibu','081342323','palopo','2026-03-21 09:10:32','2026-03-21 09:10:32','2026-03-21 09:10:32','palopo','ISLAM','-','BELUM MENIKAH','-','-','0008234234234','','-','BAHASA INDONESIA','-','palopo','palopo','palopo','palopo');
/*!40000 ALTER TABLE `pasien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pemeriksaan_ralan`
--

DROP TABLE IF EXISTS `pemeriksaan_ralan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pemeriksaan_ralan` (
  `no_rawat` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_pemeriksaan` date NOT NULL,
  `jam_pemeriksaan` time NOT NULL,
  `suhu_tubuh` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tensi` varchar(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nadi` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `respirasi` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `spo2` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tinggi` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `berat` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lingkar_perut` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gcs` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kesadaran` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keluhan` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pemeriksaan` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `penilaian` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tindak_lanjut` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instruksi` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `evaluasi` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alergi` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nip` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`no_rawat`,`tgl_pemeriksaan`,`jam_pemeriksaan`),
  CONSTRAINT `pemeriksaan_ralan_no_rawat_foreign` FOREIGN KEY (`no_rawat`) REFERENCES `reg_periksa` (`no_rawat`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pemeriksaan_ralan`
--

LOCK TABLES `pemeriksaan_ralan` WRITE;
/*!40000 ALTER TABLE `pemeriksaan_ralan` DISABLE KEYS */;
INSERT INTO `pemeriksaan_ralan` VALUES ('2026/03/19/0001','2026-03-19','21:21:15','','','','','','','','','','Compos Mentis','fghf','fgh','fgh','fgh','fgh;ihiuh','fghiuhouh','','','2026-03-19 13:21:15','2026-03-19 13:21:15'),('2026/03/21/0001','2026-03-21','16:25:24','','','','','','','','','','Compos Mentis','fghf','fgh','fgh','fgh','fgh','fgh','','','2026-03-21 08:25:24','2026-03-21 08:25:24'),('2026/03/21/0002','2026-03-21','17:10:58','','','','','','','','','','Compos Mentis','fghf','fgh','fgh','fgh','fgh;ihiuh','fghiuhouh','','','2026-03-21 09:10:58','2026-03-21 09:10:58');
/*!40000 ALTER TABLE `pemeriksaan_ralan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pemeriksaan_ralan_template`
--

DROP TABLE IF EXISTS `pemeriksaan_ralan_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pemeriksaan_ralan_template` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keluhan` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pemeriksaan` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `penilaian` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tindak_lanjut` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instruksi` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `evaluasi` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pemeriksaan_ralan_template`
--

LOCK TABLES `pemeriksaan_ralan_template` WRITE;
/*!40000 ALTER TABLE `pemeriksaan_ralan_template` DISABLE KEYS */;
INSERT INTO `pemeriksaan_ralan_template` VALUES (1,'','fghf','fgh','fgh','fgh','fgh','fgh','2026-03-12 00:57:48','2026-03-12 00:57:48'),(2,'','fghf','fgh','fgh','fgh','fgh;ihiuh','fghiuhouh','2026-03-18 05:27:59','2026-03-18 05:27:59');
/*!40000 ALTER TABLE `pemeriksaan_ralan_template` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `penerimaan_obat`
--

DROP TABLE IF EXISTS `penerimaan_obat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `penerimaan_obat` (
  `no_faktur` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_penerimaan` date NOT NULL,
  `supplier` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keterangan` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_bayar` double NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`no_faktur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penerimaan_obat`
--

LOCK TABLES `penerimaan_obat` WRITE;
/*!40000 ALTER TABLE `penerimaan_obat` DISABLE KEYS */;
INSERT INTO `penerimaan_obat` VALUES ('123234345','2026-03-22','CV. Bex Media',NULL,100000,'2026-03-22 00:27:43','2026-03-22 00:27:43'),('sdfsd','2026-03-13','fvdf',NULL,5000,'2026-03-12 22:54:17','2026-03-12 22:54:17'),('TEST-002','2026-01-15','CV. FARMASI SEJAHTERA',NULL,16000,'2026-03-12 23:45:53','2026-03-22 00:29:24');
/*!40000 ALTER TABLE `penerimaan_obat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poliklinik`
--

DROP TABLE IF EXISTS `poliklinik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `poliklinik` (
  `kd_poli` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nm_poli` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`kd_poli`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poliklinik`
--

LOCK TABLES `poliklinik` WRITE;
/*!40000 ALTER TABLE `poliklinik` DISABLE KEYS */;
INSERT INTO `poliklinik` VALUES ('PA','Poliklinik Anak','2026-03-11 20:12:39','2026-03-11 20:12:39');
/*!40000 ALTER TABLE `poliklinik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reg_periksa`
--

DROP TABLE IF EXISTS `reg_periksa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reg_periksa` (
  `no_reg` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_rawat` varchar(17) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_closing` enum('Belum','Selesai') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Belum',
  `tgl_registrasi` date NOT NULL,
  `jam_reg` time NOT NULL,
  `kd_dokter` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_rkm_medis` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kd_poli` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stts` enum('Belum','Sudah','Batal','Dirujuk','Dirawat') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Belum',
  `status_lanjut` enum('Ralan','Ranap') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Ralan',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `p_jawab` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hubunganpj` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `almt_pj` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kd_pj` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'UMM',
  `asal_rujukan` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_ktp` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`no_rawat`),
  KEY `reg_periksa_kd_poli_foreign` (`kd_poli`),
  KEY `reg_periksa_kd_dokter_foreign` (`kd_dokter`),
  KEY `reg_periksa_no_rkm_medis_foreign` (`no_rkm_medis`),
  CONSTRAINT `reg_periksa_kd_dokter_foreign` FOREIGN KEY (`kd_dokter`) REFERENCES `dokter` (`kd_dokter`),
  CONSTRAINT `reg_periksa_kd_poli_foreign` FOREIGN KEY (`kd_poli`) REFERENCES `poliklinik` (`kd_poli`),
  CONSTRAINT `reg_periksa_no_rkm_medis_foreign` FOREIGN KEY (`no_rkm_medis`) REFERENCES `pasien` (`no_rkm_medis`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reg_periksa`
--

LOCK TABLES `reg_periksa` WRITE;
/*!40000 ALTER TABLE `reg_periksa` DISABLE KEYS */;
INSERT INTO `reg_periksa` VALUES ('001','2026/03/12/0001','Belum','2026-03-12','05:31:45','D001','000002','PA','Sudah','Ralan','2026-03-11 21:31:45','2026-03-12 01:02:20','siti','Ibu','Palopo\nTanjung','BJS','-','000454454 / 732200524564141'),('002','2026/03/12/0002','Belum','2026-03-12','06:19:13','D001','000001','PA','Belum','Ralan','2026-03-11 22:19:13','2026-03-11 22:19:13','ibu','Ibu','palopo','UMM','-','123456789'),('001','2026/03/16/0001','Belum','2026-03-16','03:19:01','12345','000002','PA','Belum','Ralan','2026-03-15 19:19:02','2026-03-15 19:19:02','siti','Ibu','Palopo\nTanjung','BJS','-','000454454 / 732200524564141'),('001','2026/03/18/0001','Belum','2026-03-18','12:50:09','D001','000002','PA','Sudah','Ralan','2026-03-18 04:50:09','2026-03-18 18:09:47',NULL,NULL,NULL,'UMM',NULL,NULL),('001','2026/03/19/0001','Belum','2026-03-19','10:12:47','D001','000001','PA','Sudah','Ralan','2026-03-19 02:12:47','2026-03-19 13:21:15',NULL,NULL,NULL,'UMM',NULL,NULL),('001','2026/03/20/0001','Belum','2026-03-20','20:43:50','D001','000002','PA','Sudah','Ralan','2026-03-20 12:43:50','2026-03-20 12:44:03',NULL,NULL,NULL,'UMM',NULL,NULL),('001','2026/03/21/0001','Belum','2026-03-21','16:24:54','12345','000002','PA','Sudah','Ralan','2026-03-21 08:24:54','2026-03-21 08:25:24','siti','Ibu','Palopo\nTanjung','BJS','-','000454454 / 732200524564141'),('002','2026/03/21/0002','Selesai','2026-03-21','17:10:44','12345','000003','PA','Sudah','Ralan','2026-03-21 09:10:44','2026-03-21 10:38:23','ibu','Ibu','palopo','BJS','-','0008234234234 / 009324234234'),('001','2026/03/26/0001','Belum','2026-03-26','10:53:36','12345','000002','PA','Belum','Ralan','2026-03-26 02:53:36','2026-03-26 02:53:36','siti','Ibu','Palopo\nTanjung','BJS','-','000454454 / 732200524564141');
/*!40000 ALTER TABLE `reg_periksa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resep_dokter`
--

DROP TABLE IF EXISTS `resep_dokter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resep_dokter` (
  `no_resep` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_brng` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jml` double NOT NULL,
  `aturan_pakai` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`no_resep`,`kode_brng`),
  KEY `resep_dokter_kode_brng_foreign` (`kode_brng`),
  CONSTRAINT `resep_dokter_kode_brng_foreign` FOREIGN KEY (`kode_brng`) REFERENCES `databarang` (`kode_brng`),
  CONSTRAINT `resep_dokter_no_resep_foreign` FOREIGN KEY (`no_resep`) REFERENCES `resep_obat` (`no_resep`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resep_dokter`
--

LOCK TABLES `resep_dokter` WRITE;
/*!40000 ALTER TABLE `resep_dokter` DISABLE KEYS */;
INSERT INTO `resep_dokter` VALUES ('20260313084428','0145',10,'3 x 1','2026-03-13 00:44:28','2026-03-13 00:44:28'),('20260313084711','0214',4,'3 x 1','2026-03-13 00:47:11','2026-03-13 00:47:11'),('20260314034034','0214',10,'3 x 1','2026-03-13 19:40:34','2026-03-13 19:40:34'),('20260314035703','0214',10,'3 x 1','2026-03-13 19:57:03','2026-03-13 19:57:03'),('20260315150513','0145',5,'3 x 1','2026-03-15 07:05:13','2026-03-15 07:05:13'),('20260318132911','0145',3,'3 x 1','2026-03-18 05:29:11','2026-03-18 05:29:11'),('20260320204414','0145',2,'3 x 1','2026-03-20 12:44:14','2026-03-20 12:44:14'),('20260321162627','0145',1,'3 x 1','2026-03-21 08:26:27','2026-03-21 08:26:27'),('20260321171107','0054',1,'3 x 1','2026-03-21 09:11:07','2026-03-21 09:11:07'),('FIX004525','0054',10,'3 x 1 Sesudah Makan','2026-03-12 16:45:25','2026-03-12 16:45:25'),('MUL010027','0214',6,'2 x 1','2026-03-12 17:00:27','2026-03-12 17:00:27');
/*!40000 ALTER TABLE `resep_dokter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resep_dokter_racikan`
--

DROP TABLE IF EXISTS `resep_dokter_racikan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resep_dokter_racikan` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `no_resep` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_racik` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `metode_racik` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aturan_pakai` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jml_dr` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `resep_dokter_racikan_no_resep_index` (`no_resep`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resep_dokter_racikan`
--

LOCK TABLES `resep_dokter_racikan` WRITE;
/*!40000 ALTER TABLE `resep_dokter_racikan` DISABLE KEYS */;
INSERT INTO `resep_dokter_racikan` VALUES (7,'20260321110416','batuk','Kapsul','3 x 1',10,'2026-03-21 03:04:16','2026-03-21 03:04:16'),(12,'20260321170036','batuk','Kapsul','3 x 1',10,'2026-03-21 09:00:36','2026-03-21 09:00:36'),(14,'20260321170338','pilek','Kapsul','3 x 1',10,'2026-03-21 09:03:38','2026-03-21 09:03:38'),(15,'20260321171141','stres','Kapsul','3 x 1',10,'2026-03-21 09:11:41','2026-03-21 09:11:41');
/*!40000 ALTER TABLE `resep_dokter_racikan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resep_dokter_racikan_detail`
--

DROP TABLE IF EXISTS `resep_dokter_racikan_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resep_dokter_racikan_detail` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `no_resep` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_racik` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_brng` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jml` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `resep_dokter_racikan_detail_no_resep_nama_racik_index` (`no_resep`,`nama_racik`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resep_dokter_racikan_detail`
--

LOCK TABLES `resep_dokter_racikan_detail` WRITE;
/*!40000 ALTER TABLE `resep_dokter_racikan_detail` DISABLE KEYS */;
INSERT INTO `resep_dokter_racikan_detail` VALUES (9,'20260321110416','batuk','0145',2,'2026-03-21 03:04:16','2026-03-21 03:04:16'),(10,'20260321110416','batuk','0214',1,'2026-03-21 03:04:16','2026-03-21 03:04:16'),(12,'20260321170036','batuk','0214',1,'2026-03-21 09:00:36','2026-03-21 09:00:36'),(13,'20260321170338','pilek','0054',1,'2026-03-21 09:03:38','2026-03-21 09:03:38'),(14,'20260321170338','pilek','0214',3,'2026-03-21 09:03:38','2026-03-21 09:03:38'),(15,'20260321170338','pilek','0145',2,'2026-03-21 09:03:38','2026-03-21 09:03:38'),(16,'20260321171141','stres','0054',1,'2026-03-21 09:11:41','2026-03-21 09:11:41'),(17,'20260321171141','stres','0145',1.1,'2026-03-21 09:11:41','2026-03-21 09:11:41'),(18,'20260321171141','stres','0214',1.2,'2026-03-21 09:11:41','2026-03-21 09:11:41');
/*!40000 ALTER TABLE `resep_dokter_racikan_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resep_obat`
--

DROP TABLE IF EXISTS `resep_obat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resep_obat` (
  `no_resep` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_perawatan` date NOT NULL,
  `jam_perawatan` time NOT NULL,
  `no_rawat` varchar(17) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kd_dokter` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_penyerahan` date DEFAULT NULL,
  `jam_penyerahan` time DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`no_resep`),
  KEY `resep_obat_no_rawat_foreign` (`no_rawat`),
  KEY `resep_obat_kd_dokter_foreign` (`kd_dokter`),
  CONSTRAINT `resep_obat_kd_dokter_foreign` FOREIGN KEY (`kd_dokter`) REFERENCES `dokter` (`kd_dokter`),
  CONSTRAINT `resep_obat_no_rawat_foreign` FOREIGN KEY (`no_rawat`) REFERENCES `reg_periksa` (`no_rawat`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resep_obat`
--

LOCK TABLES `resep_obat` WRITE;
/*!40000 ALTER TABLE `resep_obat` DISABLE KEYS */;
INSERT INTO `resep_obat` VALUES ('20260313084428','2026-03-13','08:44:28','2026/03/12/0001','D001','2026-03-13','08:44:46','2026-03-13 00:44:28','2026-03-13 00:44:46'),('20260313084711','2026-03-13','08:47:11','2026/03/12/0001','D001','2026-03-18','06:02:02','2026-03-13 00:47:11','2026-03-17 22:02:02'),('20260314034034','2026-03-14','03:40:34','2026/03/12/0001','D001','2026-03-18','06:02:02','2026-03-13 19:40:34','2026-03-17 22:02:02'),('20260314035703','2026-03-14','03:57:03','2026/03/12/0001','D001','2026-03-18','06:02:02','2026-03-13 19:57:03','2026-03-17 22:02:02'),('20260315150513','2026-03-15','15:05:13','2026/03/12/0001','D001','2026-03-18','06:02:02','2026-03-15 07:05:13','2026-03-17 22:02:02'),('20260318132911','2026-03-18','13:29:11','2026/03/18/0001','D001','2026-03-21','09:38:26','2026-03-18 05:29:11','2026-03-21 01:38:26'),('20260320204414','2026-03-20','20:44:14','2026/03/20/0001','D001','2026-03-20','20:44:46','2026-03-20 12:44:14','2026-03-20 12:44:46'),('20260321162627','2026-03-21','16:26:27','2026/03/21/0001','12345',NULL,NULL,'2026-03-21 08:26:27','2026-03-21 08:26:27'),('20260321170036','2026-03-21','17:00:36','2026/03/21/0001','12345',NULL,NULL,'2026-03-21 09:00:36','2026-03-21 09:00:36'),('20260321170338','2026-03-21','17:03:38','2026/03/21/0001','12345',NULL,NULL,'2026-03-21 09:03:38','2026-03-21 09:03:38'),('20260321171107','2026-03-21','17:11:07','2026/03/21/0002','12345','2026-03-21','17:12:03','2026-03-21 09:11:07','2026-03-21 09:12:03'),('20260321171141','2026-03-21','17:11:41','2026/03/21/0002','12345','2026-03-21','17:12:03','2026-03-21 09:11:41','2026-03-21 09:12:03'),('FIX004525','2026-03-13','00:45:25','2026/03/12/0001','D001','2026-03-13','01:35:45','2026-03-12 16:45:25','2026-03-12 17:35:45'),('MUL010027','2026-03-13','01:00:27','2026/03/12/0001','D001','2026-03-13','01:35:45','2026-03-12 17:00:27','2026-03-12 17:35:45'),('TEST150722','2026-03-12','15:07:22','2026/03/12/0001','D001','2026-03-13','01:35:45','2026-03-12 07:07:22','2026-03-12 17:35:45');
/*!40000 ALTER TABLE `resep_obat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `nama` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nilai` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`nama`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES ('alamat_klinik','palopo','2026-03-15 05:08:09','2026-03-15 06:56:02'),('email_klinik','bara@gmail.com','2026-03-15 05:08:09','2026-03-15 06:56:02'),('kontak_klinik','08511476001','2026-03-15 05:08:09','2026-03-15 06:56:02'),('nama_klinik','SIMKlinik Anak','2026-03-15 05:08:09','2026-03-15 05:08:09'),('rt_speed','40','2026-03-15 05:08:09','2026-03-18 00:25:36'),('running_text','uji coba sistem laravel dev klinik anak','2026-03-15 05:08:09','2026-03-17 22:10:12');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stok_obat`
--

DROP TABLE IF EXISTS `stok_obat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stok_obat` (
  `kode_brng` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stok` double NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`kode_brng`),
  CONSTRAINT `stok_obat_kode_brng_foreign` FOREIGN KEY (`kode_brng`) REFERENCES `databarang` (`kode_brng`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stok_obat`
--

LOCK TABLES `stok_obat` WRITE;
/*!40000 ALTER TABLE `stok_obat` DISABLE KEYS */;
INSERT INTO `stok_obat` VALUES ('0054',980,NULL,'2026-03-22 00:29:24'),('0145',1979,NULL,'2026-03-22 00:27:43'),('0214',961,NULL,'2026-03-21 14:19:22');
/*!40000 ALTER TABLE `stok_obat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stok_opname`
--

DROP TABLE IF EXISTS `stok_opname`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stok_opname` (
  `no_opname` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_opname` date NOT NULL,
  `kode_brng` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stok_sistem` double NOT NULL,
  `stok_fisik` double NOT NULL,
  `selisih` double NOT NULL,
  `keterangan` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`no_opname`),
  KEY `stok_opname_kode_brng_foreign` (`kode_brng`),
  CONSTRAINT `stok_opname_kode_brng_foreign` FOREIGN KEY (`kode_brng`) REFERENCES `databarang` (`kode_brng`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stok_opname`
--

LOCK TABLES `stok_opname` WRITE;
/*!40000 ALTER TABLE `stok_opname` DISABLE KEYS */;
INSERT INTO `stok_opname` VALUES ('OP20260314033652212','2026-03-14','0145',10,10,10,'Audit Penyesuaian Stok','2026-03-13 19:36:52','2026-03-13 19:36:52'),('OP20260314033652231','2026-03-14','0214',30,30,30,'Audit Penyesuaian Stok','2026-03-13 19:36:52','2026-03-13 19:36:52'),('OP20260314033757257','2026-03-14','0214',20,20,-10,'Audit Penyesuaian Stok','2026-03-13 19:37:57','2026-03-13 19:37:57'),('OP20260314033757350','2026-03-14','0145',8,8,-2,'Audit Penyesuaian Stok','2026-03-13 19:37:57','2026-03-13 19:37:57'),('OP20260318055008228','2026-03-18','0145',102,102,100,'Audit Penyesuaian Stok','2026-03-17 21:50:08','2026-03-17 21:50:08'),('OP20260318055022767','2026-03-18','0214',100,100,100,'Audit Penyesuaian Stok','2026-03-17 21:50:22','2026-03-17 21:50:22'),('OP20260318132947106','2026-03-18','0145',81,81,10,'Audit Penyesuaian Stok','2026-03-18 05:29:47','2026-03-18 05:29:47'),('OP20260321170234559','2026-03-21','0145',1009,1009,1000,'Audit Penyesuaian Stok','2026-03-21 09:02:34','2026-03-21 09:02:34'),('OP20260321170301861','2026-03-21','0214',1002,1002,1000,'Audit Penyesuaian Stok','2026-03-21 09:03:01','2026-03-21 09:03:01'),('OP20260321170316895','2026-03-21','0054',1000,1000,1000,'Audit Penyesuaian Stok','2026-03-21 09:03:16','2026-03-21 09:03:16'),('OP20260321221922001','2026-03-21','0145',979,979,1,'Audit Penyesuaian Stok','2026-03-21 14:19:22','2026-03-21 14:19:22'),('OP20260321221922002','2026-03-21','0214',961,961,1,'Audit Penyesuaian Stok','2026-03-21 14:19:22','2026-03-21 14:19:22'),('OP20260321221922003','2026-03-21','0054',980,980,1,'Audit Penyesuaian Stok','2026-03-21 14:19:22','2026-03-21 14:19:22'),('RX2026031403570325','2026-03-14','0214',0,0,-10,'Resep Elektronik: 2026/03/12/0001','2026-03-13 19:57:03','2026-03-13 19:57:03'),('RX2026031515051384','2026-03-15','0145',3,3,-5,'Resep Elektronik: 2026/03/12/0001','2026-03-15 07:05:13','2026-03-15 07:05:13'),('RX2026031805485423','2026-03-18','0145',2,2,-1,'Resep Elektronik: 2026/03/18/0001','2026-03-17 21:48:54','2026-03-17 21:48:54'),('RX2026031805504339','2026-03-18','0145',101,101,-1,'Resep Elektronik: 2026/03/18/0001','2026-03-17 21:50:43','2026-03-17 21:50:43'),('RX2026031805504378','2026-03-18','0214',99,99,-1,'Resep Elektronik: 2026/03/18/0001','2026-03-17 21:50:43','2026-03-17 21:50:43'),('RX2026031806012624','2026-03-18','0214',94,94,-5,'Resep Elektronik: 2026/03/18/0001','2026-03-17 22:01:26','2026-03-17 22:01:26'),('RX2026031806012689','2026-03-18','0145',91,91,-10,'Resep Elektronik: 2026/03/18/0001','2026-03-17 22:01:26','2026-03-17 22:01:26'),('RX2026031813291160','2026-03-18','0145',71,71,-3,'Resep Elektronik: 2026/03/18/0001','2026-03-18 05:29:11','2026-03-18 05:29:11'),('RX2026032020441440','2026-03-20','0145',79,79,-2,'Resep Elektronik: 2026/03/20/0001','2026-03-20 12:44:14','2026-03-20 12:44:14'),('RX2026032109073233','2026-03-21','0145',67,67,-10,'Resep Racikan: batuk','2026-03-21 01:07:32','2026-03-21 01:07:32'),('RX2026032109133040','2026-03-21','0145',47,47,-10,'Resep Racikan: batuk','2026-03-21 01:13:30','2026-03-21 01:13:30'),('RX2026032109133041','2026-03-21','0214',54,54,-10,'Resep Racikan: demam','2026-03-21 01:13:30','2026-03-21 01:13:30'),('RX2026032109133094','2026-03-21','0145',57,57,-10,'Resep Racikan: pusing','2026-03-21 01:13:30','2026-03-21 01:13:30'),('RX2026032109374553','2026-03-21','0145',46,46,-1,'Resep Elektronik: 2026/03/21/0001','2026-03-21 01:37:45','2026-03-21 01:37:45'),('RX2026032109383945','2026-03-21','0145',41,41,-1,'Resep Elektronik: 2026/03/21/0001','2026-03-21 01:38:39','2026-03-21 01:38:39'),('RX2026032109394026','2026-03-21','0214',44,44,-10,'Resep Racikan: batuk','2026-03-21 01:39:40','2026-03-21 01:39:40'),('RX2026032109394057','2026-03-21','0145',31,31,-10,'Resep Racikan: batuk','2026-03-21 01:39:40','2026-03-21 01:39:40'),('RX2026032109445459','2026-03-21','0214',43,43,-1,'Resep Elektronik: 2026/03/21/0001','2026-03-21 01:44:54','2026-03-21 01:44:54'),('RX2026032109465828','2026-03-21','0145',30,30,-1,'Resep Elektronik: 2026/03/21/0002','2026-03-21 01:46:58','2026-03-21 01:46:58'),('RX2026032111020777','2026-03-21','0145',29,29,-1,'Resep Elektronik: 2026/03/21/0001','2026-03-21 03:02:07','2026-03-21 03:02:07'),('RX2026032111022211','2026-03-21','0145',19,19,-10,'Resep Racikan: batuk','2026-03-21 03:02:22','2026-03-21 03:02:22'),('RX2026032111022276','2026-03-21','0214',33,33,-10,'Resep Racikan: batuk','2026-03-21 03:02:22','2026-03-21 03:02:22'),('RX2026032111041636','2026-03-21','0145',20,20,-10,'Resep Racikan: batuk','2026-03-21 03:04:16','2026-03-21 03:04:16'),('RX2026032111041688','2026-03-21','0214',12,12,-10,'Resep Racikan: batuk','2026-03-21 03:04:16','2026-03-21 03:04:16'),('RX2026032116262754','2026-03-21','0145',9,9,-1,'Resep Elektronik: 2026/03/21/0001','2026-03-21 08:26:27','2026-03-21 08:26:27'),('RX2026032117003611','2026-03-21','0214',2,2,-10,'Resep Racikan: batuk','2026-03-21 09:00:36','2026-03-21 09:00:36'),('RX2026032117033845','2026-03-21','0054',990,990,-10,'Resep Racikan: pilek','2026-03-21 09:03:38','2026-03-21 09:03:38'),('RX2026032117033886','2026-03-21','0145',999,999,-10,'Resep Racikan: pilek','2026-03-21 09:03:38','2026-03-21 09:03:38'),('RX2026032117033889','2026-03-21','0214',992,992,-10,'Resep Racikan: pilek','2026-03-21 09:03:38','2026-03-21 09:03:38'),('RX2026032117110726','2026-03-21','0054',989,989,-1,'Resep Elektronik: 2026/03/21/0002','2026-03-21 09:11:07','2026-03-21 09:11:07'),('RX2026032117114112','2026-03-21','0214',960,960,-12,'Resep Racikan: stres','2026-03-21 09:11:41','2026-03-21 09:11:41'),('RX2026032117114132','2026-03-21','0145',978,978,-11,'Resep Racikan: stres','2026-03-21 09:11:41','2026-03-21 09:11:41'),('RX2026032117114150','2026-03-21','0054',979,979,-10,'Resep Racikan: stres','2026-03-21 09:11:41','2026-03-21 09:11:41');
/*!40000 ALTER TABLE `stok_opname` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarif_tindakan`
--

DROP TABLE IF EXISTS `tarif_tindakan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tarif_tindakan` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nama_tindakan` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tarif` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarif_tindakan`
--

LOCK TABLES `tarif_tindakan` WRITE;
/*!40000 ALTER TABLE `tarif_tindakan` DISABLE KEYS */;
INSERT INTO `tarif_tindakan` VALUES (1,'tensi',5000,'2026-03-15 06:27:17','2026-03-15 06:27:17'),(2,'ttv',20000,'2026-03-15 06:27:35','2026-03-15 06:27:35'),(3,'suntik',30000,'2026-03-21 09:57:39','2026-03-21 09:57:39');
/*!40000 ALTER TABLE `tarif_tindakan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_pegawai`
--

DROP TABLE IF EXISTS `user_pegawai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_pegawai` (
  `id_user` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_pegawai` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jk` enum('L','P') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tmp_lahir` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `gol_darah` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agama` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_telp` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stts_nikah` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alumni` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jabatan` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nik` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto_profil` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_pegawai`
--

LOCK TABLES `user_pegawai` WRITE;
/*!40000 ALTER TABLE `user_pegawai` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_pegawai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Test User','testuser@example.com',NULL,'$2y$10$baRTByHiAPsCrT5aLu7CfOtCViCOFm4yvsUC31dUO2L/oGKsSKhsO',NULL,'2026-03-15 06:47:54','2026-03-15 06:47:54');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `websockets_statistics_entries`
--

DROP TABLE IF EXISTS `websockets_statistics_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `websockets_statistics_entries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `app_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `peak_connection_count` int(11) NOT NULL,
  `websocket_message_count` int(11) NOT NULL,
  `api_message_count` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `websockets_statistics_entries`
--

LOCK TABLES `websockets_statistics_entries` WRITE;
/*!40000 ALTER TABLE `websockets_statistics_entries` DISABLE KEYS */;
/*!40000 ALTER TABLE `websockets_statistics_entries` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-26 10:57:39
