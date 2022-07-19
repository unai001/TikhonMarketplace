<?php
$miDB = new mysqli("localhost","root","","tikhon"); 
$juego= file_get_contents("php://input");
$resultado=array();
if(!$miDB){
    $resultado=["error"=>$miDB->error];
    echo json_encode($resultado);
}
if(!$miDB->query('select * from producto where idSeccion =(select idSeccion from seccion where acronimo="'.$juego.'");')){
    $resultado=["error"=>$miDB->error];
    echo json_encode($resultado);
}

$query=$miDB->query('select * from producto where idSeccion =(select idSeccion from seccion where acronimo="'.$juego.'");');
$linea= $query->fetch_assoc();
while($linea!=null){
    array_push($resultado,["idProducto"=>$linea['idProducto'],"idUser"=>$linea['idUser'],"idSeccion"=>$linea["idSeccion"],"idOferta"=>$linea['idOferta'],"nombre"=>$linea["nombre"],"descripcion"=>$linea["descripcion"],"precioTotalstock"=>$linea['precioTotalstock'],"fechaPublicacion"=>$linea['fechaPublicacion'],"imagen"=>$linea["imagen"],"categoria"=>$linea["categoria"],"divisa"=>$linea["divisa"]]);
    $linea= $query->fetch_assoc();
}
echo json_encode($resultado);
?>