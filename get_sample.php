<?php
  $filename = $_GET['sample_name'];
    $path = "samples/";
    
    $file = $path . $filename . ".txt";
    print file_get_contents($file);
?>