<?php
require_once __DIR__ . '/../db/conn.php';

session_start();
$response = ['success' => false, 'message' => ''];

// Get raw POST data
$json = file_get_contents('php://input');
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['userId'])) {
    $data = json_decode($json, true); 
    $incomeResult = $budgetCrud->insert($data['incomes'], 'INCOME', $data['date'], $_SESSION['userId']);
    $spendingResult= $budgetCrud->insert($data['spending'], 'SPENDING', $data['date'], $_SESSION['userId']);
    $response['success'] = $incomeResult && $spendingResult;
    $response['message'] = $data;
} else {
    $response['success'] = false;
    $response['message'] = "Login Required!";
}

echo json_encode($response);
?>