<?php
require_once('controlTokens.php');

// FUNCION DE CHEKEAR LA AUTENTICIDAD DEL TOKEN
function checkAuthToken(){  
    $headers = apache_request_headers();                                        
    if(isset($headers["authorization"]) && $headers["authorization"] !=""){     // EN EL CASO DE QUE EL HEADER DE AUTORIZACION EXISTA Y NO SEA NULO
    $token_recibido=$headers["authorization"];                                  // LE DOY A UNA VARIABLE EL RESULTADO

    if(jwtCheckCodeJSON($token_recibido)) {             // CHECKEAMOS EL TOKEN EN JSON
        return true;                                    // SI RETORNA TRUE, TODO BIEN
            }else{                                      // SI NO, RETORNAMOS FALSE
            return false;
        }
    }
}