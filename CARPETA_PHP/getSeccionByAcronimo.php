<?php
$miDB = new mysqli("localhost","root","","tikhon"); 
$nombre= file_get_contents("php://input");
$resultado=array();
if(!$miDB){
    $resultado=["error"=>$miDB->error];
    echo json_encode($resultado);
}
if(!$miDB->query('select * from seccion where acronimo = "'. $nombre .';"')){
    $resultado=["error"=>$miDB->error];
    echo json_encode($resultado);
}

$query=$miDB->query('select * from seccion where acronimo = "'. $nombre .'";');
$linea= $query->fetch_assoc();
while($linea!=null){
    array_push($resultado,["idSeccion"=>$linea['idSeccion'],"nombre"=>$linea["nombre"],"descripcion"=>$linea["descripcion"],"imagen"=>$linea["imagen"],"desarrollador"=>$linea["desarrollador"],"anoLanzamiento"=>$linea["anoLanzamiento"],"acronimo"=>$linea["acronimo"]]);
    $linea= $query->fetch_assoc();
}
echo json_encode($resultado);
?>