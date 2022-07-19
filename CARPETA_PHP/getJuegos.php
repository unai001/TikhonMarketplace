<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE"); 

$mysqli = new mysqli("localhost","root","","tikhon"); 

if ($mysqli -> connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
    exit();
}

$sql = "SELECT * FROM seccion";
$result = $mysqli -> query($sql);

$respuesta = [];

while ($row = $result->fetch_assoc()) {
    $respuesta[] = $row;
}

echo json_encode($respuesta);
?>