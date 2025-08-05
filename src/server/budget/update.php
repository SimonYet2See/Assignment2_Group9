<!-- Name: Jihee Seo
Assignment 2

File Name: read.php
Date: 2025-08-05
Description: budget update controller -->

<?php
require_once __DIR__ . '/../db/conn.php';

session_start();
$response = ['success' => false, 'message' => ''];

// Get raw POST data
$json = file_get_contents('php://input');
if ($_SERVER['REQUEST_METHOD'] === 'UPDATE' && isset($_SESSION['userId'])) {
    $data = json_decode($json, true); 
    $result = $budgetCrud->update($_SESSION['userId'], $data);

    $response['success'] = true;
    $response['message'] = $result;
} else {
    $response['success'] = false;
    $response['message'] = "Login Required!";
}

echo json_encode($response);
?>