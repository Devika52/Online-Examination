-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 31, 2024 at 09:06 PM
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
-- Database: `examination`
--

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
(13, 5, 'A', 7);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` bigint(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `ph_no` varchar(15) NOT NULL,
  `feedback` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `email`, `ph_no`, `feedback`) VALUES
(7, 'alphiya@gmail.com', '2342342343', 'it was good'),
(7, 'vineeth@gmail.com', '7907694445', 'asdf');

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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(10) NOT NULL,
  `phone_no` varchar(20) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `date_of_birth` date NOT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `password`, `first_name`, `last_name`, `email`, `role`, `phone_no`, `gender`, `address`, `date_of_birth`, `status`) VALUES
(1, 'aishu@123', 'Aiswarya', 'Ligin', 'aiswaryaligin@gmail.com', 'admin', '9876543210', 'female', 'Kowdiar,TVM', '2004-05-04', ''),
(5, 'devuu', 'Devika', 'Suresh. S', 'devikasuresh@gmail.com', 'student', '9037183374', 'female', 'Pangapara', '2004-05-02', 'approved'),
(6, 'aswathy', 'Aswathy', 'J S', 'aswathy@gmail.com', 'student', '9496110215', 'female', 'Balaramapuram', '2004-10-26', 'rejected'),
(7, 'alphiya', 'Alphiyaaaa', 'M S', 'alphiya@gmail.com', 'student', '7907693336', 'female', 'Neyyathinkara', '2024-08-20', 'approved'),
(10, 'fdsa', 'Vineeth', 'PP', 'vineeth@gmail.com', 'teacher', '7907694440', 'Male', 'Thirumala', '2024-08-14', 'approved'),
(12, 'asdf', 'Lekshmiii', 'V', 'lechu@gmail.com', 'teacher', '7907694440', 'Female', 'Vellayambalam', '2024-08-15', 'approved'),
(13, 'asdf', 'abhay', 's. babu', 'abhays.babu88@gmail.com', 'teacher', '7907694448', 'Male', 'Thirumalaa', '2024-08-21', 'pending');

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
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD KEY `id` (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `question` (`question`) USING HASH;

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answer_submission`
--
ALTER TABLE `answer_submission`
  ADD CONSTRAINT `answer_student_relation` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `id` FOREIGN KEY (`id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
