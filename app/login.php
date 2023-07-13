<?php
session_start();

if($_SERVER["REQUEST_METHOD"] == "POST"){

	$email = $_POST["email"];
	$pass = $_POST["password"];
		
	$data=parse_ini_file('/var/www/config/config.ini');
	$conn = new mysqli("db", $data['username'], $data['password'], $data['db']);
	if($conn -> connect_error){
		die ("Failed to connect to MySQL: " . $conn -> connect_error);
		session_destroy();
	} 			
			
	$sql = "SELECT * FROM `Users` WHERE email = '$email'";		
		
	$result = mysqli_query($conn, $sql);
		
	if(mysqli_num_rows($result) > 0){
		$user = mysqli_fetch_assoc($result);
			
		if(password_verify($pass, $user["pass"])){
				
			echo '<script type="text/javascript">alert("Sikeres bejelentkezés! Üdv újra, '. $user["kernev"] .'");</script>';			
			
			$_SESSION['userId'] = $user["id"];
			$_SESSION['isLogin'] = true;
				
			echo '<script type="text/javascript">location.href = "http://localhost/hirdeteseim.php"</script>';

		}
		else{
			echo '<script type="text/javascript">alert("Hibás jelszó")</script>';
			session_destroy();	
		}			
	}
	else{
		echo '<script type="text/javascript">alert("Nincs ilyen felhasználó")</script>';
	}	
	mysqli_close($conn);
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
			<a href="index.html">Kezdőlap</a>
			<a href="elado.html">Eladó ingatlanok</a>
			<a href="kiado.html">Kiadó ingatlanok</a>						
			<a class="current_page_item" href="login.php">Bejelentkezés</a>
			<a href="register.php">Regisztráció</a>			
		</div>

		<div class="register-login">                
            <form class="reglog-form" method="post">
                <h1>Bejelentkezés</h1>                        
                <div>
					<input type="email"  id="email" name="email" placeholder="Email" pattern="[A-Za-z0-9]{1,1}[A-Za-z0-9_.\-]{1,}[@]{1,1}[a-z0-9.\-]{1,}[.]{1,1}[a-z]{2,}" autocomplete="off" required>
                </div>
                <div>
					<input name="password" type="password"  id="password"  placeholder="Jelszó - minimum 8 karakter" minlength=8 required>
                </div>
                <button id="loginbtn" type="submit">Bejelentkezés</button>
                        
            </form>                
        </div>
		
		<div id="footer">
			<p>ÁSZF</p>
			<p>Impresszum</p>
			<p>Kapcsolat</p>
			<p>Copyright (c) </p>
		</div>	
	</body>
</html>
