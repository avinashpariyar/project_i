<?php
// Handle password reset form submission

require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit();
}

$email           = isset($_POST['email']) ? trim($_POST['email']) : '';
$newPassword     = isset($_POST['new_password']) ? $_POST['new_password'] : '';
$confirmPassword = isset($_POST['confirm_password']) ? $_POST['confirm_password'] : '';

// Helper for redirect with error
function redirectWithError(string $code, string $email): void {
    $query = http_build_query([
        'error' => $code,
        'email' => $email,
    ]);
    header('Location: index.php?' . $query);
    exit();
}

if ($newPassword === '' || $confirmPassword === '') {
    redirectWithError('empty_password', $email);
}

if (strlen($newPassword) < 6) {
    redirectWithError('short_password', $email);
}

if ($newPassword !== $confirmPassword) {
    redirectWithError('mismatch', $email);
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    redirectWithError('invalid_email', $email);
}

try {
    $pdo = getDBConnection();

    // Check that a user exists with this email
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        redirectWithError('user_not_found', $email);
    }

    // Update password hash
    $hashed = password_hash($newPassword, PASSWORD_DEFAULT);

    $update = $pdo->prepare('UPDATE users SET password = ? WHERE id = ?');
    $update->execute([$hashed, $user['id']]);

    // Redirect to success page
    header('Location: success.php');
    exit();
} catch (PDOException $e) {
    error_log('Reset password DB error: ' . $e->getMessage());
    redirectWithError('database_error', $email);
} catch (Exception $e) {
    error_log('Reset password error: ' . $e->getMessage());
    redirectWithError('database_error', $email);
}

