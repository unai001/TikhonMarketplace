<?php
$miDB= new mysqli("localhost","root","","tikhon");
$idUser= file_get_contents("php://input");
$resultado = "";

if(!$miDB){
    $resultado=["error"=>$miDB->error];
    echo json_encode($resultado);
}
if(!$miDB->query('select * from usuario where idUser ='.$idUser)){
    $resultado=["error"=>$miDB->error];
    echo json_encode($resultado);
}


$queryUsuario= $miDB->query('select * from usuario where idUser ='.$idUser);            // Hacemos una consulta que nos devuelve todo lo relacionado con un usuario mediante su ID
$lineaUsuario= $queryUsuario->fetch_assoc();

while($lineaUsuario!=null){                                            // Devolvemos un array con todos los parametros
    $resultado=[
    "idUser"=>$lineaUsuario['idUser'],
    "usuario"=>$lineaUsuario['usuario'],
    "nombre"=>$lineaUsuario['nombre'],
    "apellidos"=>$lineaUsuario['apellidos'],
    "fechaNacimiento"=>$lineaUsuario['fechaNacimiento'],
    "pais"=>$lineaUsuario['pais'],
    "saldo"=>$lineaUsuario['saldo'],
    "administrador"=>$lineaUsuario['administrator'],
    "password"=>$lineaUsuario['password'],
    "productos"=>array()
];
    $lineaUsuario= $queryUsuario->fetch_assoc();
}

// En el caso de que de error devolvera el error
if(!$miDB->query('select * from producto inner join usuario on producto.idUser = usuario.idUser where usuario.idUser='.$idUser)){
    $resultado=["error"=>$miDB->error];
    echo json_encode($resultado);
}

// Hacemos query de los productos que tiene el usuario seleccionado
$queryProducto= $miDB->query('select * from producto inner join usuario on producto.idUser = usuario.idUser where usuario.idUser='.$idUser);
$lineaProducto= $queryProducto->fetch_assoc();

while($lineaProducto!=null){                                // Y guardamos en un array de productos, los productos que tiene ese usuario
    array_push(
        $resultado["productos"],
        ["idProducto"=>$lineaProducto['idProducto'],
        "idUsexr"=>$lineaProducto['idUser'],
        "idSeccion"=>$lineaProducto["idSeccion"],
        "idOferta"=>$lineaProducto['idOferta'],
        "titulo"=>$lineaProducto["titulo"],
        "descripcion"=>$lineaProducto["descripcion"],
        "precioTotalstock"=>$lineaProducto['precioTotalstock'],
        "fechaPublicacion"=>$lineaProducto['fechaPublicacion'],
        "imagen"=>$lineaProducto["imagen"],
        "categoria"=>$lineaProducto["categoria"],
        "divisa"=>$lineaProducto["divisa"]
    ]);
    $lineaProducto= $queryProducto->fetch_assoc();
}
echo json_encode($resultado);
?>