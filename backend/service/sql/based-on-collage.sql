-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2025 at 10:47 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `internlink`
--

-- --------------------------------------------------------

--
-- Table structure for table `acadamic`
--

CREATE TABLE `acadamic` (
  `acadamic_id` int(11) NOT NULL,
  `full_name` varchar(200) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT 'default.jpg',
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `college_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `acadamic`
--

INSERT INTO `acadamic` (`acadamic_id`, `full_name`, `username`, `email`, `photo`, `password`, `phone_number`, `location`, `college_name`) VALUES
(8, 'bey', 'acadamic.bey.hu', 'mesoudmohammed393@gmail.com', 'default.jpg', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', '0903169980', 'Buildind B', 'CCI'),
(9, 'Mohammed', 'acadamic.mohammed', 'mesoudmohammed393@gmail.com', 'default.jpg', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', '0903169980', 'ee', 'Agriculture'),
(10, 'beym', 'acadamic.beym', 'mesoudmohammed393@gmail.com', 'default.jpg', '$2b$10$fZQ5coseE9VG/k4Z.3llb.dVXv/wPx0vJVeJp20cRNqmU5y.v013O', '0903169980', 'ee', 'health');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT 'default.jpg',
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `first_name`, `last_name`, `username`, `email`, `photo`, `password`) VALUES
(1, 'bamsi', 'Bey', 'admin.bamsi.be', 'bamsib744@gmail.com', 'default.jpg', '$2b$10$MEGYcy/lHjgW1wHBFpfus.piJNU7RHCxf6iiZmZMS3BsyN91NjCMS'),
(2, 'Mohammed', 'Mesoud', 'admin.mohammed.me', 'mesoudmoah@gmail.com', 'default.jpg', '$2b$10$DOKPcDPxBDAv7r0cYnPj5.w5iIRDUoY.kgYdbBmL1o3aCY6FuPh5u');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `company_id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `industry_sector` varchar(255) DEFAULT NULL,
  `accepted_student_limit` int(11) DEFAULT NULL,
  `website` varchar(400) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `college_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`company_id`, `company_name`, `username`, `phone_number`, `contact_email`, `location`, `industry_sector`, `accepted_student_limit`, `website`, `password`, `college_name`) VALUES
(1, 'Zalatech', 'comp.zalatech', '+251912974411', 'info@zalatechs.com', 'Addis Ababa', 'Tech', 4, 'www.zalatechs.com', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 'cci'),
(2, 'Cynooxtech', 'comp.cynooxtech', '+251909772885', 'cynooxtech@gmail.com', 'Addis Ababa', 'Tech', 5, 'www.cynoox.com', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 'cci'),
(3, 'Fairfaxtech', 'comp.fairfaxtech', '+251115549172', 'info@fairfaxtechnologies.com', 'Addis Ababa', 'Tech', 3, 'www.fairfax.com', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 'cci'),
(4, 'Alphait', 'comp.alphait', '+251912254156', 'info@alphaitsolution.com', 'Addis Ababa', 'Tech', 4, 'www.alpha.com', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 'cci'),
(5, 'PeragoTech', 'comp.peragotech', '+251911231622', 'info@peragosystems.com', 'Addis Ababa', 'Tech', 3, 'www.perago.com', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 'cci'),
(14, 'Kombolcha Textile', 'comp.kombolcha textile', '0903169980', 'mesoudmohammed393@gmail.com', 'wello', 'textile', 3, 'www.kt.com', '$2b$10$9MskOKGrlsybizhLlVunnetLXhgezby0IAbifV8GVflvKsOlbrfn2', 'Agriculture'),
(15, 'kfc', 'comp.kfc', '0903169980', 'bamsib744@gmail.com', 'adama', 'IT', 3, 'www.kt.com', '$2b$10$lpvdNPNEhFHy2pYjKMr1OO0rfPmP16EdTrgN5mpCzoI6IJHa3mVMO', 'CCI');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `department_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `office_location` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `college_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `department_name`, `username`, `phone_number`, `contact_email`, `office_location`, `password`, `college_name`) VALUES
(1, 'InfoSystem', 'dept.InfoSystem', '1234567890', 'info_sys@gmail.com', 'Building C', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 'cci'),
(2, 'InfoScience', 'dept.infoscience', '0987654321', 'info_sci@gmail.com', 'Building B', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 'cci'),
(3, 'CompScience', 'dept.compscience', '9876543210', 'comp_sci@gmail.com', 'Building C', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 'cci'),
(4, 'InfoTechnology', 'dept.infotechnology', '9876543210', 'info_tech@gmail.com', 'Building D', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 'cci'),
(24, 'plant', 'dept.plant', '0903169980', 'mesoudmohammed393@gmail.com', 'lth', '$2b$10$3VkPtgp3DdAS4nfU93IQtO8L83g9kYzttRShEP7KoppQAuXHksria', 'Agriculture');

-- --------------------------------------------------------

--
-- Table structure for table `payamout`
--

CREATE TABLE `payamout` (
  `id` int(11) NOT NULL,
  `department` varchar(100) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `college_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payamout`
--

INSERT INTO `payamout` (`id`, `department`, `amount`, `created_at`, `college_name`) VALUES
(7, 'InfoSystem', 3000.00, '2025-04-29 17:37:28', 'cci'),
(9, 'CompScience', 3500.00, '2025-04-30 01:08:32', 'cci'),
(10, 'Software', 17000.00, '2025-04-30 20:11:56', 'cci'),
(11, 'InfoScience', 3000.00, '2025-04-30 20:12:19', 'cci'),
(12, 'InfoTechnology', 3000.00, '2025-05-05 06:56:11', 'cci'),
(13, 'plant', 4000.00, '2025-05-07 14:55:42', 'Agriculture');

-- --------------------------------------------------------

--
-- Table structure for table `placement_results`
--

CREATE TABLE `placement_results` (
  `placement_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `result_id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `academic_result` decimal(5,2) DEFAULT NULL CHECK (`academic_result` <= 60),
  `company_result` decimal(5,2) DEFAULT NULL CHECK (`company_result` <= 40),
  `total_result` decimal(5,2) GENERATED ALWAYS AS (`academic_result` + `company_result`) STORED,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`result_id`, `student_id`, `academic_result`, `company_result`, `created_at`, `updated_at`) VALUES
(52, 6, 34.00, NULL, '2025-05-05 05:52:56', '2025-05-05 05:52:56');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `gpa` decimal(3,2) DEFAULT NULL,
  `photo` varchar(255) DEFAULT 'default.jpg',
  `password` varchar(255) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `college_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `first_name`, `last_name`, `username`, `phone_number`, `contact_email`, `gpa`, `photo`, `password`, `department_id`, `college_name`) VALUES
