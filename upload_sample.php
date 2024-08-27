<?php
  $filename = $_POST['sampleName'];
  $description = $_POST['sampleDescription'];
  $author = $_POST['sampleAuthor'];
  $path = "samples/";
  $file = $path . $filename . ".txt";
  if(!ctype_alnum($filename)) {
    print("Sorry, only alphanumeric characters are allowed in sample names.");
    
  } else if(file_exists($file)) {
   	print("Sorry, a sample has already been uploaded with this filename.");
  } else {
    
    $txt = str_replace(",", "\n", $_POST['sampleData']);
    for($i = 0; $i < 10; $i++) {
			file_put_contents($file, $txt);
		}
		$dir = 'samples/';
		$files = scandir($dir);
		foreach($files as $a) {
			touch($dir . $a);

		}
		$author = htmlspecialchars($author);
		$description = htmlspecialchars($description);
    print("Success! Sample with name " . $filename . " has been added to the sample library. Thanks for contributing!");
    $documentation = "<br><h4>$filename</h4>\n<h6><i>Uploaded by:</i> <span>$author</span></h6>\n<h6><i>Description:</i>\n<span>$description</span>\n</h6>\n";
    file_put_contents("sample_docs.html", $documentation, FILE_APPEND);
  }
?>