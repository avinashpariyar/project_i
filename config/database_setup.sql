-- Database Setup Script for Vehicle Job Card System
-- Run this script in your MySQL/MariaDB database to create the necessary tables

-- Create database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS vehicle_jobcard CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE vehicle_jobcard;

-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Example: Insert a test user (password: 'password123')
-- Password is hashed using password_hash() PHP function
-- Default password hash for 'password123': $2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
-- You can create your own password hash using: password_hash('your_password', PASSWORD_DEFAULT)

-- Note: Replace the password hash below with your own hashed password
-- INSERT INTO users (first_name, last_name, email, password) 
-- VALUES ('Admin', 'User', 'admin@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