(1, 'Yonas', 'bamsi', 'stud.yonas.ba', '0967155787', 'yonasda@gmail.com', 3.70, 'download.jfif', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 1, 'cci'),
(2, 'Dawit', 'Belete', 'stud.dawit.be', '0925567288', 'dawitbete@gmail.com', 3.75, 'default.jpg', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 1, 'cci'),
(3, 'Dereje', 'Zerifu', 'stud.dereje.ze', '0973452687', 'derejezerf@gmail.com', 3.25, 'default.jpg', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 1, 'cci'),
(4, 'Daniel', 'Niguse', 'stud.daniel.ni', '0945690715', 'sdanielnu2@gmail.com', 3.80, 'default.jpg', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 1, 'cci'),
(6, 'Tsion', 'Ayel', 'stud.tsion.ay', '0987541377', 'tsionayu1@gmail.com', 3.90, 'default.jpg', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 2, 'cci'),
(7, 'Abel', 'Regasa', 'stud.abel.re', '0962145677', 'abelrega@gmail.com', 3.55, 'default.jpg', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 2, 'cci'),
(8, 'Helen', 'Kebede', 'stud.helen.ke', '0945231691', 'helenke56@gmail.com', 3.70, 'default.jpg', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 3, 'cci'),
(9, 'Kalab', 'Kibebew', 'stud.kalab.ki', '0935441277', 'kalabkeb66@gmail.com', 3.45, 'default.jpg', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 4, 'cci'),
(12, 'Ahmed', 'Abdu', 'stud.ahmed.ab', '0988726367', 'ahamedab78@gmail.com', 3.70, 'default.jpg', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 3, 'cci'),
(13, 'Binyam', 'Belete', 'stud.binyam.bi', '0945267278', 'binyambel82@gmail.com', 3.75, 'default.jpg', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 4, 'cci'),
(15, 'Betty', 'Adane', 'stud.betty.ad', '0935137412', 'bettyad12@gmail.com', 3.40, 'default.jpg', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 3, 'cci'),
(37, 'Mohammed', 'Mesoud', 'stud.mohammed.me', '0903169980', 'mesoudmohammed393@gmail.com', 3.00, 'default.jpg', '$2b$10$xjjeoAGjlRAxfgVUVuAoy.yidKcowEMIu3KUl.W6/odVOZh2fHXtK', 24, 'Agriculture');

