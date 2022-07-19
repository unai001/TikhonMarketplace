import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Login } from "../classes/login";

@Injectable()
export class LoginService{
    constructor(private http:HttpClient) { };

    // FUNCION DE CONFIRMAR LOGIN
    /*checkLoginAjax(e:Login){                                    // PASAMOS LOS DATOS DE LOGIN
        let url = "CARPETA_PHP/login.php";          // DECIMOS DONDE LO CHCKEARA
        let formData: FormData = new FormData();                // CREO OBJETO FORMDATA
        formData.append("loginUser",JSON.stringify(e));         // LE AÑADO AL FORMDATA, CON EL NOMBRE LOGINUSER, UN JSON CON LOS DATOS DE LOGIN
        return this.http.post(url, formData);                   // RETORNA LA RESPUESTA DE MANDAR EL FORM DATA A LA URL
    }*/

    login(l:Login):Observable<any>{
      let url ="/api/login";
      let formData= new FormData();
      formData.append("usuario",l.user+"");
      formData.append("password",l.pass+"");
      return this.http.post(url,formData);
    }
    // FUNCION DE VERIFICAR TOKEN
    checkToken(token:string):Observable<any>{                                      // PASAMOS EL TOKEN COMO OBJETO TOKEN
        let url = "/api/checkToken";     // DECIMOS DONDE LO ENVIARA
        let formData: FormData = new FormData();                // CREAMOS OBJETO FORMDATA
        formData.append("token",token);                         // AÑADIMOS AL FORMDATA CON EL NOMBRE TOKEN EL TOKEN
        return this.http.post(url, formData);                   // RETORNA LA RESPUESTA DE MANDAR EL FORM DATA A LA URL
    }
}
