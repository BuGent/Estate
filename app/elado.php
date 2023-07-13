<?php
session_start();

if(isset($_SESSION['isLogin']) && $_SESSION['isLogin'] === true){    
    $id = $_SESSION['userid'];    
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
		<meta http-equiv="Content-Language" content="hu" />
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
			<a class="current_page_item" href="elado.php">Eladó ingatlanok</a>
			<a href="kiado.php">Kiadó ingatlanok</a>						
			<a href="hirdeteseim.php">Hirdetéseim</a>
			<a href="feladas.php">Hirdetés feladása</a>
			<a href="logout.php">Kijelentkezés</a>			
		</div>		
			
		<div class="szures">
			<form id="eladForm">
				<select name="tipus">									
					<option value="" selected>Kérem válasszon..</option>
					<option value="Ház">Ház</option>
					<option value="Házrész">Házrész</option>
					<option value="Sorház">Sorház</option>
					<option value="Lakás">Lakás</option>
					<option value="Nyaraló">Nyaraló</option>
					<option value="Telek">Telek</option>
					<option value="Iroda">Iroda</option>
					<option value="Garázs">Garázs</option>
					<option value="Egyéb">Bármi más</option>									
				</select>
				<input type="text" id="telepules" list="telepulesek" placeholder="Település neve">
				<datalist id="telepulesek"></datalist>
				<label for="minimum">Min. ár: </label>
					<input type="number" id="minimum" min="0" placeholder="millió Ft" max="9999">
				<label for="maximum">Max. ár: </label>
					<input type="number" id="maximum" min="0" placeholder="millió Ft" max="9999">
				<button type="submit" id="eladbtn">Szűrés</button>
			</form>
		</div>
			
		<div id="page">			
			<div id="eladoEstates" class="estates"></div>
			<div id="more"></div>									
		</div>
			
		<div id="footer">
			<p>ÁSZF</p>
			<p>Impresszum</p>
			<p>Kapcsolat</p>
			<p>Copyright (c) </p>
		</div>
		<script src="./public/elado.js"></script>
		<script src="./public/telepulesek.js"></script>
	</body>
</html>