-- --------------------------------------------------------

--
-- Table structure for table `student_apply_form`
--

CREATE TABLE `student_apply_form` (
  `apply_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `disability` tinyint(1) DEFAULT NULL,
  `gender` varchar(10) NOT NULL,
  `college_name` varchar(255) DEFAULT 'cci'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_apply_form`
--

INSERT INTO `student_apply_form` (`apply_id`, `student_id`, `name`, `disability`, `gender`, `college_name`) VALUES
(1, 1, 'Yonas Daniel', 1, 'male', 'cci'),
(2, 2, 'Dawit Belete', 1, 'male', 'cci'),
(3, 3, 'Dereje Zerifu', 0, 'male', 'cci'),
(18, 6, 'Tsion Ayel', 0, 'male', 'cci'),
(20, 37, 'mohammed', 0, 'male', 'Agriculture');

-- --------------------------------------------------------

--
-- Table structure for table `student_organizational_result`
--

CREATE TABLE `student_organizational_result` (
  `result_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `commitment` decimal(5,2) DEFAULT NULL,
  `courtesy` decimal(5,2) DEFAULT NULL,
  `conduct` decimal(5,2) DEFAULT NULL,
  `perseverance` decimal(5,2) DEFAULT NULL,
  `teamwork` decimal(5,2) DEFAULT NULL,
  `professional_ethics` decimal(5,2) DEFAULT NULL,
  `creativity` decimal(5,2) DEFAULT NULL,
  `technical_knowledge` decimal(5,2) DEFAULT NULL,
  `efficiency` decimal(5,2) DEFAULT NULL,
  `professional_comments` decimal(5,2) DEFAULT NULL,
  `attendance` decimal(5,2) DEFAULT NULL,
  `advisor_name` varchar(255) DEFAULT NULL,
  `department_assigned` varchar(255) DEFAULT NULL,
  `attachment_from_date` date DEFAULT NULL,
  `attachment_to_date` date DEFAULT NULL,
  `area_of_work` varchar(255) DEFAULT NULL,
  `total_hours` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_preferences`
--

CREATE TABLE `student_preferences` (
  `apply_id` int(11) NOT NULL,
  `preference_order` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `college_name` varchar(255) DEFAULT 'cci'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_preferences`
--

INSERT INTO `student_preferences` (`apply_id`, `preference_order`, `student_id`, `company_id`, `college_name`) VALUES
(1, 1, 1, 1, 'cci'),
(1, 2, 1, 2, 'cci'),
(1, 3, 1, 3, 'cci'),
(1, 4, 1, 4, 'cci'),
(2, 1, 2, 2, 'cci'),
(2, 2, 2, 3, 'cci'),
(2, 3, 2, 1, 'cci'),
(2, 4, 2, 4, 'cci'),
(3, 1, 3, 3, 'cci'),
(3, 2, 3, 2, 'cci'),
(3, 3, 3, 4, 'cci'),
(3, 4, 3, 1, 'cci'),
(18, 1, 6, 4, 'cci'),
(18, 2, 6, 2, 'cci'),
(18, 3, 6, 1, 'cci'),
(18, 4, 6, 3, 'cci'),
(18, 5, 6, 5, 'cci'),
(20, 1, 37, 1, 'Agriculture'),
(20, 2, 37, 2, 'Agriculture'),
(20, 3, 37, 3, 'Agriculture'),
(20, 4, 37, 4, 'Agriculture'),
(20, 5, 37, 5, 'Agriculture');

-- --------------------------------------------------------

--
-- Table structure for table `student_progress`
--

CREATE TABLE `student_progress` (
  `progress_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date` date NOT NULL,
  `status` enum('done','current','upcoming') DEFAULT 'upcoming',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `currency` varchar(10) DEFAULT 'ETB',
  `amount` decimal(10,2) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'success',
  `tx_ref` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `first_name`, `last_name`, `email`, `phone_number`, `currency`, `amount`, `status`, `tx_ref`, `created_at`, `updated_at`) VALUES
(27, 'Mohammed', 'Mesoud', 'mesoudmohammed393@gmail.com', '0903169980', 'ETB', 4000.00, 'success', 'stud.mohammed.me_0903169980_1746690202923', '2025-05-08 07:43:36', '2025-05-08 07:43:36');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `photo` varchar(255) DEFAULT 'default.jpg',
  `password` varchar(255) NOT NULL,
  `role` enum('admin','acadamic','company','department','student') NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `gpa` decimal(3,2) DEFAULT NULL,
  `website` varchar(400) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `weights`
--

CREATE TABLE `weights` (
  `weight_id` int(11) NOT NULL,
  `weight_disability` int(11) NOT NULL,
  `weight_gender` int(11) NOT NULL,
  `weight_preference` int(11) NOT NULL,
  `weight_grade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `weights`
--

INSERT INTO `weights` (`weight_id`, `weight_disability`, `weight_gender`, `weight_preference`, `weight_grade`) VALUES
(1, 10, 10, 50, 30);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `acadamic`
--
ALTER TABLE `acadamic`
  ADD PRIMARY KEY (`acadamic_id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`company_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `company_name` (`company_name`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `department_name` (`department_name`),
  ADD KEY `department_name_2` (`department_name`);

--
-- Indexes for table `payamout`
--
ALTER TABLE `payamout`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `placement_results`
--
ALTER TABLE `placement_results`
  ADD PRIMARY KEY (`placement_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`result_id`),
  ADD UNIQUE KEY `student_id` (`student_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `student_apply_form`
--
ALTER TABLE `student_apply_form`
  ADD PRIMARY KEY (`apply_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `student_organizational_result`
--
ALTER TABLE `student_organizational_result`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `student_preferences`
--
ALTER TABLE `student_preferences`
  ADD PRIMARY KEY (`apply_id`,`preference_order`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `student_progress`
--
ALTER TABLE `student_progress`
  ADD PRIMARY KEY (`progress_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `acadamic`
--
ALTER TABLE `acadamic`
  MODIFY `acadamic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `payamout`
--
ALTER TABLE `payamout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `placement_results`
--
ALTER TABLE `placement_results`
  MODIFY `placement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=297;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `student_apply_form`
--
ALTER TABLE `student_apply_form`
  MODIFY `apply_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `student_organizational_result`
--
ALTER TABLE `student_organizational_result`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `student_progress`
--
ALTER TABLE `student_progress`
  MODIFY `progress_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `placement_results`
--
ALTER TABLE `placement_results`
  ADD CONSTRAINT `placement_results_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `placement_results_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`) ON DELETE CASCADE;

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_apply_form`
--
ALTER TABLE `student_apply_form`
  ADD CONSTRAINT `student_apply_form_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_organizational_result`
--
ALTER TABLE `student_organizational_result`
  ADD CONSTRAINT `student_organizational_result_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_organizational_result_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_organizational_result_ibfk_3` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_preferences`
--
ALTER TABLE `student_preferences`
  ADD CONSTRAINT `student_preferences_ibfk_1` FOREIGN KEY (`apply_id`) REFERENCES `student_apply_form` (`apply_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_preferences_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student_apply_form` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_preferences_ibfk_3` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_progress`
--
ALTER TABLE `student_progress`
  ADD CONSTRAINT `student_progress_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
