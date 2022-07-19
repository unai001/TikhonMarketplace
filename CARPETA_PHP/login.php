<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE"); 

require_once("controlTokens.php");

$mysqli = new mysqli("localhost","root","","tikhon");                   // DECLARO EL OBJETO MYSQLI CON LOS DATOS
                        
if ($mysqli -> connect_errno) {                                         // EN EL CASO DE QUE DE ERROR DE CONEXION LO MUESTRA
    echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
    exit();
}

$loginData = $_POST['loginUser'];               // EN LOGIN DATA PONGO LOS DATOS DE USUARIO QUE LLEGAN
$loginData = json_decode($loginData);           // HACEMOS UN DECODE DEL JSON

$user = $loginData->user;           //DEJAMOS EN CADA VARIABLE LO QUE TOCA
$pass = $loginData->pass;

$sql = "SELECT * FROM usuario WHERE nombre = '$user' && password = '$pass'";        // QUERY SQL DEL USUARIO Y CONTRASEÑA

$result = $mysqli -> query($sql);       // RECIBO EL RESULTADO
$r = $result->fetch_assoc();            // LO PONEMOS POR ROWS

$response = [];                             // DECLARO LA RESPUESTA PARA USARLA MAS TARDE
if($r){                                     // SI NO ES NULA
    $userToken = jwtGetCodeJSON($user);     // COJO EL TOKEN CON EL USUARIO ASIGNADO
    $response['ok']="correcto";             // PONGO EN RESPUESTA EN LA POSICION OK, CORRECTO    
    $response['token']=$userToken;          // Y EN LA POSICION TOKEN, EL TOKEN
    $response['usuario'] = $r['usuario'];    // Y EN LA POSICION USUARIO, EL USUARIO
    $response['idUser']= $r['idUser'];
}else{
    $response['ok']="incorrecto";           // SI NO, PUES PONGO QUE ES INCORRECTO    
}
echo json_encode($response);