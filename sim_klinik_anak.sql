-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 18 Mar 2026 pada 02.57
-- Versi server: 10.4.25-MariaDB
-- Versi PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sim_klinik_anak`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `usere` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passworde` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`usere`, `passworde`) VALUES
('ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'VHVZWXFNdVJjU3B2VEo0bm5ldm9adz09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `audit_log`
--

CREATE TABLE `audit_log` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_address` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `audit_log`
--

INSERT INTO `audit_log` (`id`, `user_id`, `action`, `description`, `ip_address`, `user_agent`, `created_at`) VALUES
(1, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REGISTER_PASIEN', 'Mendaftarkan pasien baru No. RM: 000001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:02:39'),
(2, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REG_POLI', 'Mendaftarkan pasien ke Poli Anak. No Rawat: 2026/03/12/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:38:36'),
(3, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REG_POLI', 'Registrasi Baru Detail: 2026/03/12/0002', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:51:22'),
(4, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REGISTER_PASIEN', 'Mendaftarkan pasien baru No. RM: 000002', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 05:07:01'),
(5, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REG_POLI', 'Registrasi Baru Detail: 2026/03/12/0003', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 05:20:27'),
(6, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'CANCEL_REG_POLI', 'Membatalkan registrasi No Rawat: 2026/03/12/0001 untuk Pasien: 000001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 05:29:15'),
(7, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'CANCEL_REG_POLI', 'Membatalkan registrasi No Rawat: 2026/03/12/0002 untuk Pasien: 000001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 05:31:32'),
(8, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'CANCEL_REG_POLI', 'Membatalkan registrasi No Rawat: 2026/03/12/0003 untuk Pasien: 000002', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 05:31:39'),
(9, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REG_POLI', 'Registrasi Baru Detail: 2026/03/12/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 05:31:45'),
(10, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'SIMPAN_RME', 'Mengisi Rekam Medis No Rawat: 2026/03/12/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 05:56:58'),
(11, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REG_POLI', 'Registrasi Baru Detail: 2026/03/12/0002', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 06:19:13'),
(12, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'HAPUS_RME', 'Hapus Rekam Medis No Rawat: 2026/03/12/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 08:35:07'),
(13, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'SIMPAN_RME', 'Mengisi Rekam Medis No Rawat: 2026/03/12/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 08:35:44'),
(14, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'UPDATE_RME', 'Update Rekam Medis No Rawat: 2026/03/12/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 08:35:54'),
(15, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'UPDATE_RME', 'Update Rekam Medis No Rawat: 2026/03/12/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 08:39:36'),
(16, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'SIMPAN_RME', 'Mengisi Rekam Medis No Rawat: 2026/03/12/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 08:57:48'),
(17, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'HAPUS_RME', 'Hapus Rekam Medis No Rawat: 2026/03/12/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 08:58:36'),
(18, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'HAPUS_RME', 'Hapus Rekam Medis No Rawat: 2026/03/12/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 09:02:07'),
(19, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'SIMPAN_RME', 'Mengisi Rekam Medis No Rawat: 2026/03/12/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 09:02:20'),
(20, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 13:26:06'),
(21, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:46:41'),
(22, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 06:18:59'),
(23, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'UPDATE_PASIEN', 'Mengubah data pasien No. RM: 000002', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 07:30:43'),
(24, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-14 00:25:31'),
(25, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 01:15:08'),
(26, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'LOGOUT', 'User logged out: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 01:51:23'),
(27, 'allVUTYzM1dCUUovY2Q3ZkpJcldUZz09', 'LOGIN_SUCCESS', 'Pegawai login: bara ji', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 01:51:33'),
(28, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 01:51:44'),
(29, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'LOGOUT', 'User logged out: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 02:17:52'),
(30, 'allVUTYzM1dCUUovY2Q3ZkpJcldUZz09', 'LOGIN_SUCCESS', 'Pegawai login: bara ji', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 02:18:02'),
(31, 'GUEST', 'LOGIN_SUCCESS', 'Pegawai login: bara ji', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 02:26:59'),
(32, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 02:27:51'),
(33, 'GUEST', 'LOGIN_SUCCESS', 'Pegawai login: bara ji', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 02:41:38'),
(34, 'GUEST', 'LOGIN_SUCCESS', 'Pegawai login: bara ji', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 02:42:09'),
(35, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'LOGOUT', 'User logged out: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 03:10:20'),
(36, 'GUEST', 'LOGIN_SUCCESS', 'Pegawai login: bara ji', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 03:10:27'),
(37, 'allVUTYzM1dCUUovY2Q3ZkpJcldUZz09', 'LOGOUT', 'User logged out: bara ji', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 03:10:34'),
(38, 'GUEST', 'LOGIN_SUCCESS', 'Pegawai login: bara ji', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 03:10:42'),
(39, 'LzZEaGNtQkVNQkZ4S01IKzFCOVoyQT09', 'LOGOUT', 'User logged out: bara ji', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 03:10:54'),
(40, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 03:11:01'),
(41, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'LOGOUT', 'User logged out: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 03:11:40'),
(42, 'GUEST', 'LOGIN_SUCCESS', 'Pegawai login: Dr. Siska, Sp.A', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 03:11:45'),
(43, 'MlhOeEJMMmQyREFvS0JWM3JZUVd3Zz09', 'LOGOUT', 'User logged out: Dr. Siska, Sp.A', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 03:18:43'),
(44, 'GUEST', 'LOGIN_SUCCESS', 'Pegawai login: Dr. Siska, Sp.A', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 03:19:03'),
(45, 'MlhOeEJMMmQyREFvS0JWM3JZUVd3Zz09', 'LOGOUT', 'User logged out: Dr. Siska, Sp.A', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 03:22:00'),
(46, 'GUEST', 'LOGIN_SUCCESS', 'Pegawai login: bara ji', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 03:22:17'),
(47, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 08:07:19'),
(48, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 13:05:38'),
(49, 'GUEST', 'LOGIN_FAILED', 'Failed login attempt for username: admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 14:46:46'),
(50, 'GUEST', 'LOGIN_FAILED', 'Failed login attempt for username: admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 14:49:07'),
(51, 'GUEST', 'LOGIN_FAILED', 'Failed login attempt for username: bara.n.fahrun', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 14:49:26'),
(52, 'GUEST', 'LOGIN_FAILED', 'Failed login attempt for username: 08511747600123', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 14:49:47'),
(53, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 14:50:58'),
(54, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-16 00:21:29'),
(55, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-16 03:12:47'),
(56, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REG_POLI', 'Registrasi Baru Detail: 2026/03/16/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-16 03:19:02'),
(57, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-16 09:44:52'),
(58, 'GUEST', 'LOGIN_FAILED', 'Failed login attempt for username: admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-16 10:51:51'),
(59, 'GUEST', 'LOGIN_FAILED', 'Failed login attempt for username: adminadmin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-16 10:52:34'),
(60, 'GUEST', 'LOGIN_FAILED', 'Failed login attempt for username: admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-16 10:52:46'),
(61, 'GUEST', 'LOGIN_FAILED', 'Failed login attempt for username: adminsuperadmin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-16 10:54:47'),
(62, 'GUEST', 'LOGIN_FAILED', 'Failed login attempt for username: anjasmara', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-16 10:56:05'),
(63, 'GUEST', 'LOGIN_FAILED', 'Failed login attempt for username: anjasmara', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-16 10:56:24'),
(64, 'GUEST', 'LOGIN_FAILED', 'Failed login attempt for username: admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-16 10:56:37'),
(65, 'GUEST', 'LOGIN_FAILED', 'Failed login attempt for username: superadmin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-16 10:57:01'),
(66, 'GUEST', 'LOGIN_FAILED', 'Failed login attempt for username: admin123', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-16 10:59:23'),
(67, 'GUEST', 'LOGIN_FAILED', 'Failed login attempt for username: admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-16 11:00:24');

-- --------------------------------------------------------

--
-- Struktur dari tabel `databarang`
--

CREATE TABLE `databarang` (
  `kode_brng` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_brng` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_sat` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hargajual` double NOT NULL DEFAULT 0,
  `status` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `databarang`
--

INSERT INTO `databarang` (`kode_brng`, `nama_brng`, `kode_sat`, `hargajual`, `status`, `created_at`, `updated_at`) VALUES
('0054', 'paracetamol 500mg', 'TAB', 1000, '1', '2026-03-12 06:02:01', '2026-03-12 06:02:01'),
('0145', 'ANTALGIN', 'TAB', 100, '1', '2026-03-13 00:42:41', '2026-03-13 00:42:41'),
('0214', 'CTM', 'TAB', 1000, '1', '2026-03-12 06:02:20', '2026-03-12 06:02:20');

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_penerimaan_obat`
--

CREATE TABLE `detail_penerimaan_obat` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `no_faktur` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_brng` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jml` double NOT NULL,
  `harga_beli` double NOT NULL,
  `tgl_expired` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `detail_penerimaan_obat`
--

INSERT INTO `detail_penerimaan_obat` (`id`, `no_faktur`, `kode_brng`, `jml`, `harga_beli`, `tgl_expired`, `created_at`, `updated_at`) VALUES
(4, 'sdfsd', '0214', 50, 100, '2026-11-11', '2026-03-12 22:54:17', '2026-03-12 22:54:17'),
(7, 'TEST-002', '0054', 20, 800, '2026-05-20', '2026-03-12 23:45:53', '2026-03-12 23:45:53');

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_tagihan_tindakan`
--

CREATE TABLE `detail_tagihan_tindakan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `no_rawat` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_tarif` bigint(20) UNSIGNED NOT NULL,
  `biaya` int(11) NOT NULL,
  `qty` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `detail_tagihan_tindakan`
--

INSERT INTO `detail_tagihan_tindakan` (`id`, `no_rawat`, `id_tarif`, `biaya`, `qty`, `created_at`, `updated_at`) VALUES
(1, '2026/03/12/0001', 1, 5000, 1, '2026-03-15 07:03:19', '2026-03-15 07:03:19'),
(2, '2026/03/16/0001', 2, 20000, 1, '2026-03-16 01:54:58', '2026-03-16 01:54:58');

-- --------------------------------------------------------

--
-- Struktur dari tabel `dokter`
--

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
  `no_sip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `dokter`
--

INSERT INTO `dokter` (`kd_dokter`, `nm_dokter`, `created_at`, `updated_at`, `jk`, `tmp_lahir`, `tgl_lahir`, `gol_darah`, `agama`, `alamat`, `no_telp`, `stts_nikah`, `alumni`, `no_sip`) VALUES
('12345', 'bara ji', '2026-03-13 21:50:02', '2026-03-13 21:50:12', 'L', 'palopo', '1984-11-11', '-', 'Islam', 'palopo', '0813422649', 'Menikah', 'palopo', '133456987'),
('D001', 'Dr. Siska, Sp.A', '2026-03-11 20:12:39', '2026-03-11 20:12:39', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2026_03_11_071457_create_sik_style_auth_tables', 1),
(6, '2026_03_12_022817_create_pasiens_table', 2),
(7, '2026_03_12_030507_create_audit_logs_table', 2),
(8, '2026_03_12_041113_create_clinic_core_tables_simple', 3),
(9, '2026_03_12_044608_add_detailed_columns_to_reg_periksa_table', 4),
(10, '2026_03_12_045641_add_detailed_columns_to_pasiens_table', 5),
(11, '2026_03_12_051748_increase_no_ktp_length_in_reg_periksa_table', 6),
(12, '2026_03_12_053337_create_pemeriksaan_ralan_table', 7),
(13, '2026_03_12_054026_add_soapie_columns_to_pemeriksaan_ralan_table', 8),
(14, '2026_03_12_084331_create_pemeriksaan_ralan_template_table', 9),
(15, '2026_03_12_131226_create_pharmacy_tables', 10),
(16, '2026_03_12_140522_create_stok_obat_table', 11),
(17, '2026_03_13_024820_create_penerimaan_obat_tables', 12),
(18, '2026_03_14_052905_add_details_to_dokter_table', 13),
(19, '2026_03_14_055802_add_details_to_user_pegawai_table', 14),
(20, '2026_03_14_060104_add_more_hr_details_to_user_pegawai_table', 15),
(21, '2026_03_14_070000_create_settings_table', 16),
(23, '2026_03_15_141358_create_tarif_tindakan_table', 17),
(24, '2026_03_15_143247_create_tagihan_tindakan_table', 18);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pasien`
--

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
  `propinsi` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pasien`
--

INSERT INTO `pasien` (`no_rkm_medis`, `nm_pasien`, `nik`, `jk`, `tgl_lahir`, `nm_ibu`, `no_tlp`, `alamat`, `tgl_daftar`, `created_at`, `updated_at`, `tmp_lahir`, `agama`, `pekerjaan`, `stts_nikah`, `gol_darah`, `pendidikan`, `no_peserta`, `email`, `suku_bangsa`, `bahasa_pasien`, `cacat_fisik`, `kelurahan`, `kecamatan`, `kabupaten`, `propinsi`) VALUES
('000001', 'tes', 'VisrQjBkcjdvaDNaV2RIL1NMcUltUT09', 'L', '1979-11-11', 'ibu', '0813422648841', 'palopo', '2026-03-11 20:02:39', '2026-03-11 20:02:39', '2026-03-11 20:02:39', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('000002', 'bara', 'Vjh0NlFrL0x5Qmo5cE1jNm84TUlOZz09', 'L', '2025-12-11', 'siti', '0823485444', 'Palopo\nTanjung', '2026-03-11 21:07:01', '2026-03-11 21:07:01', '2026-03-12 23:30:43', 'palopo', 'ISLAM', '-', 'BELUM MENIKAH', '-', '-', '000454454', 'baranurfahrun@gmail.com', '-', 'BAHASA INDONESIA', '-', 'palopo', 'palopo', 'palopo', 'Sulawesi Selatan');

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pemeriksaan_ralan`
--

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
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pemeriksaan_ralan`
--

INSERT INTO `pemeriksaan_ralan` (`no_rawat`, `tgl_pemeriksaan`, `jam_pemeriksaan`, `suhu_tubuh`, `tensi`, `nadi`, `respirasi`, `spo2`, `tinggi`, `berat`, `lingkar_perut`, `gcs`, `kesadaran`, `keluhan`, `pemeriksaan`, `penilaian`, `tindak_lanjut`, `instruksi`, `evaluasi`, `alergi`, `nip`, `created_at`, `updated_at`) VALUES
('2026/03/12/0001', '2026-03-12', '09:02:20', '4', '4', '4', '4', '4', '4', '4', '4', '4', 'Compos Mentis', 'fghf', 'fgh', 'fgh', 'fgh', 'fgh', 'fgh', 'fg', '', '2026-03-12 01:02:20', '2026-03-12 01:02:20');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pemeriksaan_ralan_template`
--

CREATE TABLE `pemeriksaan_ralan_template` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keluhan` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pemeriksaan` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `penilaian` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tindak_lanjut` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instruksi` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `evaluasi` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pemeriksaan_ralan_template`
--

INSERT INTO `pemeriksaan_ralan_template` (`id`, `nip`, `keluhan`, `pemeriksaan`, `penilaian`, `tindak_lanjut`, `instruksi`, `evaluasi`, `created_at`, `updated_at`) VALUES
(1, '', 'fghf', 'fgh', 'fgh', 'fgh', 'fgh', 'fgh', '2026-03-12 00:57:48', '2026-03-12 00:57:48');

-- --------------------------------------------------------

--
-- Struktur dari tabel `penerimaan_obat`
--

CREATE TABLE `penerimaan_obat` (
  `no_faktur` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_penerimaan` date NOT NULL,
  `supplier` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keterangan` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_bayar` double NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `penerimaan_obat`
--

INSERT INTO `penerimaan_obat` (`no_faktur`, `tgl_penerimaan`, `supplier`, `keterangan`, `total_bayar`, `created_at`, `updated_at`) VALUES
('sdfsd', '2026-03-13', 'fvdf', NULL, 5000, '2026-03-12 22:54:17', '2026-03-12 22:54:17'),
('TEST-002', '2026-01-15', 'CV. FARMASI SEJAHTERA', NULL, 16000, '2026-03-12 23:45:53', '2026-03-12 23:45:53');

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `poliklinik`
--

CREATE TABLE `poliklinik` (
  `kd_poli` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nm_poli` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `poliklinik`
--

INSERT INTO `poliklinik` (`kd_poli`, `nm_poli`, `created_at`, `updated_at`) VALUES
('PA', 'Poliklinik Anak', '2026-03-11 20:12:39', '2026-03-11 20:12:39');

-- --------------------------------------------------------

--
-- Struktur dari tabel `reg_periksa`
--

CREATE TABLE `reg_periksa` (
  `no_reg` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_rawat` varchar(17) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `no_ktp` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `reg_periksa`
--

INSERT INTO `reg_periksa` (`no_reg`, `no_rawat`, `tgl_registrasi`, `jam_reg`, `kd_dokter`, `no_rkm_medis`, `kd_poli`, `stts`, `status_lanjut`, `created_at`, `updated_at`, `p_jawab`, `hubunganpj`, `almt_pj`, `kd_pj`, `asal_rujukan`, `no_ktp`) VALUES
('001', '2026/03/12/0001', '2026-03-12', '05:31:45', 'D001', '000002', 'PA', 'Sudah', 'Ralan', '2026-03-11 21:31:45', '2026-03-12 01:02:20', 'siti', 'Ibu', 'Palopo\nTanjung', 'BJS', '-', '000454454 / 732200524564141'),
('002', '2026/03/12/0002', '2026-03-12', '06:19:13', 'D001', '000001', 'PA', 'Belum', 'Ralan', '2026-03-11 22:19:13', '2026-03-11 22:19:13', 'ibu', 'Ibu', 'palopo', 'UMM', '-', '123456789'),
('001', '2026/03/16/0001', '2026-03-16', '03:19:01', '12345', '000002', 'PA', 'Belum', 'Ralan', '2026-03-15 19:19:02', '2026-03-15 19:19:02', 'siti', 'Ibu', 'Palopo\nTanjung', 'BJS', '-', '000454454 / 732200524564141');

-- --------------------------------------------------------

--
-- Struktur dari tabel `resep_dokter`
--

CREATE TABLE `resep_dokter` (
  `no_resep` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_brng` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jml` double NOT NULL,
  `aturan_pakai` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `resep_dokter`
--

INSERT INTO `resep_dokter` (`no_resep`, `kode_brng`, `jml`, `aturan_pakai`, `created_at`, `updated_at`) VALUES
('20260313084428', '0145', 10, '3 x 1', '2026-03-13 00:44:28', '2026-03-13 00:44:28'),
('20260313084711', '0214', 4, '3 x 1', '2026-03-13 00:47:11', '2026-03-13 00:47:11'),
('20260314034034', '0214', 10, '3 x 1', '2026-03-13 19:40:34', '2026-03-13 19:40:34'),
('20260314035703', '0214', 10, '3 x 1', '2026-03-13 19:57:03', '2026-03-13 19:57:03'),
('20260315150513', '0145', 5, '3 x 1', '2026-03-15 07:05:13', '2026-03-15 07:05:13'),
('FIX004525', '0054', 10, '3 x 1 Sesudah Makan', '2026-03-12 16:45:25', '2026-03-12 16:45:25'),
('MUL010027', '0214', 6, '2 x 1', '2026-03-12 17:00:27', '2026-03-12 17:00:27');

-- --------------------------------------------------------

--
-- Struktur dari tabel `resep_obat`
--

CREATE TABLE `resep_obat` (
  `no_resep` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_perawatan` date NOT NULL,
  `jam_perawatan` time NOT NULL,
  `no_rawat` varchar(17) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kd_dokter` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_penyerahan` date DEFAULT NULL,
  `jam_penyerahan` time DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `resep_obat`
--

INSERT INTO `resep_obat` (`no_resep`, `tgl_perawatan`, `jam_perawatan`, `no_rawat`, `kd_dokter`, `tgl_penyerahan`, `jam_penyerahan`, `created_at`, `updated_at`) VALUES
('20260313084428', '2026-03-13', '08:44:28', '2026/03/12/0001', 'D001', '2026-03-13', '08:44:46', '2026-03-13 00:44:28', '2026-03-13 00:44:46'),
('20260313084711', '2026-03-13', '08:47:11', '2026/03/12/0001', 'D001', NULL, NULL, '2026-03-13 00:47:11', '2026-03-13 00:47:11'),
('20260314034034', '2026-03-14', '03:40:34', '2026/03/12/0001', 'D001', NULL, NULL, '2026-03-13 19:40:34', '2026-03-13 19:40:34'),
('20260314035703', '2026-03-14', '03:57:03', '2026/03/12/0001', 'D001', NULL, NULL, '2026-03-13 19:57:03', '2026-03-13 19:57:03'),
('20260315150513', '2026-03-15', '15:05:13', '2026/03/12/0001', 'D001', NULL, NULL, '2026-03-15 07:05:13', '2026-03-15 07:05:13'),
('FIX004525', '2026-03-13', '00:45:25', '2026/03/12/0001', 'D001', '2026-03-13', '01:35:45', '2026-03-12 16:45:25', '2026-03-12 17:35:45'),
('MUL010027', '2026-03-13', '01:00:27', '2026/03/12/0001', 'D001', '2026-03-13', '01:35:45', '2026-03-12 17:00:27', '2026-03-12 17:35:45'),
('TEST150722', '2026-03-12', '15:07:22', '2026/03/12/0001', 'D001', '2026-03-13', '01:35:45', '2026-03-12 07:07:22', '2026-03-12 17:35:45');

-- --------------------------------------------------------

--
-- Struktur dari tabel `settings`
--

CREATE TABLE `settings` (
  `nama` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nilai` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `settings`
--

INSERT INTO `settings` (`nama`, `nilai`, `created_at`, `updated_at`) VALUES
('alamat_klinik', 'palopo', '2026-03-15 05:08:09', '2026-03-15 06:56:02'),
('email_klinik', 'bara@gmail.com', '2026-03-15 05:08:09', '2026-03-15 06:56:02'),
('kontak_klinik', '08511476001', '2026-03-15 05:08:09', '2026-03-15 06:56:02'),
('nama_klinik', 'SIMKlinik Anak', '2026-03-15 05:08:09', '2026-03-15 05:08:09'),
('rt_speed', '40', '2026-03-15 05:08:09', '2026-03-15 05:11:27'),
('running_text', '@2026 bara.n.fahrun-085117476001', '2026-03-15 05:08:09', '2026-03-15 05:50:27');

-- --------------------------------------------------------

--
-- Struktur dari tabel `stok_obat`
--

CREATE TABLE `stok_obat` (
  `kode_brng` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stok` double NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `stok_obat`
--

INSERT INTO `stok_obat` (`kode_brng`, `stok`, `created_at`, `updated_at`) VALUES
('0054', 0, NULL, '2026-03-13 17:22:37'),
('0145', 3, NULL, '2026-03-13 19:37:57'),
('0214', 0, NULL, '2026-03-13 19:37:57');

-- --------------------------------------------------------

--
-- Struktur dari tabel `stok_opname`
--

CREATE TABLE `stok_opname` (
  `no_opname` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_opname` date NOT NULL,
  `kode_brng` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stok_sistem` double NOT NULL,
  `stok_fisik` double NOT NULL,
  `selisih` double NOT NULL,
  `keterangan` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `stok_opname`
--

INSERT INTO `stok_opname` (`no_opname`, `tgl_opname`, `kode_brng`, `stok_sistem`, `stok_fisik`, `selisih`, `keterangan`, `created_at`, `updated_at`) VALUES
('OP20260314033652212', '2026-03-14', '0145', 10, 10, 10, 'Audit Penyesuaian Stok', '2026-03-13 19:36:52', '2026-03-13 19:36:52'),
('OP20260314033652231', '2026-03-14', '0214', 30, 30, 30, 'Audit Penyesuaian Stok', '2026-03-13 19:36:52', '2026-03-13 19:36:52'),
('OP20260314033757257', '2026-03-14', '0214', 20, 20, -10, 'Audit Penyesuaian Stok', '2026-03-13 19:37:57', '2026-03-13 19:37:57'),
('OP20260314033757350', '2026-03-14', '0145', 8, 8, -2, 'Audit Penyesuaian Stok', '2026-03-13 19:37:57', '2026-03-13 19:37:57'),
('RX2026031403570325', '2026-03-14', '0214', 0, 0, -10, 'Resep Elektronik: 2026/03/12/0001', '2026-03-13 19:57:03', '2026-03-13 19:57:03'),
('RX2026031515051384', '2026-03-15', '0145', 3, 3, -5, 'Resep Elektronik: 2026/03/12/0001', '2026-03-15 07:05:13', '2026-03-15 07:05:13');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tarif_tindakan`
--

CREATE TABLE `tarif_tindakan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_tindakan` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tarif` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `tarif_tindakan`
--

INSERT INTO `tarif_tindakan` (`id`, `nama_tindakan`, `tarif`, `created_at`, `updated_at`) VALUES
(1, 'tensi', 5000, '2026-03-15 06:27:17', '2026-03-15 06:27:17'),
(2, 'ttv', 20000, '2026-03-15 06:27:35', '2026-03-15 06:27:35');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Test User', 'testuser@example.com', NULL, '$2y$10$baRTByHiAPsCrT5aLu7CfOtCViCOFm4yvsUC31dUO2L/oGKsSKhsO', NULL, '2026-03-15 06:47:54', '2026-03-15 06:47:54');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_pegawai`
--

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
  `nik` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `user_pegawai`
--

INSERT INTO `user_pegawai` (`id_user`, `nama_pegawai`, `jk`, `tmp_lahir`, `tgl_lahir`, `gol_darah`, `agama`, `alamat`, `no_telp`, `stts_nikah`, `alumni`, `jabatan`, `password`, `nik`) VALUES
('allVUTYzM1dCUUovY2Q3ZkpJcldUZz09', 'bara ji', 'L', 'palopo', '1984-11-11', '-', 'Islam', 'palopo', '0813426568', 'Menikah', 'palopo', 'it', 'M3oxTlB5ZWxWTSs4SS85S2UyMXZMZz09', '123456'),
('LzZEaGNtQkVNQkZ4S01IKzFCOVoyQT09', 'bara ji', NULL, NULL, NULL, NULL, NULL, 'palopo', '0813422649', 'Menikah', NULL, 'Dokter', 'VisrQjBkcjdvaDNaV2RIL1NMcUltUT09', '12345'),
('MlhOeEJMMmQyREFvS0JWM3JZUVd3Zz09', 'Dr. Siska, Sp.A', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Dokter', 'MlhOeEJMMmQyREFvS0JWM3JZUVd3Zz09', 'D001');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`usere`);

--
-- Indeks untuk tabel `audit_log`
--
ALTER TABLE `audit_log`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `databarang`
--
ALTER TABLE `databarang`
  ADD PRIMARY KEY (`kode_brng`);

--
-- Indeks untuk tabel `detail_penerimaan_obat`
--
ALTER TABLE `detail_penerimaan_obat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `detail_penerimaan_obat_no_faktur_foreign` (`no_faktur`);

--
-- Indeks untuk tabel `detail_tagihan_tindakan`
--
ALTER TABLE `detail_tagihan_tindakan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `detail_tagihan_tindakan_id_tarif_foreign` (`id_tarif`);

--
-- Indeks untuk tabel `dokter`
--
ALTER TABLE `dokter`
  ADD PRIMARY KEY (`kd_dokter`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pasien`
--
ALTER TABLE `pasien`
  ADD PRIMARY KEY (`no_rkm_medis`);

--
-- Indeks untuk tabel `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indeks untuk tabel `pemeriksaan_ralan`
--
ALTER TABLE `pemeriksaan_ralan`
  ADD PRIMARY KEY (`no_rawat`,`tgl_pemeriksaan`,`jam_pemeriksaan`);

--
-- Indeks untuk tabel `pemeriksaan_ralan_template`
--
ALTER TABLE `pemeriksaan_ralan_template`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `penerimaan_obat`
--
ALTER TABLE `penerimaan_obat`
  ADD PRIMARY KEY (`no_faktur`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indeks untuk tabel `poliklinik`
--
ALTER TABLE `poliklinik`
  ADD PRIMARY KEY (`kd_poli`);

--
-- Indeks untuk tabel `reg_periksa`
--
ALTER TABLE `reg_periksa`
  ADD PRIMARY KEY (`no_rawat`),
  ADD KEY `reg_periksa_kd_poli_foreign` (`kd_poli`),
  ADD KEY `reg_periksa_kd_dokter_foreign` (`kd_dokter`),
  ADD KEY `reg_periksa_no_rkm_medis_foreign` (`no_rkm_medis`);

--
-- Indeks untuk tabel `resep_dokter`
--
ALTER TABLE `resep_dokter`
  ADD PRIMARY KEY (`no_resep`,`kode_brng`),
  ADD KEY `resep_dokter_kode_brng_foreign` (`kode_brng`);

--
-- Indeks untuk tabel `resep_obat`
--
ALTER TABLE `resep_obat`
  ADD PRIMARY KEY (`no_resep`),
  ADD KEY `resep_obat_no_rawat_foreign` (`no_rawat`),
  ADD KEY `resep_obat_kd_dokter_foreign` (`kd_dokter`);

--
-- Indeks untuk tabel `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`nama`);

--
-- Indeks untuk tabel `stok_obat`
--
ALTER TABLE `stok_obat`
  ADD PRIMARY KEY (`kode_brng`);

--
-- Indeks untuk tabel `stok_opname`
--
ALTER TABLE `stok_opname`
  ADD PRIMARY KEY (`no_opname`),
  ADD KEY `stok_opname_kode_brng_foreign` (`kode_brng`);

--
-- Indeks untuk tabel `tarif_tindakan`
--
ALTER TABLE `tarif_tindakan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indeks untuk tabel `user_pegawai`
--
ALTER TABLE `user_pegawai`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `audit_log`
--
ALTER TABLE `audit_log`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT untuk tabel `detail_penerimaan_obat`
--
ALTER TABLE `detail_penerimaan_obat`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `detail_tagihan_tindakan`
--
ALTER TABLE `detail_tagihan_tindakan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT untuk tabel `pemeriksaan_ralan_template`
--
ALTER TABLE `pemeriksaan_ralan_template`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `tarif_tindakan`
--
ALTER TABLE `tarif_tindakan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `detail_penerimaan_obat`
--
ALTER TABLE `detail_penerimaan_obat`
  ADD CONSTRAINT `detail_penerimaan_obat_no_faktur_foreign` FOREIGN KEY (`no_faktur`) REFERENCES `penerimaan_obat` (`no_faktur`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `detail_tagihan_tindakan`
--
ALTER TABLE `detail_tagihan_tindakan`
  ADD CONSTRAINT `detail_tagihan_tindakan_id_tarif_foreign` FOREIGN KEY (`id_tarif`) REFERENCES `tarif_tindakan` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pemeriksaan_ralan`
--
ALTER TABLE `pemeriksaan_ralan`
  ADD CONSTRAINT `pemeriksaan_ralan_no_rawat_foreign` FOREIGN KEY (`no_rawat`) REFERENCES `reg_periksa` (`no_rawat`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `reg_periksa`
--
ALTER TABLE `reg_periksa`
  ADD CONSTRAINT `reg_periksa_kd_dokter_foreign` FOREIGN KEY (`kd_dokter`) REFERENCES `dokter` (`kd_dokter`),
  ADD CONSTRAINT `reg_periksa_kd_poli_foreign` FOREIGN KEY (`kd_poli`) REFERENCES `poliklinik` (`kd_poli`),
  ADD CONSTRAINT `reg_periksa_no_rkm_medis_foreign` FOREIGN KEY (`no_rkm_medis`) REFERENCES `pasien` (`no_rkm_medis`);

--
-- Ketidakleluasaan untuk tabel `resep_dokter`
--
ALTER TABLE `resep_dokter`
  ADD CONSTRAINT `resep_dokter_kode_brng_foreign` FOREIGN KEY (`kode_brng`) REFERENCES `databarang` (`kode_brng`),
  ADD CONSTRAINT `resep_dokter_no_resep_foreign` FOREIGN KEY (`no_resep`) REFERENCES `resep_obat` (`no_resep`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `resep_obat`
--
ALTER TABLE `resep_obat`
  ADD CONSTRAINT `resep_obat_kd_dokter_foreign` FOREIGN KEY (`kd_dokter`) REFERENCES `dokter` (`kd_dokter`),
  ADD CONSTRAINT `resep_obat_no_rawat_foreign` FOREIGN KEY (`no_rawat`) REFERENCES `reg_periksa` (`no_rawat`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `stok_obat`
--
ALTER TABLE `stok_obat`
  ADD CONSTRAINT `stok_obat_kode_brng_foreign` FOREIGN KEY (`kode_brng`) REFERENCES `databarang` (`kode_brng`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `stok_opname`
--
ALTER TABLE `stok_opname`
  ADD CONSTRAINT `stok_opname_kode_brng_foreign` FOREIGN KEY (`kode_brng`) REFERENCES `databarang` (`kode_brng`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
