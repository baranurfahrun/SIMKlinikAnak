-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Apr 2026 pada 14.01
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
  `passworde` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto_profil` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`usere`, `passworde`, `nama`, `foto_profil`) VALUES
('aFcva0NIWEFSVFFRd29TK3VIZFZ6UT09', 'aFcva0NIWEFSVFFRd29TK3VIZFZ6UT09', 'admin-2', NULL),
('ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'VHVZWXFNdVJjU3B2VEo0bm5ldm9adz09', 'Super Admin', '/storage/avatars/profile_admin.png');

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
(67, 'GUEST', 'LOGIN_FAILED', 'Failed login attempt for username: admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-16 11:00:24'),
(68, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 05:10:04'),
(69, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REG_POLI', 'Mendaftarkan pasien ke Poli Anak. No Rawat: 2026/03/27/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 05:10:14'),
(70, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 05:32:30'),
(71, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REG_POLI', 'Mendaftarkan pasien ke Poli Anak. No Rawat: 2026/03/27/0002', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 05:32:48'),
(72, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'SIMPAN_RME', 'Mengisi Rekam Medis No Rawat: 2026/03/27/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 05:48:27'),
(73, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'CANCEL_REG_POLI', 'Membatalkan registrasi No Rawat: 2026/03/27/0001 untuk Pasien: 000002', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 05:56:50'),
(74, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'CANCEL_REG_POLI', 'Membatalkan registrasi No Rawat: 2026/03/27/0002 untuk Pasien: 000002', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 05:56:52'),
(75, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REG_POLI', 'Registrasi Baru Detail: 2026/03/27/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 05:57:05'),
(76, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'SIMPAN_RME', 'Mengisi Rekam Medis No Rawat: 2026/03/27/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 05:58:02'),
(77, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'HAPUS_RME', 'Hapus Rekam Medis No Rawat: 2026/03/27/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 06:37:08'),
(78, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'SIMPAN_RME', 'Mengisi Rekam Medis No Rawat: 2026/03/27/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 07:09:21'),
(79, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'CANCEL_REG_POLI', 'Membatalkan registrasi No Rawat: 2026/03/27/0001 untuk Pasien: 000001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 07:20:00'),
(80, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REGISTER_PASIEN', 'Mendaftarkan pasien baru No. RM: 000003', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 07:21:43'),
(81, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REG_POLI', 'Registrasi Baru Detail: 2026/03/27/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 07:22:02'),
(82, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REG_POLI', 'Mendaftarkan pasien ke Poli Anak. No Rawat: 2026/03/27/0002', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 07:28:31'),
(83, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'CANCEL_REG_POLI', 'Membatalkan registrasi No Rawat: 2026/03/27/0001 untuk Pasien: 000003', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 07:33:21'),
(84, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'CANCEL_REG_POLI', 'Membatalkan registrasi No Rawat: 2026/03/27/0002 untuk Pasien: 000003', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 07:33:23'),
(85, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REG_POLI', 'Registrasi Baru Detail: 2026/03/27/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 07:33:33'),
(86, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REG_POLI', 'Mendaftarkan pasien ke Poli Anak. No Rawat: 2026/03/27/0002', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 07:33:55'),
(87, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'SIMPAN_RME', 'Mengisi Rekam Medis No Rawat: 2026/03/27/0002', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 07:34:48'),
(88, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 07:42:39'),
(89, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-28 02:36:02'),
(90, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REG_POLI', 'Mendaftarkan pasien ke Poli Anak. No Rawat: 2026/03/28/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-28 04:36:05'),
(91, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'SIMPAN_RME', 'Mengisi Rekam Medis No Rawat: 2026/03/28/0001', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-28 04:36:27'),
(92, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-01 10:01:25'),
(93, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-02 13:37:10'),
(94, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'LOGOUT', 'User logged out: Super Admin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-02 14:01:53'),
(95, 'GUEST', 'LOGIN_SUCCESS', 'Pegawai login: dr. Muqiemuddin Salim, Sp.A, M.Ked.Klin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-02 14:02:08'),
(96, 'S3R4cXVvdC85UlpjV3VFY2FDMWx3UT09', 'LOGOUT', 'User logged out: dr. Muqiemuddin Salim, Sp.A, M.Ked.Klin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-02 14:02:24'),
(97, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-02 14:03:19'),
(98, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'LOGOUT', 'User logged out: Super Admin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-02 14:03:40'),
(99, 'GUEST', 'LOGIN_SUCCESS', 'Pegawai login: dr. Muqiemuddin Salim, Sp.A, M.Ked.Klin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-02 14:03:53'),
(100, 'S3R4cXVvdC85UlpjV3VFY2FDMWx3UT09', 'LOGOUT', 'User logged out: dr. Muqiemuddin Salim, Sp.A, M.Ked.Klin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-02 14:27:48'),
(101, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-02 14:28:30'),
(102, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'LOGOUT', 'User logged out: Super Admin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-02 14:28:48'),
(103, 'GUEST', 'LOGIN_SUCCESS', 'Pegawai login: dr. Muqiemuddin Salim, Sp.A, M.Ked.Klin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-02 14:28:57'),
(104, 'S3R4cXVvdC85UlpjV3VFY2FDMWx3UT09', 'LOGOUT', 'User logged out: dr. Muqiemuddin Salim, Sp.A, M.Ked.Klin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-02 14:35:02'),
(105, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-02 14:35:38'),
(106, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 12:43:05'),
(107, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REG_POLI', 'Registrasi Baru Detail: 2026/04/03/0001', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 13:15:01'),
(108, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'CANCEL_REG_POLI', 'Membatalkan registrasi No Rawat: 2026/04/03/0001 untuk Pasien: 000002', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 13:15:27'),
(109, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REG_POLI', 'Registrasi Baru Detail: 2026/04/03/0001', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 13:16:11'),
(110, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'HAPUS_RME', 'Hapus Rekam Medis No Rawat: 2026/04/03/0001', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 13:18:18'),
(111, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'CANCEL_REG_POLI', 'Membatalkan registrasi No Rawat: 2026/04/03/0001 untuk Pasien: 000002', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 13:18:54'),
(112, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REG_POLI', 'Registrasi Baru Detail: 2026/04/03/0001', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 13:19:15'),
(113, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'SIMPAN_RME', 'Mengisi Rekam Medis No Rawat: 2026/04/03/0001', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 13:19:51'),
(114, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'HAPUS_RME', 'Hapus Rekam Medis No Rawat: 2026/04/03/0001', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 13:20:48'),
(115, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'CANCEL_REG_POLI', 'Membatalkan registrasi No Rawat: 2026/04/03/0001 untuk Pasien: 000002', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 13:21:04'),
(116, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'REG_POLI', 'Registrasi Baru Detail: 2026/04/03/0001', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 13:21:55'),
(117, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'SIMPAN_RME', 'Mengisi Rekam Medis No Rawat: 2026/04/03/0001', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 13:22:27'),
(118, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'LOGOUT', 'User logged out: Super Admin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 13:30:41'),
(119, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 13:32:49'),
(120, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'LOGOUT', 'User logged out: Super Admin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 13:53:52'),
(121, 'GUEST', 'LOGIN_SUCCESS', 'Pegawai login: dr. Muqiemuddin Salim, Sp.A, M.Ked.Klin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 13:54:02'),
(122, 'YTFnV2ZUdUNmazFTeWk4bVgzYnZ6dz09', 'LOGOUT', 'User logged out: dr. Muqiemuddin Salim, Sp.A, M.Ked.Klin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 13:55:03'),
(123, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 13:55:18'),
(124, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'LOGOUT', 'User logged out: Super Admin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 14:00:02'),
(125, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 14:01:33'),
(126, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'LOGOUT', 'User logged out: Super Admin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 14:01:47'),
(127, 'GUEST', 'LOGIN_SUCCESS', 'Pegawai login: dr. Muqiemuddin Salim, Sp.A, M.Ked.Klin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 14:02:18'),
(128, 'GUEST', 'LOGIN_SUCCESS', 'Pegawai login: dr. Muqiemuddin Salim, Sp.A, M.Ked.Klin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 14:13:53'),
(129, 'SkR1QnNKZjMzQlg3aUxkNEJiT2lXUT09', 'LOGOUT', 'User logged out: dr. Muqiemuddin Salim, Sp.A, M.Ked.Klin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 14:25:20'),
(130, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 14:25:33'),
(131, 'ZGMvd2cwV1hXcElleS9ROE5UUHBDUT09', 'LOGOUT', 'User logged out: Super Admin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 14:31:52'),
(132, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: admin-2', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 14:32:37'),
(133, 'aFcva0NIWEFSVFFRd29TK3VIZFZ6UT09', 'LOGOUT', 'User logged out: admin-2', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 14:35:56'),
(134, 'GUEST', 'LOGIN_SUCCESS', 'Pegawai login: dr. Muqiemuddin Salim, Sp.A, M.Ked.Klin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-03 14:36:12'),
(135, 'GUEST', 'LOGIN_SUCCESS', 'Admin login: Super Admin', '192.20.20.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-04 02:59:24');

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
(2, '2026/03/16/0001', 2, 20000, 1, '2026-03-16 01:54:58', '2026-03-16 01:54:58'),
(7, '2026/03/27/0002', 1, 5000, 1, '2026-03-27 07:34:18', '2026-03-27 07:34:18'),
(8, '2026/03/27/0002', 2, 20000, 1, '2026-03-27 07:34:18', '2026-03-27 07:34:18'),
(9, '2026/03/28/0001', 1, 5000, 1, '2026-03-28 04:36:15', '2026-03-28 04:36:15');

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
('123', 'dr. muqi', '2026-03-27 06:08:46', '2026-03-27 06:08:46', 'L', 'palopo', '1984-11-11', '-', 'Islam', 'palopo', '0813425645256', 'Menikah', 'palopo', '35418985'),
('12345', 'bara ji', '2026-03-13 21:50:02', '2026-03-13 21:50:12', 'L', 'palopo', '1984-11-11', '-', 'Islam', 'palopo', '0813422649', 'Menikah', 'palopo', '133456987'),
('123456', 'dr. Muqiemuddin', '2026-03-27 07:05:40', '2026-04-02 14:00:07', 'L', 'palopo', '1980-11-11', '-', 'Islam', 'palopo', '082154447', 'Menikah', 'palopo_jie', '1234587'),
('abs123', 'dr. Muqiemuddin Salim, Sp.A, M.Ked.Klin', '2026-04-02 14:00:48', '2026-04-02 14:00:48', 'L', 'palopo', '1981-11-11', '-', 'Islam', 'palopo', '082465878', 'Menikah', 'palopo', ''),
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
(24, '2026_03_15_143247_create_tagihan_tindakan_table', 18),
(25, '2026_03_21_084829_create_resep_dokter_racikan_tables', 19),
(26, '2026_03_21_182512_add_status_closing_to_reg_periksa_table', 19),
(27, '2026_03_27_150131_remove_i_e_columns_from_pemeriksaan_ralan_tables', 20),
(28, '2026_03_27_151606_add_photo_and_name_to_auth_tables', 21),
(29, '2026_03_28_140207_add_hak_akses_to_users_table', 22);

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
('000002', 'bara', 'Vjh0NlFrL0x5Qmo5cE1jNm84TUlOZz09', 'L', '2025-12-11', 'siti', '0823485444', 'Palopo\nTanjung', '2026-03-11 21:07:01', '2026-03-11 21:07:01', '2026-03-12 23:30:43', 'palopo', 'ISLAM', '-', 'BELUM MENIKAH', '-', '-', '000454454', 'baranurfahrun@gmail.com', '-', 'BAHASA INDONESIA', '-', 'palopo', 'palopo', 'palopo', 'Sulawesi Selatan'),
('000003', 'pasien', 'RmZXeGFMbVlOU01NZE9hamJjcytsZz09', 'L', '2003-11-11', 'ibu', '082465498', 'palpo', '2026-03-27 07:21:43', '2026-03-27 07:21:43', '2026-03-27 07:21:43', 'palopo', 'ISLAM', '-', 'BELUM MENIKAH', '-', '-', '082152515', 'pasien@gmail.com', '-', 'BAHASA INDONESIA', '-', 'palpo', 'palopo', 'palopo', 'palopo');

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
  `alergi` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nip` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pemeriksaan_ralan`
--

INSERT INTO `pemeriksaan_ralan` (`no_rawat`, `tgl_pemeriksaan`, `jam_pemeriksaan`, `suhu_tubuh`, `tensi`, `nadi`, `respirasi`, `spo2`, `tinggi`, `berat`, `lingkar_perut`, `gcs`, `kesadaran`, `keluhan`, `pemeriksaan`, `penilaian`, `tindak_lanjut`, `alergi`, `nip`, `created_at`, `updated_at`) VALUES
('2026/03/12/0001', '2026-03-12', '09:02:20', '4', '4', '4', '4', '4', '4', '4', '4', '4', 'Compos Mentis', 'fghf', 'fgh', 'fgh', 'fgh', 'fg', '', '2026-03-12 01:02:20', '2026-03-12 01:02:20'),
('2026/03/27/0002', '2026-03-27', '15:34:48', '', '', '', '', '', '', '', '', '', 'Compos Mentis', 'drtg', 'dfg', 'dfg', 'dfg', '', '', '2026-03-27 07:34:48', '2026-03-27 07:34:48'),
('2026/03/28/0001', '2026-03-28', '12:36:27', '', '', '', '', '', '', '', '', '', 'Compos Mentis', 'sdf', 'sdf', 'sdf', 'sdfs', '', '', '2026-03-28 04:36:27', '2026-03-28 04:36:27'),
('2026/04/03/0001', '2026-04-03', '21:22:27', '1', '2', '6', '5', '7', '4', '3', '9', '8', 'Compos Mentis', 'sdsdf', 'sdf', 'sdf', 'sdf', '', '', '2026-04-03 13:21:55', '2026-04-03 13:22:27');

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
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pemeriksaan_ralan_template`
--

