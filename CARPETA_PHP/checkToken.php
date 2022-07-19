<?php
require_once('controlTokens.php');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type,Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

$loginToken = $_POST['token'];                  // COJO EL TOKEN

$result = jwtCheckCodeJSON($loginToken);        // CHCKEO QUE SEA CORRECTO

$resposta = [];
if($result){                                    // DEL RESULTADO CONSULTO SI ES EL MISMO HASH O NO
    $resposta['ok']="Token Correcto";           
}else{
    $resposta['ok']="Token incorrecto";
}

echo json_encode($resposta);                    // Y DEVUELVO LA RESPUESTA