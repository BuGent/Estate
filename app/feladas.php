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
if($_SERVER["REQUEST_METHOD"] == "POST"){
	
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors', true);	
	
	$elki = $_POST["elki"];
	$tipus = $_POST["tipus"];
	$ar = $_POST["ar"];
	$telepules = cleanSpecial($_POST["telepules"]);
	$utca = cleanSpecial($_POST["utca"]);
	$kozterulet = cleanKozter($_POST["kozterulet"]);
	$hazszam = cleanHazsz($_POST["hazszam"]);
	$alapterulet = $_POST["alapterulet"];
	$szobaszam = $_POST["szobaszam"];
	$emelet = $_POST["emelet"];
	$kapcsemail = $_POST["kapcsemail"];
	$kapcstelefon = $_POST["kapcstel"];
	$leiras = cleanText($_POST["leiras"]);
	$hirdetesId = $_POST["hirdetesId"];
	
	$hiba = array ();
	if($elki != "Elado" &&  $elki != "Kiado"){
		$hiba[] = "Csak eladásra, vagy kiadásra van lehetőség.";
	}

	if($tipus != "Ház" && $tipus != "Házrész" && $tipus != "Sorház" && $tipus != "Lakás"
		&& $tipus != "Nyaraló" && $tipus != "Telek" && $tipus != "Iroda" && $tipus != "Garázs" && $tipus != "Egyéb")
		{
		$hiba[] = "Hibás típus.";
	}
	
	if(!is_numeric($ar) && $ar!=""){
		$hiba[] = "Kérem, hogy árnak csak számot adjon meg.";
	}

	if(!is_numeric($alapterulet) && $alapterulet!=""){
		$hiba[] = "Kérem, hogy alapterületnek csak számot adjon meg.";
	}

	if(!is_numeric($szobaszam) && $szobaszam!=""){
		$hiba[] = "Kérem, hogy szobaszámnak csak számot adjon meg.";
	}

	if(!is_numeric($emelet) && $emelet!=""){
		$hiba[] = "Kérem, hogy emeletnek csak számot adjon meg.";
	}
	
	$kepek = 0;
	if (isset($_FILES['file-upload']) && !empty($_FILES['file-upload']['tmp_name'][0])) {
		$kepek = count($_FILES['file-upload']['tmp_name']);		
	}
		
	if(count($hiba)>0){
		$hibauzenet = '<script type="text/javascript">alert("';

		for($i=0; $i<count($hiba); $i++){
			$hibauzenet .= $hiba[$i];
			$hibauzenet .= "\\n";
		}
		$hibauzenet .= '")</script>';
		echo $hibauzenet;
	}
	else{
		if($elki == "Elado"){
			$data=parse_ini_file('/var/www/config/config.ini');
            $conn = new mysqli("db", $data['username'], $data['password'], $data['db']);
			$conn->set_charset("utf8mb4");
            if ($conn -> connect_error) {
                die ("Failed to connect to MySQL: " . $conn -> connect_error);
            }
			$stmt = $conn->prepare("INSERT INTO Elado (tipus, ar, alapterulet, szobaszam, emelet, varos, utcanev, kozterulet, hazszam, kepek, leiras, hirdetesazon, kapcstel, kapcsemail, userid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
			$stmt->bind_param("sdiiissssisissi", $tipus, $ar, $alapterulet, $szobaszam, $emelet, $telepules, $utca, $kozterulet, $hazszam, $kepek, $leiras, $hirdetesId, $kapcstelefon, $kapcsemail, $id);
			$stmt->execute();
			
			echo "Error:\n";
    		print_r($stmt->error_list);

			$stmt->close();		
						                
            mysqli_close($conn);

            echo '<script type="text/javascript">alert("A feltöltés sikeres.!")</script>';
            echo '<script type="text/javascript">location.href = "http://localhost/hirdeteseim.php"</script>';

		}
		else if($elki == "Kiado"){
			$data=parse_ini_file('/var/www/config/config.ini');
            $conn = new mysqli("db", $data['username'], $data['password'], $data['db']);
			$conn->set_charset("utf8mb4");
            if ($conn -> connect_error) {
                die ("Failed to connect to MySQL: " . $conn -> connect_error);
            }
			
			$stmt = $conn->prepare("INSERT INTO Kiado (tipus, ar, alapterulet, szobaszam, emelet, varos, utcanev, kozterulet, hazszam, kepek, leiras, hirdetesazon, kapcstel, kapcsemail, userid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
			$stmt->bind_param("sdiiissssisissi", $tipus, $ar, $alapterulet, $szobaszam, $emelet, $telepules, $utca, $kozterulet, $hazszam, $kepek, $leiras, $hirdetesId, $kapcstelefon, $kapcsemail, $id);
			$stmt->execute();
			$stmt->close();		
						                
            mysqli_close($conn);

            echo '<script type="text/javascript">alert("A feltöltés sikeres.!")</script>';
            echo '<script type="text/javascript">location.href = "http://localhost/hirdeteseim.php"</script>';
		}
		else{
			echo '<script type="text/javascript">alert("Valami hiba történt, kérem próbálja meg újra.")</script>';
		}
	}    
}

function cleanSpecial($szo){
	$searchVal = array ("/", "[", "^", ",", "_", "]", "*", "<", ">", "(", ")", "!", "=", "|", "&", "$", "\\");
	$cleaned = str_replace($searchVal, "", $szo, $cserekSzama);

	if($cserekSzama>=2){
		session_destroy();
		echo '<script type="text/javascript">alert("Biztos akart speciális karaktereket használni?")</script>';
		echo '<script type="text/javascript">window.location.href = "https://hu.wikipedia.org/wiki/Információs_rendszer_vagy_adat_megsértése";</script>';
	}
	else{
		return $cleaned;
	}		
}

function cleanKozter($szo){
	$searchVal = array ("/", "[", "^", ",", "_", "]", "*", "<", ">", "(", ")", "!", "=", "|", "&", "$", "\\");
	$cleaned = str_replace($searchVal, "", $szo, $cserekSzama);
	if($cserekSzama>=2){
		session_destroy();
		echo '<script type="text/javascript">alert("Biztos akart speciális karaktereket használni?")</script>';
		echo '<script type="text/javascript">window.location.href = "https://hu.wikipedia.org/wiki/Információs_rendszer_vagy_adat_megsértése";</script>';
	}
	else{
		return $cleaned;
	}
}

function cleanHazsz($szo){
	$searchVal = array ("[", "^", ".", ",", "_", "-", "]", "*", "<", ">", "(", ")", "!", "=", "|", "&", "$", "\\");
	$cleaned = str_replace($searchVal, "", $szo, $cserekSzama);
	if($cserekSzama>=2){
		session_destroy();
		echo '<script type="text/javascript">alert("Biztos akart speciális karaktereket használni?")</script>';
		echo '<script type="text/javascript">window.location.href = "https://hu.wikipedia.org/wiki/Információs_rendszer_vagy_adat_megsértése";</script>';
	}
	else{
		return $cleaned;
	}
}

function cleanText($szoveg){
	$searchVal = array ("[", "^", "_", "]", "<", ">", "=", "|", "&", "$", "\\");
	$cleaned = str_replace($searchVal, "", $szoveg, $cserekSzama);
	if($cserekSzama>=4){
		session_destroy();
		echo '<script type="text/javascript">alert("Biztos akart speciális karaktereket használni?")</script>';
		echo '<script type="text/javascript">window.location.href = "https://hu.wikipedia.org/wiki/Információs_rendszer_vagy_adat_megsértése";</script>';
	}
	else{
		return $cleaned;
	}
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
			<a href="hirdeteseim.php">Hirdetéseim</a>
			<a class="current_page_item" href="feladas.php">Hirdetés feladása</a>
            <a href="logout.php">Kijelentkezés</a> 			
		</div>	
		
		<div id="feladas">                
            <form id="felad-form" method="post" enctype="multipart/form-data">
				<div id=section1>	
					<div id="felad-1">
						<select id= "elki" name="elki">
							<option value="Elado">Eladni szeretnék</option>
							<option value="Kiado">Kiadni szeretnék</option>	
						</select>
						<select name="tipus" required>									
							<option value="" disabled selected>Kérem válasszon..</option>
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
						<div id="inputContainer"></div>
					</div>
					<div id="felad-2">
						<input type="text" id="telepules" name="telepules" list="telepulesek" placeholder="Település neve" pattern="[A-ZÖÜÓŐÚÉÁŰÍ]{1,1}[A-ZÖÜÓŐÚÉÁŰÍa-zöüóőúéáűí\-. ]{0,21}" title="Első nagybetű" autocomplete="off" required>
						<datalist id="telepulesek"></datalist>
						<input type="text"  id="utca" name="utca" pattern="[A-ZÖÜÓŐÚÉÁŰÍ]{1,1}[ A-ZÖÜÓŐÚÉÁŰÍa-zöüóőúéáűí\-.]{0,26}" title="Első nagybetű" placeholder="Közterület neve" minlength=1 maxlength=27 autocomplete="off">
						<input type="text" id="kozterulet" name="kozterulet" list="kozteruletek" placeholder="Közterület tipusa" pattern="[A-ZÖÜÓŐÚÉÁŰÍa-zöüóőúéáűí\- ]{0,21}">
						<datalist id="kozteruletek"></datalist>
						<input type="text"  id="hazszam" name="hazszam" class="hazszam" pattern="([0-9]{1,3})|([0-9]{1,3}[A-Za-z]{1,1})|([0-9]{1,3}[\/]{0,1}[A-Za-z]{1,1})" title="Szám, betű, '/' jel" placeholder="Házszám" minlength=1 maxlength=5 autocomplete="off">
					</div>
					<div id="felad-3">		
						<input type="number" id="alapterulet" name="alapterulet" class="rovszam" min="0" placeholder="Alapterület (m&sup2)" max="9999" autocomplete="off">
						<input type="number" id="szobaszam" name="szobaszam" class="rovszam" min="0" placeholder="Szobaszám" max="50" autocomplete="off">
						<input type="number" id="emelet" name="emelet" class="rovszam" min="0" placeholder="Emelet" max="20" autocomplete="off">
					</div>							
				</div>
				<div id=section2>
					<textarea id="leiras" name="leiras" rows="10" cols="50" placeholder="Leírás a hirdetéshez"></textarea>
  				</div>																						
				<div id=section3>
					<h3>Kapcsolattartás: </h3>																			
					<input type="kapcsemail"  id="kapcsemail" name="kapcsemail" placeholder="Email" pattern="[a-zA-Z0-9]{1,1}[a-zA-Z0-9.\-_]{1,}[@]{1,1}[a-zA-Z0-9\-.]{1,}[.]{1,1}[a-zA-Z]{2,4}" autocomplete="off" required>
					<input type="text" id="kapcstel" name="kapcstel"  placeholder="Telefon" pattern="[+]{1}[0-9]{1,2}[0-9]{6,7}" title="+36701234567" autocomplete="off">
  				</div>
				<div id=kepfel>
					<label for="file-upload" class="file-upload">
						<p>Kattints ide kép(ek) feltöltéséhez, vagy húzd ide őket</p>
						<input id="file-upload" name="file-upload[]" type="file" accept=".jpg, .jpeg, .png" max-size="5MB" multiple/>
					</label>
  				</div>	
				<input type="hidden" name="hirdetesId" id="hirdetesId">					  	
				<button id="feladbtn" type="submit">Feladás</button>
            </form>                                  
        </div>				
		
		<div id="footer">
			<p>ÁSZF</p>
			<p>Impresszum</p>
			<p>Kapcsolat</p>
			<p>Copyright (c) </p>
		</div>
	
		<script src="./public/telepulesek.js"></script>
		<script src="./public/kozterulet.js"></script>
		<script src="./public/felad.js"></script>	
	</body>
</html>