INSERT INTO `pemeriksaan_ralan_template` (`id`, `nip`, `keluhan`, `pemeriksaan`, `penilaian`, `tindak_lanjut`, `created_at`, `updated_at`) VALUES
(1, '', 'fghf', 'fgh', 'fgh', 'fgh', '2026-03-12 00:57:48', '2026-03-12 00:57:48');

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
  `no_ktp` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `reg_periksa`
--

INSERT INTO `reg_periksa` (`no_reg`, `no_rawat`, `status_closing`, `tgl_registrasi`, `jam_reg`, `kd_dokter`, `no_rkm_medis`, `kd_poli`, `stts`, `status_lanjut`, `created_at`, `updated_at`, `p_jawab`, `hubunganpj`, `almt_pj`, `kd_pj`, `asal_rujukan`, `no_ktp`) VALUES
('001', '2026/03/12/0001', 'Belum', '2026-03-12', '05:31:45', 'D001', '000002', 'PA', 'Sudah', 'Ralan', '2026-03-11 21:31:45', '2026-03-12 01:02:20', 'siti', 'Ibu', 'Palopo\nTanjung', 'BJS', '-', '000454454 / 732200524564141'),
('002', '2026/03/12/0002', 'Belum', '2026-03-12', '06:19:13', 'D001', '000001', 'PA', 'Belum', 'Ralan', '2026-03-11 22:19:13', '2026-03-11 22:19:13', 'ibu', 'Ibu', 'palopo', 'UMM', '-', '123456789'),
('001', '2026/03/16/0001', 'Belum', '2026-03-16', '03:19:01', '12345', '000002', 'PA', 'Belum', 'Ralan', '2026-03-15 19:19:02', '2026-03-15 19:19:02', 'siti', 'Ibu', 'Palopo\nTanjung', 'BJS', '-', '000454454 / 732200524564141'),
('001', '2026/03/27/0001', 'Belum', '2026-03-27', '15:33:33', '123456', '000003', 'PA', 'Belum', 'Ralan', '2026-03-27 07:33:33', '2026-03-27 07:33:33', 'ibu', 'Ibu', 'palpo', 'BJS', '-', '082152515 / 126547894138'),
('002', '2026/03/27/0002', 'Selesai', '2026-03-27', '15:33:55', 'D001', '000001', 'PA', 'Sudah', 'Ralan', '2026-03-27 07:33:55', '2026-03-27 07:42:49', NULL, NULL, NULL, 'UMM', NULL, NULL),
('001', '2026/03/28/0001', 'Belum', '2026-03-28', '12:36:04', 'D001', '000003', 'PA', 'Sudah', 'Ralan', '2026-03-28 04:36:05', '2026-03-28 04:36:27', NULL, NULL, NULL, 'UMM', NULL, NULL),
('001', '2026/04/03/0001', 'Belum', '2026-04-03', '21:21:55', '123', '000002', 'PA', 'Sudah', 'Ralan', '2026-04-03 13:21:55', '2026-04-03 13:22:27', 'siti', 'Ibu', 'Palopo\nTanjung', 'BJS', '-', '000454454 / 732200524564141');

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
('20260327153436', '0054', 1, '3 x 1', '2026-03-27 07:34:36', '2026-03-27 07:34:36'),
('FIX004525', '0054', 10, '3 x 1 Sesudah Makan', '2026-03-12 16:45:25', '2026-03-12 16:45:25'),
('MUL010027', '0214', 6, '2 x 1', '2026-03-12 17:00:27', '2026-03-12 17:00:27');

