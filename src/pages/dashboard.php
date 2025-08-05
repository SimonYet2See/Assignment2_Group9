<!-- Name: Jihee Seo, Yuanyuan Xi
Assignment 2

File Name: dashboard.php
Date: 2025-08-05
Description: budget dashbord page  -->


<?php
  $pageTitle = "Financial Dashboard";
  $script = ["https://cdn.jsdelivr.net/npm/chart.js", "../scripts/dashboard.js"];
  require_once './includes/header.php';
?>

<body id="dashboard-page">
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1>My Financial Dashboard</h1>
      <div class="edit-btn-group">
        <a href="data_input.php" class="edit-btn">Insert Data</a>
        <a href="history.php" class="edit-btn">Edit/View History Data</a>
      </div>
    </header>

    <div class="filters">
        <div class="filter-group">
          <form method="GET" >
            <label for="date-range">Date Range:</label>
            <input type="date" id="start" name="start">
            <input type="date" id="end" name="end">
            <button type="submit" class="btn" >Search</button>
        </form>
        </div>
        
      

    
    </div>
    
    <main class="dashboard-charts">
      <h2>Income Overview</h2>
      <div class="chart-row" >
        <div>
            <canvas id="incomePieChart" ></canvas>
        </div>
        <div>
            <canvas id="incomeBarChart" ></canvas>
        </div>
       
      </div>

      <h2>Spending Overview</h2>
      <div class="chart-row">
         <div>
            <canvas id="spendingPieChart" ></canvas>
        </div>
        <div>
            <canvas id="spendingBarChart" ></canvas>
        </div>
       
      </div>
    </main>
  </div>
    <?php require_once './includes/footer.php'; ?>

</body>
</html>