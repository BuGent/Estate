<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $pass1 = $_POST["password"];
    $pass2 = $_POST["password2"];
            
    if(strcmp($pass1, $pass2) == 0){
        $data=parse_ini_file('/var/www/config/config.ini');
        $conn = new mysqli("db", $data['username'], $data['password'], $data['db']);
        if ($conn -> connect_error) {
            die ("Failed to connect to MySQL: " . $conn -> connect_error);
        }
                
        $lastname = $_POST["lastname"];
        $firstname = $_POST["firstname"];   
        $email = $_POST["email"];
        $pass = password_hash($_POST["password"], PASSWORD_BCRYPT);

        $sql="INSERT INTO Users (veznev, kernev, email, pass) VALUES ('$lastname','$firstname','$email','$pass')";
        mysqli_query ($conn, $sql);
                
        mysqli_close($conn);

        echo '<script type="text/javascript">alert("A regisztráció sikeres, bejelentkezhet!")</script>';
        echo '<script type="text/javascript">location.href = "http://localhost/login.php"</script>';
               
    }
    else{
        $passErr = "A jelszavak nem egyeznek";
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
			<a href="index.html">Kezdőlap</a>
			<a href="elado.html">Eladó ingatlanok</a>
			<a href="kiado.html">Kiadó ingatlanok</a>						
			<a href="login.php">Bejelentkezés</a>
			<a class="current_page_item" href="register.php">Regisztráció</a>			
		</div>

        <div class="register-login">                
            <form class="reglog-form" method="post">
                <h1>Regisztráció</h1>
                <div>
                    <input type="text"  id="lastname" name="lastname" pattern="[A-ZÖÜÓŐÚÉÁŰÍ]{1,1}[a-züóőúéáűí]{1,11}" title="Első nagy, többi kisbetű" placeholder="Vezetéknév" minlength=2 maxlength=12 autocomplete="off" required>
                    <input type="text"  id="firstname" name="firstname" pattern="[A-ZÖÜÓŐÚÉÁŰÍ]{1,1}[a-züóőúéáűí]{2,11}" title="Első nagy, többi kisbetű" placeholder="Keresztnév" minlength=3 maxlength=12 autocomplete="off" required>
                </div>
                <div>
                    <input type="email"  id="email" name="email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" autocomplete="off" required>
                </div>
                <div>
                    <input name="password" type="password"  id="password"  placeholder="Jelszó - minimum 8 karakter" minlength=8 required>
                </div>
                <div>
                    <input name="password2" type="password"  id="password2"  placeholder="Jelszó újra" minlength=8 required>
                </div>
                    <span class="error"> <?php echo $passErr; ?> </span>
                
                <h2>
                    Regisztrációmmal elfogadom a 
                    <a href="#" title="term of services">Felhasználási feltételek</a>-et
                </h2>
                
                <button id="registerbtn" type="submit">Regisztráció</button>                        
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