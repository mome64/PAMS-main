-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2025 at 12:37 AM
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
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT 'default.jpg',
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `acadamic`
--

INSERT INTO `acadamic` (`acadamic_id`, `first_name`, `last_name`, `username`, `email`, `photo`, `password`) VALUES
(1, 'John', 'Smith', 'acadamic.smith.acad', 'johnsmith@example.com', 'default.jpg', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m');

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
(1, 'Jhon', 'Doe', 'admin.jhon.do', 'bamsib744@gmail.com', 'default.jpg', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m');

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
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`company_id`, `company_name`, `username`, `phone_number`, `contact_email`, `location`, `industry_sector`, `accepted_student_limit`, `website`, `password`) VALUES
(1, 'Zalatech', 'comp.zalatech', '+251912974411', 'info@zalatechs.com', 'Addis Ababa', 'Tech', 4, 'www.zalatechs.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
(2, 'Cynooxtech', 'comp.cynooxtech', '+251909772885', 'cynooxtech@gmail.com', 'Addis Ababa', 'Tech', 5, 'www.cynoox.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
(3, 'Fairfaxtech', 'comp.fairfaxtech', '+251115549172', 'info@fairfaxtechnologies.com', 'Addis Ababa', 'Tech', 3, 'www.fairfax.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
(4, 'Alphait', 'comp.alphait', '+251912254156', 'info@alphaitsolution.com', 'Addis Ababa', 'Tech', 4, 'www.alpha.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
(5, 'PeragoTech', 'comp.peragotech', '+251911231622', 'info@peragosystems.com', 'Addis Ababa', 'Tech', 3, 'www.perago.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
(10, 'kombolcha', 'comp.kombolcha', '0903169980', 'mesoudmohammed393@gmail.com', 'wello', 'It', 6, 'www.ertre.com', '$2b$10$2fmrDxaHodmb8EAKO8VLOObeo3AfMUyuG7CBbboy1KtIdN/TlUZ7O');

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
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `department_name`, `username`, `phone_number`, `contact_email`, `office_location`, `password`) VALUES
(1, 'InfoSystem', 'dept.infosystem', '1234567890', 'info_sys@gmail.com', 'Building A', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m'),
(2, 'InfoScience', 'dept.infoscience', '0987654321', 'info_sci@gmail.com', 'Building B', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m'),
(3, 'CompScience', 'dept.compscience', '9876543210', 'comp_sci@gmail.com', 'Building C', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m'),
(4, 'InfoTechnology', 'dept.infotechnology', '9876543210', 'info_tech@gmail.com', 'Building D', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m'),
(5, 'Software', 'dept.software', '2345678901', 'soft_eng@gmail.com', 'Building E', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m');

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
  `department_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `first_name`, `last_name`, `username`, `phone_number`, `contact_email`, `gpa`, `photo`, `password`, `department_id`) VALUES
(1, 'Yonas', 'Daniel', 'stud.yonas.da', '0967155787', 'yonasda@gmail.com', 3.70, 'default.jpg', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 1),
(2, 'Dawit', 'Belete', 'stud.dawit.be', '0925567288', 'dawitbete@gmail.com', 3.75, 'default.jpg', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 1),
(3, 'Dereje', 'Zerifu', 'stud.dereje.ze', '0973452687', 'derejezerf@gmail.com', 3.25, 'default.jpg', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 1),
(4, 'Daniel', 'Niguse', 'stud.daniel.ni', '0945690715', 'sdanielnu2@gmail.com', 3.80, 'default.jpg', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 1),
(5, 'Yakob', 'Temesgen', 'stud.yakob.te', '0955231467', 'yakobtemu@gmail.com', 3.65, 'default.jpg', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 5),
(6, 'Tsion', 'Ayele', 'stud.tsion.ay', '0987541377', 'tsionayu1@gmail.com', 3.90, 'default.jpg', '$2a$12$LYBOuX/eHDbUfY1L7us1xe7HMGie5mJkmvMNgIRaDVoZI8AJFqQ/m', 2),
(7, 'Abel', 'Regasa', 'stud.abel.re', '0962145677', 'abelrega@gmail.com', 3.55, 'default.jpg', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 2),
(8, 'Helen', 'Kebede', 'stud.helen.ke', '0945231691', 'helenke56@gmail.com', 3.70, 'default.jpg', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 3),
(9, 'Kalab', 'Kibebew', 'stud.kalab.ki', '0935441277', 'kalabkeb66@gmail.com', 3.45, 'default.jpg', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 4),
(10, 'Tamirat', 'Eyoil', 'stud.tamirat.ey', '0932557410', 'tamirateyu88@gmail.com', 3.80, 'default.jpg', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 5),
(11, 'Teddy', 'Alemu', 'stud.teddy.al', '0998732211', 'teddyale8@gmail.com', 3.60, 'default.jpg', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 5),
(12, 'Ahmed', 'Abdu', 'stud.ahmed.ab', '0988726367', 'ahamedab78@gmail.com', 3.70, 'default.jpg', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 3),
(13, 'Binyam', 'Belete', 'stud.binyam.bi', '0945267278', 'binyambel82@gmail.com', 3.75, 'default.jpg', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 4),
(14, 'Roza', 'Mesifi', 'stud.roza.me', '0972342691', 'rozamesfin2@gmail.com', 3.85, 'default.jpg', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 5),
(15, 'Betty', 'Adane', 'stud.betty.ad', '0935137412', 'bettyad12@gmail.com', 3.40, 'default.jpg', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 3);

-- --------------------------------------------------------

--
-- Table structure for table `student_apply_form`
--

CREATE TABLE `student_apply_form` (
  `apply_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `disability` tinyint(1) DEFAULT NULL,
  `gender` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_apply_form`
--

INSERT INTO `student_apply_form` (`apply_id`, `student_id`, `name`, `disability`, `gender`) VALUES
(1, 1, 'Yonas Daniel', 1, 'male'),
(2, 2, 'Dawit Belete', 1, 'male'),
(3, 3, 'Dereje Zerifu', 0, 'male'),
(4, 4, 'Daniel Niguse', 0, 'male'),
(5, 5, 'Yakob Temesgen', 0, 'male'),
(6, 6, 'Tsion Ayele', 1, 'female'),
(7, 7, 'Abel Regasa', 1, 'male'),
(8, 8, 'Helen Kebede', 0, 'female'),
(9, 9, 'Kalab Kibebew', 0, 'male'),
(10, 10, 'Tamirat Eyoil', 1, 'male'),
(11, 11, 'Teddy Alemu', 1, 'male'),
(12, 12, 'Ahmed Abdu', 0, 'male'),
(13, 13, 'Binyam Belete', 0, 'male'),
(14, 14, 'Roza Mesifi', 1, 'female'),
(15, 15, 'Betty Adane', 1, 'female');

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
  `company_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_preferences`
--

INSERT INTO `student_preferences` (`apply_id`, `preference_order`, `student_id`, `company_id`) VALUES
(1, 1, 1, 1),
(1, 2, 1, 2),
(1, 3, 1, 3),
(1, 4, 1, 4),
(2, 1, 2, 2),
(2, 2, 2, 3),
(2, 3, 2, 1),
(2, 4, 2, 4),
(3, 1, 3, 3),
(3, 2, 3, 2),
(3, 3, 3, 4),
(3, 4, 3, 1),
(4, 1, 4, 1),
(4, 2, 4, 4),
(4, 3, 4, 3),
(4, 4, 4, 2),
(5, 1, 5, 5),
(5, 2, 5, 4),
(5, 3, 5, 3),
(5, 4, 5, 2),
(6, 1, 6, 2),
(6, 2, 6, 1),
(6, 3, 6, 3),
(6, 4, 6, 4),
(7, 1, 7, 2),
(7, 2, 7, 3),
(7, 3, 7, 1),
(7, 4, 7, 4),
(8, 1, 8, 3),
(8, 2, 8, 2),
(8, 3, 8, 4),
(8, 4, 8, 1),
(9, 1, 9, 4),
(9, 2, 9, 2),
(9, 3, 9, 1),
(9, 4, 9, 5),
(10, 1, 10, 5),
(10, 2, 10, 4),
(10, 3, 10, 3),
(10, 4, 10, 2),
(11, 1, 11, 1),
(11, 2, 11, 2),
(11, 3, 11, 3),
(11, 4, 11, 4),
(12, 1, 12, 3),
(12, 2, 12, 2),
(12, 3, 12, 4),
(12, 4, 12, 1),
(13, 1, 13, 2),
(13, 2, 13, 1),
(13, 3, 13, 3),
(13, 4, 13, 4),
(14, 1, 14, 3),
(14, 2, 14, 4),
(14, 3, 14, 2),
(14, 4, 14, 1),
(15, 1, 15, 2),
(15, 2, 15, 1),
(15, 3, 15, 3),
(15, 4, 15, 4);

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
-- Indexes for table `placement_results`
--
ALTER TABLE `placement_results`
  ADD PRIMARY KEY (`placement_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `company_id` (`company_id`);

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
-- Indexes for table `weights`
--
ALTER TABLE `weights`
  ADD PRIMARY KEY (`weight_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `placement_results`
--
ALTER TABLE `placement_results`
  MODIFY `placement_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `student_apply_form`
--
ALTER TABLE `student_apply_form`
  MODIFY `apply_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `student_organizational_result`
--
ALTER TABLE `student_organizational_result`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `weights`
--
ALTER TABLE `weights`
  MODIFY `weight_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