-- --------------------------------------------------------

--
-- Struktur dari tabel `resep_dokter_racikan`
--

CREATE TABLE `resep_dokter_racikan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `no_resep` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_racik` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `metode_racik` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aturan_pakai` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jml_dr` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `resep_dokter_racikan`
--

INSERT INTO `resep_dokter_racikan` (`id`, `no_resep`, `nama_racik`, `metode_racik`, `aturan_pakai`, `jml_dr`, `created_at`, `updated_at`) VALUES
(2, '20260327140659', 'pusing', 'Kapsul', '3 x 1', 10, '2026-03-27 06:06:59', '2026-03-27 06:06:59');

-- --------------------------------------------------------

--
-- Struktur dari tabel `resep_dokter_racikan_detail`
--

CREATE TABLE `resep_dokter_racikan_detail` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `no_resep` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_racik` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_brng` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jml` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `resep_dokter_racikan_detail`
--

INSERT INTO `resep_dokter_racikan_detail` (`id`, `no_resep`, `nama_racik`, `kode_brng`, `jml`, `created_at`, `updated_at`) VALUES
(1, '20260327140659', 'pusing', '0054', 5, '2026-03-27 06:06:59', '2026-03-27 06:06:59'),
(2, '20260327140659', 'pusing', '0145', 1.5, '2026-03-27 06:06:59', '2026-03-27 06:06:59'),
(3, '20260327140659', 'pusing', '0214', 1.6, '2026-03-27 06:06:59', '2026-03-27 06:06:59');

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
('20260327153436', '2026-03-27', '15:34:36', '2026/03/27/0002', 'D001', NULL, NULL, '2026-03-27 07:34:36', '2026-03-27 07:34:36'),
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
('running_text', 'masa uji coba simklinik dev_coba lagi', '2026-03-15 05:08:09', '2026-04-03 14:35:35');

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
('0054', 9949, NULL, '2026-03-27 06:05:40'),
('0145', 11987, NULL, '2026-03-27 06:05:49'),
('0214', 9984, NULL, '2026-03-27 06:05:40');

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
('OP20260327140540001', '2026-03-27', '0145', 12001, 12001, 12000, 'Audit Penyesuaian Stok', '2026-03-27 06:05:40', '2026-03-27 06:05:40'),
('OP20260327140540002', '2026-03-27', '0214', 10000, 10000, 10000, 'Audit Penyesuaian Stok', '2026-03-27 06:05:40', '2026-03-27 06:05:40'),
('OP20260327140540003', '2026-03-27', '0054', 10000, 10000, 10000, 'Audit Penyesuaian Stok', '2026-03-27 06:05:40', '2026-03-27 06:05:40'),
('OP20260327140549001', '2026-03-27', '0145', 12002, 12002, 1, 'Audit Penyesuaian Stok', '2026-03-27 06:05:49', '2026-03-27 06:05:49'),
('RX2026031403570325', '2026-03-14', '0214', 0, 0, -10, 'Resep Elektronik: 2026/03/12/0001', '2026-03-13 19:57:03', '2026-03-13 19:57:03'),
('RX2026031515051384', '2026-03-15', '0145', 3, 3, -5, 'Resep Elektronik: 2026/03/12/0001', '2026-03-15 07:05:13', '2026-03-15 07:05:13'),
('RX2026032713443987', '2026-03-27', '0145', 2, 2, -1, 'Resep Elektronik: 2026/03/27/0001', '2026-03-27 05:44:39', '2026-03-27 05:44:39'),
('RX2026032713574737', '2026-03-27', '0145', 1, 1, -1, 'Resep Elektronik: 2026/03/27/0001', '2026-03-27 05:57:47', '2026-03-27 05:57:47'),
('RX2026032714065912', '2026-03-27', '0214', 9984, 9984, -16, 'Resep Racikan: pusing', '2026-03-27 06:06:59', '2026-03-27 06:06:59'),
('RX2026032714065951', '2026-03-27', '0054', 9950, 9950, -50, 'Resep Racikan: pusing', '2026-03-27 06:06:59', '2026-03-27 06:06:59'),
('RX2026032714065984', '2026-03-27', '0145', 11987, 11987, -15, 'Resep Racikan: pusing', '2026-03-27 06:06:59', '2026-03-27 06:06:59'),
('RX2026032715343642', '2026-03-27', '0054', 9949, 9949, -1, 'Resep Elektronik: 2026/03/27/0002', '2026-03-27 07:34:36', '2026-03-27 07:34:36');

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
  `foto_profil` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jabatan` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hak_akses` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nik` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `user_pegawai`
