<!-- Name: Jihee Seo
Assignment 2

File Name: read.php
Date: 2025-08-05
Description: budget read controller -->

<?php
require_once __DIR__ . '/../db/conn.php';

session_start();
$response = ['success' => false, 'message' => ''];

// Get raw POST data
if (isset($_SESSION['userId'])) {
    $start = !empty($_GET['start']) ? $_GET['start'] : '2020-01-01';
    $end = !empty($_GET['end']) ? $_GET['end'] : '2030-10-10';
    $keyword = $_GET['keyword'] ?? '';
    $filter =  $_GET['filter'] ?? '';
    $userId = $_SESSION['userId'];

    $list = $budgetCrud->getList($start, $end, $keyword, $filter === 'ALL' ? '' : $filter , $userId);

    $response['success'] = true;
    $response['message'] =  $list;
} else {
    $response['success'] = false;
    $response['message'] = "Login Required!";
}

echo json_encode($response);
?>