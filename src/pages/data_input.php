
<!-- Name: Jihee Seo, Yuanyuan Xi
Assignment 2

File Name: data_input.php
Date: 2025-08-05
Description: budget creattion page  -->

<?php
  $pageTitle = "Data Input - VisualBudget";
  $script = ["../scripts/budget/data_input.js", "../scripts/budget/budget.js"];
  require_once './includes/header.php';
?>

<body class="auth-body">
  <div class="container">
    <header class="header">
      <h1><a href="index.php">VisualBudget</a></h1>
    </header>

    <!-- Error banner -->
    <div id="error-banner" style="display:none;"></div>
    <div id="success-banner" style="display:none; color: green; font-weight: bold; margin-top: 10px;"></div>

    <main class="main-section">
      <h2 class="page-title">Insert New Data</h2>

      <div class="summary">
        <div class="date-row">
          <h3><label for="entry-date">Date:</label></h3>
          <input type="date" id="entry-date" name="entry-date" />
        </div>

        <!-- <h3>User: John Doe</h3> -->
        <h3>Total Income: $<span id="total-income">0</span></h3>
        <h3>Total Spending: $<span id="total-spending">0</span></h3>
        <h3 class="asset asset-zero" id="asset-display">$0.00</h3>
      </div>

      <section id="income-section" class="section">
        <div class="action-buttons">
          <button id="add-income" class="btn">Add Income</button>
        </div>
        <div id="income-rows"></div>
      </section>

      <section id="spending-section" class="section">
        <div class="action-buttons">
          <button id="add-spending" class="btn">Add Spending</button>
        </div>
        <div id="spending-rows"></div>
      </section>

      <div class="bottom-buttons">
        <button id="submit-btn" class="btn small-btn">Submit</button>
        <button id="history-btn" class="btn small-btn">View History Records</button>
      </div>

      <div class="visualize-container">
        <button id="visualize-btn" class="btn">View Dashboard</button>
      </div>
    </main>
  </div>

  <?php require_once './includes/footer.php'; ?>
</body>
</html>