<?php

// Name: Jihee Seo
// Assignment 2

// File Name: signin.php
// Date: 2025-08-05
// Description: user signin controller

require_once __DIR__ . '/../db/conn.php';

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
    $user = $userCrud->getOneByEmailAndPassword($_POST['email'], $_POST['password']);
    if ($user) {
        $response['success'] = true;
        $response['message'] = $user;
        
        // user session start
        session_start();
        $_SESSION['userId'] = $user['userSurrogateId'];
    } else {
        $response['message'] = 'SignIn failed. Please try again.';
    }
}
echo json_encode($response);
?>