<?php
  $pageTitle = "History - My Finance Tracker";
  $script = ["../scripts/history.js"];
  require_once './includes/header.php';
?>

<body id="history-page">
  <div class="history-container">
  <header class="header">
    <h1 class="logo">Transaction History</a></h1>
    <nav class="nav-buttons">
      <a href="data_input.php" class="button small-button">Insert New Data</a>
      <a href="dashboard.php" class="button small-button">View Dashboard</a>
    </nav>
  </header>
  </div>
  <main class="container">
    <form method="GET" >
      <div class="search-container">
        <input type="text" name="keyword" id="searchInput" placeholder="Search by category, note.">
        <select name="filter" id="filter" >
            <option value="ALL">ALL</option>
            <option value="INCOME">INCOME</option>
            <option value="SPENDING">SPENDING</option>
        </select>
       <button type="submit" class="btn" >Search</button>
      </div>
  </form>
    <div class="table-container">
      <table id="historyTable">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount ($)</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="historyBody">
          <!-- Populated via JS -->
        </tbody>
      </table>
    </div>
  </main>

    <?php require_once './includes/footer.php'; ?>
</body>
</html>