-- Departments Table
CREATE TABLE IF NOT EXISTS `departments` (
  `department_id` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL UNIQUE,
  `phone_number` varchar(20),
  `contact_email` varchar(255),
  `office_location` varchar(255),
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`department_id`),
  UNIQUE KEY (`department_name`),
  INDEX (`department_name`)
) ENGINE=InnoDB;

-- Companies Table
CREATE TABLE IF NOT EXISTS `companies` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL UNIQUE,
  `phone_number` varchar(20),
  `contact_email` varchar(255),
  `location` varchar(255),
  `industry_sector` varchar(255),
  `accepted_student_limit` int(11),
  `website` varchar(400),
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE KEY (`company_name`)
) ENGINE=InnoDB;

-- Students Table
CREATE TABLE IF NOT EXISTS `students` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL UNIQUE,
  `phone_number` varchar(20),
  `contact_email` varchar(255),
  `password` varchar(255) NOT NULL,
  `department_id` int(11),
  PRIMARY KEY (`student_id`),
  FOREIGN KEY (`department_id`) REFERENCES `departments`(`department_id`) ON DELETE CASCADE 
) ENGINE=InnoDB;

-- Admins Table
CREATE TABLE IF NOT EXISTS `admins` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL UNIQUE,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB;


-- Student Apply Form Table
CREATE TABLE IF NOT EXISTS `student_apply_form` (
  `apply_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `disability` TINYINT(1),
  `gender` varchar(10) NOT NULL,
  `gpa` decimal(3,2) NOT NULL,
  PRIMARY KEY (`apply_id`),
  FOREIGN KEY (`student_id`) REFERENCES `students`(`student_id`) ON DELETE CASCADE 
) ENGINE=InnoDB;

-- Student Preferences Table
CREATE TABLE IF NOT EXISTS `student_preferences` (
  `apply_id` int(11) NOT NULL,
  `preference_order` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`apply_id`, `preference_order`),
  FOREIGN KEY (`apply_id`) REFERENCES `student_apply_form`(`apply_id`) ON DELETE CASCADE,
  FOREIGN KEY (`company_id`) REFERENCES `companies`(`company_id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Admin-Defined Weights Table
CREATE TABLE IF NOT EXISTS `weights` (
  `weight_id` int(11) NOT NULL AUTO_INCREMENT,
  `weight_disability` int(11) NOT NULL,
  `weight_gender` int(11) NOT NULL,
  `weight_preference` int(11) NOT NULL,
  `weight_grade` int(11) NOT NULL,
  PRIMARY KEY (`weight_id`)
) ENGINE=InnoDB;


-- Insert test admin-defined weights
INSERT INTO `weights` (`weight_disability`, `weight_gender`, `weight_preference`, `weight_grade`)
VALUES (10, 10, 50, 30);


-- Insert random departments
INSERT INTO `departments` (`department_name`, `username`, `phone_number`, `contact_email`, `office_location`, `password`)
VALUES 
  ('InfoSystem', 'dept.infosystem', '1234567890', 'info_sys@gmail.com', 'Building A', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
  ('InfoScience', 'dept.infoscience', '0987654321', 'info_sci@gmail.com', 'Building B', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
  ('CompScience', 'dept.compscience', '9876543210', 'comp_sci@gmail.com', 'Building C', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
  ('InfoTechnology', 'dept.infotechnology', '9876543210', 'info_tech@gmail.com', 'Building D', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
  ('Software', 'dept.software', '2345678901', 'soft_eng@gmail.com', 'Building E', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2');

-- Insert an admin
INSERT INTO `admins` (`first_name`, `last_name`, `username`, `email`, `password`)
VALUES 
  ('Jhon', 'Doe', 'admin.jhon.doe', 'admin@example.com', '$2b$10$FnNRxXprBvWeyhl4UHiDs./ZaOQg8RVm/ShFg0aqPHe0AqD.I/bO6');

-- Insert five companies
INSERT INTO companies (company_name, username, phone_number, contact_email, location, industry_sector, accepted_student_limit, website, password) VALUES
('Zalatech', 'comp.zalatech', '+251912974411', 'info@zalatechs.com', 'Addis Ababa', 'Tech', 3, 'www.zalatechs.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
('Cynooxtech', 'comp.cynooxtech', '+251909772885', 'cynooxtech@gmail.com', 'Addis Ababa', 'Tech', 3, 'www.cynoox.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
('Fairfaxtech', 'comp.fairfaxtech', '+251115549172', 'info@fairfaxtechnologies.com', 'Addis Ababa', 'Tech', 2, 'www.fairfax.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
('Alphait', 'comp.alphait', '+251912254156', 'info@alphaitsolution.com', 'Addis Ababa', 'Tech', 2, 'www.alpha.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
('PeragoTech', 'comp.peragotech', '+251911231622', 'info@peragosystems.com', 'Addis Ababa', 'Tech', 3, 'www.perago.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2');

-- Insert ten students with different departments
INSERT INTO students (first_name, last_name, username, phone_number, contact_email, password, department_id) VALUES
('Yonas', 'Daniel', 'stud.yonas.da', '0967155787', 'yonasda@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 1),
('Dawit', 'Belete', 'stud.dawit.be', '0925567288', 'dawitbete@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 1),
('Dereje', 'Zerifu', 'stud.dereje.ze', '0973452687', 'derejezerf@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 1),
('Daniel', 'Niguse', 'stud.daniel.ni', '0945690715', 'sdanielnu2@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 1),
('Yakob', 'Temesgen', 'stud.yakob.te', '0955231467', 'yakobtemu@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 5),
('Tsion', 'Ayele', 'stud.tsion.ay', '0987541377', 'tsionayu1@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 2),
('Abel', 'Regasa', 'stud.abel.re', '0962145677', 'abelrega@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 2),
('Helen', 'Kebede', 'stud.helen.ke', '0945231691', 'helenke56@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 3),
('Kalab', 'Kibebew', 'stud.kalab.ki', '0935441277', 'kalabkeb66@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 4),
('Tamirat', 'Eyoil', 'stud.tamirat.ey', '0932557410', 'tamirateyu88@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 5),
('Teddy', 'Alemu', 'stud.teddy.al', '0998732211', 'teddyale8@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 5),
('Ahmed', 'Abdu', 'stud.ahmed.ab', '0988726367', 'ahamedab78@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 3),
('Binyam', 'Belete', 'stud.binyam.bi', '0945267278', 'binyambel82@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 4),
('Roza', 'Mesifi', 'stud.roza.me', '0972342691', 'rozamesfin2@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 5),
('Betty', 'Adane', 'stud.betty.ad', '0935137412', 'bettyad12@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 3);

-- Student Apply Form Data
INSERT INTO `student_apply_form` (`student_id`, `name`, `disability`, `gender`, `gpa`) VALUES
(1, 'Yonas Daniel', 1, 'male', 3.70),
(2, 'Dawit Belete', 1, 'male', 3.75),
(3, 'Dereje Zerifu', 0, 'male', 3.25),
(4, 'Daniel Niguse', 0, 'male', 3.80),
(5, 'Yakob Temesgen', 0, 'male', 3.65),
(6, 'Tsion Ayele', 1, 'female', 3.90),
(7, 'Abel Regasa', 1, 'male', 3.55),
(8, 'Helen Kebede', 0, 'female', 3.70),
(9, 'Kalab Kibebew', 0, 'male', 3.45),
(10, 'Tamirat Eyoil', 1, 'male', 3.80),
(11, 'Teddy Alemu', 1, 'male', 3.60),
(12, 'Ahmed Abdu', 0, 'male', 3.70),
(13, 'Binyam Belete', 0, 'male', 3.75),
(14, 'Roza Mesifi', 1, 'female', 3.85),
(15, 'Betty Adane', 1, 'female', 3.40);

-- Student Preferences Data
INSERT INTO `student_preferences` (`apply_id`, `preference_order`, `company_id`) VALUES
(1, 1, 1), (1, 2, 2), (1, 3, 3), (1, 4, 4),
(2, 1, 2), (2, 2, 3), (2, 3, 1), (2, 4, 4),
(3, 1, 3), (3, 2, 2), (3, 3, 4), (3, 4, 1),
(4, 1, 1), (4, 2, 4), (4, 3, 3), (4, 4, 2),
(5, 1, 5), (5, 2, 4), (5, 3, 3), (5, 4, 2),
(6, 1, 2), (6, 2, 1), (6, 3, 3), (6, 4, 4),
(7, 1, 2), (7, 2, 3), (7, 3, 1), (7, 4, 4),
(8, 1, 3), (8, 2, 2), (8, 3, 4), (8, 4, 1),
(9, 1, 4), (9, 2, 2), (9, 3, 1), (9, 4, 5),
(10, 1, 5), (10, 2, 4), (10, 3, 3), (10, 4, 2),
(11, 1, 1), (11, 2, 2), (11, 3, 3), (11, 4, 4),
(12, 1, 3), (12, 2, 2), (12, 3, 4), (12, 4, 1),
(13, 1, 2), (13, 2, 1), (13, 3, 3), (13, 4, 4),
(14, 1, 3), (14, 2, 4), (14, 3, 2), (14, 4, 1),
(15, 1, 1), (15, 2, 2), (15, 3, 3), (15, 4, 4);
