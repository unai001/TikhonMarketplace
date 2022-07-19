<?php
// FUNCION CREACION JSON
function jwtGetCodeJSON($contenido){                                                    // PASO EL CONTENIDO A TRAVES DEL CUAL HARA EL HASH
    $header = base64_encode(json_encode(array('alg' => 'HS256', 'typ' => 'JWT')) );     // LO HASHEAMOS CON BASE64
    $payload = base64_encode($contenido);                       
    $secret_key = 'clave secreta';              
    $signature = base64_encode(hash_hmac('sha256', $header . '.' . $payload, $secret_key, true));
    $jwt_token = $header . '.' . $payload . '.' . $signature;   // AQUI CONCATENO EL TOKEN
    return $jwt_token;                                          // Y LO DEVUELVO
}

// FUNCION PARA CHCKEAR QUE EL TOKEN ES CORRECTO
function jwtCheckCodeJSON($jwt_token){
    $secret_key = 'clave secreta';                  // PASO LA KEY
    $jwt_values = explode('.', $jwt_token);         // LA SEPARO

    $header =$jwt_values[0] ;                       // EN 3 VARIABLES
    $payload = $jwt_values[1];
    $signature = $jwt_values[2];

    $resultedsignature = base64_encode(hash_hmac('sha256', $header . '.' . $payload , $secret_key, true));

    if($resultedsignature == $signature){           // SI EL HASH ES EL MISMO RETORNAMOS TRUE, SINO FALSE
        return true; 
    } else { 
        return false; 
    }
}
?>