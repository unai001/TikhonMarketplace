<?php
$miDB = new mysqli("localhost","root","","tikhon"); 

$resultado = array();

if(!$miDB){
    $resultado=["error"=>$miDB->error];
    echo json_encode($resultado);
}

$idProducto = $_POST["idProducto"];

if(!$miDB->query('select * from producto where idProducto = '.$idProducto)){
    $resultado=["error"=>$miDB->error];
    echo json_encode($resultado);
}

$query = $miDB->query('select * from producto where idProducto = '.$idProducto);
$linea = $query->fetch_assoc();

while ($linea!=null){
    array_push($resultado,["idProducto"=>$linea['idProducto'],"idUser"=>$linea['idUser'],"idSeccion"=>$linea["idSeccion"],"idOferta"=>$linea['idOferta'],"nombre"=>$linea["nombre"],"descripcion"=>$linea["descripcion"],"precioTotalstock"=>$linea['precioTotalstock'],"fechaPublicacion"=>$linea['fechaPublicacion'],"imagen"=>$linea["imagen"],"categoria"=>$linea["categoria"],"divisa"=>$linea["divisa"]]);
    $linea = $query->fetch_assoc();
}
echo json_encode($resultado);