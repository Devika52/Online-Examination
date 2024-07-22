-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 22, 2024 at 11:46 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `examination`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `password`) VALUES
('aiswaryaligin', 'aishu@123');

-- --------------------------------------------------------

--
-- Table structure for table `answer_submission`
--

CREATE TABLE `answer_submission` (
  `id` bigint(20) NOT NULL,
  `marks` int(4) NOT NULL,
  `grade` varchar(2) NOT NULL DEFAULT 'F',
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `answer_submission`
--

INSERT INTO `answer_submission` (`id`, `marks`, `grade`, `user_id`) VALUES
(1, 2, 'F', 1),
(2, 0, 'F', 2),
(3, 2, 'D', 2),
(4, 2, 'D', 2),
(5, 4, 'C', 2),
(6, 3, 'F', 2),
(7, 4, 'C', 2),
(8, 3, 'F', 2),
(9, 4, 'C', 2),
(10, 5, 'A', 2);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` bigint(20) NOT NULL,
  `question` varchar(1000) NOT NULL,
  `option_1` varchar(50) NOT NULL,
  `option_2` varchar(50) NOT NULL,
  `option_3` varchar(50) NOT NULL,
  `option_4` varchar(50) NOT NULL,
  `answer` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `question`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES
(1, 'Capital of India ?', 'Delhi', 'Trivandrum', 'Kolkata', 'Aby', 'Delhi'),
(2, 'Who is known as the Father of Computer ?', 'Steve Sajan Jacob', 'Aiswarya Ligin', 'Devika S Suresh', 'Charles Babbage', 'Charles Babbage'),
(3, 'What does HTTP stand for ?', 'HyperText Transfer Protocol', 'HyperText Transfer Program', 'HyperText Transmission Protocol', 'HyperText Transfer Procedure', 'HyperText Transfer Protocol'),
(5, 'Expand HTML', 'Hypertext Markup Language', 'HyperText Transfer Makeup Language', 'HyperText Transformer Makeup Language', 'HyperCool Transformer Makeup Language', 'Hypertext Markup Language'),
(6, 'Expand XML', 'Extensible Markup Language', 'Extendable Markup Language', 'Extendable Minimalist Language', 'Extendable Markup Linguistics', 'Extensible Markup Language');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `ph_no` int(10) NOT NULL,
  `subject` varchar(10) NOT NULL,
  `address` varchar(50) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `dob` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `name`, `password`, `email`, `ph_no`, `subject`, `address`, `gender`, `dob`) VALUES
(0, 'Abhay', 'asdf', 'abhays.babu88@gmail.', 0, '', 'karamana', 'male', '2004-05-09'),
(0, 'ligin', 'fdsa', 'ligin@gmail.com', 0, '', 'asdf', 'female', '2007-05-29');

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `ID` int(100) NOT NULL,
  `name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `ph_no` int(11) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`ID`, `name`, `password`, `email`, `ph_no`, `gender`, `address`) VALUES
(0, 'Deepthi', 'asdf', 'deepthi@gmail.com', 2147483647, 'Female', 'Thirumala'),
(0, 'Gautham', 'asdf', 'gautham@gmail.com', 2147483647, 'Male', 'Kaimanam');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(10) NOT NULL,
  `phone_no` varchar(20) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `date_of_birth` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `first_name`, `last_name`, `email`, `role`, `phone_no`, `gender`, `address`, `date_of_birth`) VALUES
(1, 'aiswaryaligin', 'aishu@123', 'Aiswarya', 'Ligin', 'aiswaryaligin@gmail.com', 'admin', '9876543210', 'female', 'Kowdiar,TVM', '2004-05-04'),
(2, 'abhay', 'abhay', 'Abhay', 'S Babu', 'abhay@gmail.com', 'student', '9876543211', 'male', 'Kowdiar,TVM', '2004-05-04'),
(3, 'deepthi', 'deepthi@123', 'Deepthi', 'Rani S.S', 'deepthi@gmail.com', 'teacher', '9876543212', 'female', 'Kowdiar,TVM', '2000-05-04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer_submission`
--
ALTER TABLE `answer_submission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `answer_student_relation` (`user_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `question` (`question`) USING HASH;

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answer_submission`
--
ALTER TABLE `answer_submission`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answer_submission`
--
ALTER TABLE `answer_submission`
  ADD CONSTRAINT `answer_student_relation` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
