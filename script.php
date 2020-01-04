<?php
$servername="localhost";
$username="root";
$password="";

$conn=mysql_connect($servername,$username,$password);
if(!$conn)
{
	die("Connection Failed".mysql_error());
}
else
	echo "Connection Successful<br>";
//selecting database
$dbcheck=mysql_select_db("images");

if(!$dbcheck)
{
	echo "Error selecting DB".mysql_error();
}
else echo "Database Selected<br>";

// Requires php5   
define('UPLOAD_DIR', 'images/');   
$img = $_POST['imgBase64'];   
$img = str_replace('data:image/webp;base64,', '', $img);   
$img = str_replace(' ', '+', $img);   
$data = base64_decode($img);   
$file = UPLOAD_DIR . uniqid() . '.png';   
$success = file_put_contents($file, $data);   
print $success ? $file : 'Unable to save the file.';  

mysql_close($conn); 
?>   