<?php
// Handle signup form submission: validate input and create a new user account.

session_start();

require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit();
}

// Collect and trim input values
$firstName = isset($_POST['first_name']) ? trim($_POST['first_name']) : '';
$lastName  = isset($_POST['last_name'])  ? trim($_POST['last_name'])  : '';
$email     = isset($_POST['email'])      ? trim($_POST['email'])      : '';
$password  = isset($_POST['password'])   ? $_POST['password']         : '';
$terms     = isset($_POST['terms']);

// Helper function to redirect back with an error code
function redirectWithError(string $code): void {
    header('Location: index.php?status=error&error=' . urlencode($code));
    exit();
}

// Basic required field check
if ($firstName === '' || $lastName === '' || $email === '' || $password === '') {
    redirectWithError('empty_fields');
}

// Validate names: letters and spaces only
if (!preg_match('/^[A-Za-z\s]+$/', $firstName)) {
    redirectWithError('invalid_first_name');
}

if (!preg_match('/^[A-Za-z\s]+$/', $lastName)) {
    redirectWithError('invalid_last_name');
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    redirectWithError('invalid_email');
}

// Validate password length (simple example)
if (strlen($password) < 6) {
    redirectWithError('short_password');
}

// Check that terms and conditions are accepted
if (!$terms) {
    redirectWithError('terms_required');
}

try {
    $pdo = getDBConnection();

    // Check if email already exists
    $checkStmt = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
    $checkStmt->execute([$email]);

    if ($checkStmt->fetch()) {
        redirectWithError('email_exists');
    }

    // Hash the password for secure storage
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    // Insert the new user record
    $insertStmt = $pdo->prepare(
        'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)'
    );
    $insertStmt->execute([$firstName, $lastName, $email, $passwordHash]);

    // On success, redirect back with success status
    header('Location: index.php?status=success');
    exit();
} catch (PDOException $e) {
    // Log database errors for debugging
    error_log('Signup PDO error: ' . $e->getMessage());
    redirectWithError('database_error');
} catch (Exception $e) {
    error_log('Signup error: ' . $e->getMessage());
    redirectWithError('database_error');
}

