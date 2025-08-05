<!-- Name: Jihee Seo, Yuanyuan Xi
Assignment 2

File Name: signup.php
Date: 2025-08-05
Description: signup page  -->

<?php
  $pageTitle = "Sign Up - VisualBudget";
  $script = "../scripts/signup.js";
  require_once './includes/header.php';
?>

<body class="auth-body">
  <header class="header">
    <h1><a href="index.php">VisualBudget</a></h1>
  </header>

  <main class="form-container">
    <form class="auth-form">
      <h2>Create an Account</h2>

      <div class="form-group">
        <label for="firstname">First Name</label>
        <input type="text" id="firstname" name="firstname" required>
      </div>

      <div class="form-group">
        <label for="lastname">Last Name</label>
        <input type="text" id="lastname" name="lastname" required>
      </div>

      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" required>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>
      </div>

      <div class="form-group">
        <label for="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" name="confirm-password"  required>
      </div>

      <div class="form-group">
        <label for="country">Country</label>
        <input type="text" id="country" name="country" required>
      </div>

      <div class="form-group">
        <label for="city">City</label>
        <input type="text" id="city"  name="city"  required>
      </div>

      <div class="form-group">
        <label for="gender">Gender</label>
        <select id="gender" name="gender" required >
          <option value="">Select</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="nonbinary">Non-Binary</option>
          <option value="prefer-not">Prefer not to say</option>
        </select>
      </div>

      <button type="button" id="submitBtn" class="btn" >Sign Up</button>
    </form>
  </main>

   <?php require_once './includes/footer.php'; ?>
</body>
</html>