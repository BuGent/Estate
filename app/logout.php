<?php
session_start();
echo '<script type="text/javascript">alert("Sikeres kijelentkezés, várjuk vissza!")</script>';
session_destroy();	
echo '<script type="text/javascript">location.href = "http://localhost/index.html"</script>';
?>
