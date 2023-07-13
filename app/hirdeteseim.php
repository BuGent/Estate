<?php
session_start();

if(isset($_SESSION['isLogin']) && $_SESSION['isLogin'] === true){    
	$id = $_SESSION['userId'];
	echo "<script>let userId = $id;</script>";    
}
else{
    echo '<script type="text/javascript">alert("Az oldal megtekintéséhez bejelentkezés szükséges.")</script>';
	session_destroy();	
    echo '<script type="text/javascript">location.href = "http://localhost/login.php"</script>';
}
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta name="keywords" content="" />
		<meta name="description" content="" />
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>A legjobb otthon</title>
		<link href="style.css" rel="stylesheet" type="text/css" media="screen" />
	</head>
	<body>	
		<div class="header">
			<div class="logo">
				<h1>Ingatlanok Önnek </h1> 
				<p>...mert a legjobb otthon... </p>
			</div>
		</div>
	
		<div class="menu">				
			<a href="index.php">Kezdőlap</a>
			<a href="elado.php">Eladó ingatlanok</a>
			<a href="kiado.php">Kiadó ingatlanok</a>						
			<a class="current_page_item" href="hirdeteseim.php">Hirdetéseim</a>
			<a href="feladas.php">Hirdetés feladása</a>
			<a href="logout.php">Kijelentkezés</a>                			
		</div>
			
		<div id="myEstates" class="estates"></div>		
		
		<div id="footer">
			<p>ÁSZF</p>
			<p>Impresszum</p>
			<p>Kapcsolat</p>
			<p>Copyright (c) </p>
		</div>
		
		<script src="./public/hirdeteseim.js"></script>
	</body>
</html>
