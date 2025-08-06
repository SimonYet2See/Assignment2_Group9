<?php
// Name: Jihee Seo
// Assignment 2

// File Name: db.php
// Date: 2025-08-05
// Description: config for db connection and make pdo instance


    $host ='localhost';
    $db ='assignment2';
    $user = 'root';
    $port = 3307;
    $pass = '';
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";

    try {
        $pdo = new PDO($dsn, $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    } catch(PDOException $e) {
        echo "Connection error" .  $e->getMessage();
    }

    require_once __DIR__ . '/../user/crud.php';
    require_once __DIR__ . '/../budget/crud.php';
    $userCrud = new UserCrud($pdo);
    $budgetCrud = new budgetCrud($pdo)
?>