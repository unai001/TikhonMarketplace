<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE"); 

// PLANTILLA PARA IR COPIANDO Y PEGANDO EN LOS DIFERENTES ARCHIVOS PHP PARA HACER CONSULTAS Y DEMAS
$mysqli = new mysqli("localhost","root","","tikhon");

if ($mysqli -> connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
    exit();
}

$sql = "SELECT * FROM usuario";
$result = $mysqli -> query($sql);

$response = [];

while ($row = $result->fetch_assoc()) {
    $response[] = $row;
}

echo json_encode($response);