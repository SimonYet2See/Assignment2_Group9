<!-- Name: Jihee Seo
Assignment 2

File Name: delete.php
Date: 2025-08-05
Description: budget delete controller -->


<?php
require_once __DIR__ . '/../db/conn.php';

session_start();
$response = ['success' => false, 'message' => ''];

// Get raw POST data
$json = file_get_contents('php://input');
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_SESSION['userId'])) {
    $data = json_decode($json, true); 

    $result = $budgetCrud->delete($data['transactionId'], $_SESSION['userId']);

    $response['success'] = true;
    $response['message'] = $result;
} else {
    $response['success'] = false;
    $response['message'] = "Login Required!";
}

echo json_encode($response);
?>