<?php
/**
 * Database Configuration File
 * Centralized database connection settings for the Vehicle Job Card System
 */

// Database connection parameters
define('DB_HOST', 'localhost');        // Database host (usually 'localhost')
define('DB_NAME', 'vehicle_jobcard');  // Database name
define('DB_USER', 'root');             // Database username
define('DB_PASS', '');                 // Database password
define('DB_CHARSET', 'utf8');          // Character set

/**
 * Get database connection using PDO
 * @return PDO Database connection object
 * @throws PDOException If connection fails
 */
function getDBConnection() {
    try {
        // Create DSN (Data Source Name) string
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        
        // Create PDO connection with options
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,  // Throw exceptions on errors
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,        // Return associative arrays
            PDO::ATTR_EMULATE_PREPARES   => false,                   // Use native prepared statements
        ];
        
        // Create and return PDO connection
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        
        return $pdo;
        
    } catch (PDOException $e) {
        // Log error for debugging (in production, log to file)
        error_log("Database Connection Error: " . $e->getMessage());
        
        // Return null or throw exception based on your error handling strategy
        throw new Exception("Database connection failed. Please contact administrator.");
    }
}

/**
 * Test database connection
 * @return bool True if connection successful, false otherwise
 */
function testDBConnection() {
    try {
        $pdo = getDBConnection();
        return $pdo !== null;
    } catch (Exception $e) {
        return false;
    }
}

?>

