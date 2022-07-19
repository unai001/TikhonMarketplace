<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE"); 

$mysqli = new mysqli("localhost","root","","tikhon");                   // DECLARO EL OBJETO MYSQLI CON LOS DATOS
                        
if ($mysqli -> connect_errno) {                                         // EN EL CASO DE QUE DE ERROR DE CONEXION LO MUESTRA
    echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
    exit();
}

$sgninData = $_POST['user'];               // EN LOGIN DATA PONGO LOS DATOS DE USUARIO QUE LLEGAN
$sgninData = json_decode($sgninData);      // HACEMOS UN DECODE DEL JSON

$usuario = $sgninData->usuario;             //DEJAMOS EN CADA VARIABLE LO QUE TOCA
$password = $sgninData->password;          
$nombre = $sgninData->nombre;
$apellidos = $sgninData->apellidos;
$email = $sgninData->email;
$fechaNacimiento = $sgninData->fechaNacimiento;
$pais = $sgninData->pais;
$saldo = $sgninData->saldo;
$administrator = $sgninData->administrator;



$sql = "INSERT INTO `usuario`(`usuario`, `nombre`, `apellidos`, `e-mail`, `fechaNacimiento`, `pais`, `saldo`, `administrator`, `password`) VALUES ('$usuario','$nombre','$apellidos','$email','$fechaNacimiento','$pais','$saldo','$administrator','$password')";        // QUERY SQL INSERCION DE USUARIO
$result = $mysqli -> query($sql);       // RECIBO EL RESULTADO
echo json_encode($result);