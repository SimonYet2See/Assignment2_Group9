<!-- Name: Jihee Seo, Yuanyuan Xi
Assignment 2

File Name: signin.php
Date: 2025-08-05
Description: signin page  -->

<?php
  $pageTitle = "Login - VisualBudget";
  $script = "../scripts/login.js";
  require_once './includes/header.php';
?>
<body class="login-body">
    <header class="header">
        <h1><a href="index.php">VisualBudget</a></h1>
      </header>
      
  <main class="login-wrapper">
    <div class="login-container">
      <h2>Login Page</h2>
      <form method="post">
        <input type="text" placeholder="Email" name="email" id="email" required />
        <input type="password" placeholder="Password" name="password" id="password" required />
        <button type="button" id="submitBtn" >Login</button>
      </form>
      <p class="signup-link">Don’t have an account? <a href="signup.php">Sign up</a></p>
    </div>
  </main>

  <?php require_once './includes/footer.php'; ?>
</body>
</html>
