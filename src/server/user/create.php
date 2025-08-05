<!-- Name: Jihee Seo
Assignment 2

File Name: create.php
Date: 2025-08-05
Description: user create controller -->

<?php
require_once __DIR__ . '/../db/conn.php';

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
    // Ensure password fields are set
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm-password'] ?? '';

    // Password validation
    if ($password !== $confirmPassword) {
        $response['message'] = 'Passwords do not match.';
    } else {
        // Check if email is already registered
        $user = $userCrud->getOne($_POST['email']);
        if ($user) {
            $response['message'] = 'Email is already registered.';
        } else {
            // Insert user into the database
            $isSuccess = $userCrud->insert($_POST);  
            if ($isSuccess) {
                $response['success'] = true;
                $response['message'] = 'Registration successful!';
            } else {
                $response['message'] = 'Registration failed. Please try again.';
            }
        }
    }
}

echo json_encode($response);
?>