--

INSERT INTO `user_pegawai` (`id_user`, `nama_pegawai`, `jk`, `tmp_lahir`, `tgl_lahir`, `gol_darah`, `agama`, `alamat`, `no_telp`, `stts_nikah`, `alumni`, `foto_profil`, `jabatan`, `password`, `hak_akses`, `nik`) VALUES
('a1RaVFVoaERJMWVIeGkwenNBLy9Udz09', 'dr. muqi', NULL, NULL, NULL, NULL, NULL, 'palopo', '0813425645256', 'Menikah', NULL, NULL, 'Dokter', 'a1RaVFVoaERJMWVIeGkwenNBLy9Udz09', NULL, '123'),
('allVUTYzM1dCUUovY2Q3ZkpJcldUZz09', 'bara ji', 'L', 'palopo', '1984-11-11', '-', 'Islam', 'palopo', '0813426568', 'Menikah', 'palopo', NULL, 'it', 'M3oxTlB5ZWxWTSs4SS85S2UyMXZMZz09', NULL, '123456'),
('SkR1QnNKZjMzQlg3aUxkNEJiT2lXUT09', 'dr. Muqiemuddin Salim, Sp.A, M.Ked.Klin', NULL, NULL, NULL, NULL, NULL, 'palopo', '082465878', 'Menikah', NULL, '/storage/avatars/profile_1234.png', 'Dokter', 'SkR1QnNKZjMzQlg3aUxkNEJiT2lXUT09', '[\"pengaturan\"]', 'abs123');

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
-- Indeks untuk tabel `resep_dokter_racikan`
--
ALTER TABLE `resep_dokter_racikan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `resep_dokter_racikan_no_resep_index` (`no_resep`);

--
-- Indeks untuk tabel `resep_dokter_racikan_detail`
--
ALTER TABLE `resep_dokter_racikan_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `resep_dokter_racikan_detail_no_resep_nama_racik_index` (`no_resep`,`nama_racik`);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT untuk tabel `detail_penerimaan_obat`
--
ALTER TABLE `detail_penerimaan_obat`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `detail_tagihan_tindakan`
--
ALTER TABLE `detail_tagihan_tindakan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

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
-- AUTO_INCREMENT untuk tabel `resep_dokter_racikan`
--
ALTER TABLE `resep_dokter_racikan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `resep_dokter_racikan_detail`
--
ALTER TABLE `resep_dokter_racikan_detail`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
