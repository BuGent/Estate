<?php
session_start();

if(isset($_SESSION['isLogin']) && $_SESSION['isLogin'] === true){
	
	switch($_GET['tmp'])
    {
        case 1:
            $table="Elado";
            break;
		case 2:
			$table="Kiado";
			break;
		default:
		session_destroy();
		echo '<script type="text/javascript">alert("Kérem, ne teszteljen.")</script>';
		echo '<script type="text/javascript">window.location.href = "https://hu.wikipedia.org/wiki/Információs_rendszer_vagy_adat_megsértése";</script>';
    }

	$data=parse_ini_file('/var/www/config/config.ini');
    $conn = new mysqli("db", $data['username'], $data['password'], $data['db']);
	$conn->set_charset("utf8mb4");
    if($conn -> connect_error){
        die ("Failed to connect to MySQL: " . $conn -> connect_error);
        }
	$hirdID = $_GET['hirdId'];
	$sql= "SELECT * FROM $table WHERE hirdetesazon=?";		 
	$stmt = $conn->prepare($sql); 
	$stmt->bind_param("i", $hirdID);
	$stmt->execute();
	$result = $stmt->get_result();

	if($result->num_rows > 0){		
		$res = $result->fetch_assoc();
		$tipus = $res["tipus"];
		$ar = $res["ar"];
		$alapterulet = $res["alapterulet"];
		$szobaszam = $res["szobaszam"];
		$emelet = $res["emelet"];
		$telepules = $res["varos"];
		$utcanev = $res["utcanev"];
		$kozterulet = $res["kozterulet"];
		$hazszam = $res["hazszam"];
		$kepek = $res["kepek"];
		$leiras = $res["leiras"];
		$hirdetesazon = $res["hirdetesazon"];
		$kapcstel = $res["kapcstel"];
		$kapcsemail = $res["kapcsemail"];	
	}
	else{
		echo "0 results";
	}
	$result->free_result();
	$stmt->close();			                
    mysqli_close($conn);        
}
else{
    echo '<script type="text/javascript">alert("Az oldal megtekintéséhez bejelentkezés szükséges.")</script>';
	session_destroy();	
    echo '<script type="text/javascript">location.href = "http://localhost/login.php"</script>';
}

