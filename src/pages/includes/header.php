<!-- Name: Jihee Seo, Yuanyuan Xi
Assignment 2

File Name: header.php
Date: 2025-08-05
Description: site common header included file -->

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?= htmlspecialchars($pageTitle) ?></title>
  <link rel="stylesheet" href="../css/style.css" />
  <script src="../scripts/common.js"></script>
  <?php
      if (!empty($script)) {
          $scripts = is_array($script) ? $script : [$script];

          foreach ($scripts as $src) {
              echo '<script src="' . htmlspecialchars($src) . '" defer></script>' . PHP_EOL;
          }
      }
  ?>
 
</head>