if($_SERVER["REQUEST_METHOD"] == "POST"){
	
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors', true);	
	
	$tipusNew = $_POST["tipus"];
	$arNew = $_POST["ar"];
	$telepulesNew = cleanSpecial($_POST["telepules"]);
	$utcaNew = cleanSpecial($_POST["utca"]);
	$kozteruletNew = cleanKozter($_POST["kozterulet"]);
	$hazszamNew = cleanHazsz($_POST["hazszam"]);
	$alapteruletNew = $_POST["alapterulet"];
	$szobaszamNew = $_POST["szobaszam"];
	$emeletNew = $_POST["emelet"];
	$leirasNew = cleanText($_POST["leiras"]);
	$hirdetesIdNew = $_POST["hirdetesId"];
	$kapcstelNew = $_POST["kapcstel"];
	$kapcsemailNew = $_POST["kapcsemail"];

	if($tipus != $tipusNew && $tipusNew!=""){
		$tipus = $tipusNew;
	}

	if($ar != $arNew && $arNew!=""){
		$ar = $arNew;
	}

	if($telepules != $telepulesNew && $telepulesNew!=""){
		$telepules = $telepulesNew;
	}

	if($utcanev != $utcaNew && $utcaNew!=""){
		$utcanev = $utcaNew;
	}

	if($kozterulet != $kozteruletNew && $kozteruletNew!=""){
		$kozterulet = $kozteruletNew;
	}

	if($hazszam != $hazszamNew && $hazszamNew!=""){
		$hazszam = $hazszamNew;
	}

	if($alapterulet != $alapteruletNew && $alapteruletNew!=""){
		$alapterulet = $alapteruletNew;
	}

	if($szobaszam != $szobaszamNew && $szobaszamNew!=""){
		$szobaszam = $szobaszamNew;
	}

	if($emelet != $emeletNew && $emeletNew!=""){
		$emelet = $emeletNew;
	}

	if($leiras != $leirasNew && $leirasNew!=""){
		$leiras = $leirasNew;
	}

	if($kapcstel != $kapcstelNew && $kapcstelNew!=""){
		$kapcstel = $kapcstelNew;
	}
	
	if($kapcsemail != $kapcsemailNew && $kapcsemailNew!=""){
		$kapcsemail = $kapcsemailNew;
	}

	$hiba = [];
	if($tipus != "Ház" && $tipus != "Házrész" && $tipus != "Sorház" && $tipus != "Lakás"
		&& $tipus != "Nyaraló" && $tipus != "Telek" && $tipus != "Iroda" && $tipus != "Garazs" && $tipus != "Egyéb")
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
		if($table == "Elado"){
			$data=parse_ini_file('/var/www/config/config.ini');
            $conn = new mysqli("db", $data['username'], $data['password'], $data['db']);
			$conn->set_charset("utf8mb4");
            if ($conn -> connect_error) {
                die ("Failed to connect to MySQL: " . $conn -> connect_error);
            }
			$stmt = $conn->prepare("UPDATE Elado SET tipus=?, ar=?, alapterulet=?, szobaszam=?, emelet=?, varos=?, utcanev=?, kozterulet=?, hazszam=?, leiras=? WHERE hirdetesazon=?");
			$stmt->bind_param("sdiiisssssi", $tipus, $ar, $alapterulet, $szobaszam, $emelet, $telepules, $utcanev, $kozterulet, $hazszam, $leiras, $hirdetesazon);
			$stmt->execute();
			if ($stmt->error) {
				die("Hiba az adatbázis frissítésekor: " . $stmt->error);
			}
			$stmt->close();		
						                
            mysqli_close($conn);

            echo '<script type="text/javascript">alert("A módosítás sikeres!")</script>';
		}
		else if($table == "Kiado"){
			$data=parse_ini_file('/var/www/config/config.ini');
            $conn = new mysqli("db", $data['username'], $data['password'], $data['db']);
			$conn->set_charset("utf8mb4");
            if ($conn -> connect_error) {
                die ("Failed to connect to MySQL: " . $conn -> connect_error);
            }
			
			$stmt = $conn->prepare("UPDATE Kiado SET tipus=?, ar=?, alapterulet=?, szobaszam=?, emelet=?, varos=?, utcanev=?, kozterulet=?, hazszam=?, leiras=? WHERE hirdetesazon=?");
			$stmt->bind_param("sdiiisssssi", $tipus, $ar, $alapterulet, $szobaszam, $emelet, $telepules, $utcanev, $kozterulet, $hazszam, $leiras, $hirdetesazon);
			$stmt->execute();
						
			$stmt->close();			
			                
            mysqli_close($conn);

            echo '<script type="text/javascript">alert("A módosítás sikeres!")</script>';            
		}
		else{
			echo '<script type="text/javascript">alert("Valami hiba történt, kérem próbálja meg újra.")</script>';
		}
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
		
		<div id="kepEdit"></div>

		<div id="kepAdd">               
			<label for="file-upload" class="file-upload">
    			<p>Kattints ide kép(ek) feltöltéséhez, vagy húzd ide őket</p>
				<p>A feltöltés azonnal megtörténik.</p>
				<p>Ha nem minden kép jelenne meg, frissítsd az oldalt.</p>
   				<input id="file-upload" name="file-upload[]" type="file" accept="image/*" max-size="5MB" multiple/>
  			</label>       
		</div>
				
		<div id="estateEdit">			               
            <form id="edit-form" method="post" enctype="multipart/form-data">
				<div id=section1>	
					<div id="edit-1">
						<select name="tipus" id="tipus" required>									
							<option value="Ház"<?php if ($tipus == "Ház") echo "selected"; ?>>Ház</option>
							<option value="Házrész"<?php if ($tipus == "Házrész") echo "selected"; ?>>Házrész</option>
							<option value="Sorház"<?php if ($tipus == "Sorház") echo "selected"; ?>>Sorház</option>
							<option value="Lakás"<?php if ($tipus == "Lakás") echo "selected"; ?>>Lakás</option>
							<option value="Nyaraló"<?php if ($tipus == "Nyaraló") echo "selected"; ?>>Nyaraló</option>
							<option value="Telek"<?php if ($tipus == "Telek") echo "selected"; ?>>Telek</option>
							<option value="Iroda"<?php if ($tipus == "Iroda") echo "selected"; ?>>Iroda</option>
							<option value="Garázs"<?php if ($tipus == "Garázs") echo "selected"; ?>>Garázs</option>
							<option value="Egyéb"<?php if ($tipus == "Egyéb") echo "selected"; ?>>Bármi más</option>									
						</select>
						<input type="text" id="ar" name="ar" min="0" 
							placeholder="<?php if ($table == "Elado") echo $ar . " millió Ft"; else echo $ar . " ezer Ft"; ?>" 
								max="9999.9999" pattern="[1-9]{1,1}[0-9]{0,3}|[1-9]{1,1}[0-9]{0,3}[.]{0,1}[0-9]{0,4}" title="Min: 0, Max: 9999.9999" autocomplete="off" ></input>
						<div id="inputContainer"></div>
					</div>
					<div id="edit-2">
						<input type="text" id="telepules" name="telepules" list="telepulesek" placeholder="<?php if($telepules!="")echo $telepules; else echo "Város";?>" pattern="[A-ZÖÜÓŐÚÉÁŰÍ]{1,1}[A-ZÖÜÓŐÚÉÁŰÍa-zöüóőúéáűí]{0,21}" title="Első nagybetű">
						<datalist id="telepulesek"></datalist>
						<input type="text"  id="utca" name="utca" pattern="[A-ZÖÜÓŐÚÉÁŰÍ]{1,1}[ A-ZÖÜÓŐÚÉÁŰÍa-zöüóőúéáűí\-\.]{0,26}" title="Első nagybetű" placeholder="<?php if($utcanev!="")echo $utcanev; else echo "Közterület neve"?>" minlength=1 maxlength=27 autocomplete="off">
						<input type="text" id="kozterulet" name="kozterulet" list="kozteruletek" placeholder="<?php if($kozterulet!="")echo $kozterulet; else echo "Közterület tipusa"?>" pattern="[A-ZÖÜÓŐÚÉÁŰÍa-zöüóőúéáűí\\x2D]{0,21}">
						<datalist id="kozteruletek"></datalist>
						<input type="text"  id="hazszam" name="hazszam" class="hazszam" pattern="([0-9]{1,3})|([0-9]{1,3}[A-Za-z]{1,1})|([0-9]{1,3}[\/]{0,1}[A-Za-z]{1,1})" title="Szám, betű, '/' jel" placeholder="<?php if($hazszam!="")echo $hazszam; else echo "Házszám"?>" minlength=1 maxlength=5 autocomplete="off">
					</div>
					<div id="edit-3">		
						<input type="number" id="alapterulet" name="alapterulet" class="rovszam" min="0" placeholder="<?php if($alapterulet!="")echo $alapterulet . " m&sup2"; else echo "Alapterület"?>" max="9999"> 
						<input type="number" id="szobaszam" name="szobaszam" class="rovszam" min="0" placeholder="<?php if($szobaszam!="")echo $szobaszam . " szoba"; else echo "Szobák száma"?>" max="50">
						<input type="number" id="emelet" name="emelet" class="rovszam" min="0" placeholder="<?php if($emelet!="")echo $emelet . " .emelet"; else echo "Emelet"?>" max="20">
					</div>
							
				</div>
				<div id=section2>
					<textarea id="leiras" name="leiras" rows="10" cols="50"><?php if($leiras!="")echo $leiras; else echo"Leírás"?></textarea>
  				</div>
				<div id=section3>
					<input type="email"  id="kapcsemail" name="kapcsemail" placeholder="<?php if($kapcsemail!="")echo $kapcsemail; else echo "email" ?>" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" autocomplete="off">
					<input type="text" id="kapcstel" name="kapcstel"  placeholder="<?php if($kapcstel!="")echo $kapcstel; else echo "Telefon"; ?>" pattern="[+]{1,1}[0-9]{1,2}[0-9]{1,2}[0-9]{6,7}" title="+36701234567" autocomplete="off">
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
		<script src="./public/modosit.js"></script>	
	</body>
</html>

<?php
function cleanSpecial($szo){
	$searchVal = array ("/", "[", "^", ".", ",", "_", "-", "]", "*", "<", ">", "(", ")", "!", "=", "|", "&", "$", "\\");
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
	$searchVal = array ("/", "[", "^", ".", ",", "_", "]", "*", "<", ">", "(", ")", "!", "=", "|", "&", "$", "\\");
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