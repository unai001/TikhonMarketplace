import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../classes/user";

@Injectable()
export class PerfilService{
  constructor(private conexHttp:HttpClient){}
  idUser:string | null=""                            // Declaramos un usuario

  // metodo que devuelve los productos del usuario logueado
  getUsuarioWithProductosById():Observable<any>{
    if(localStorage.getItem("idUser")!=undefined || localStorage.getItem("idUser")!=""){    // En el caso de que en el localstorage, haya IDUser
      this.idUser= localStorage.getItem("idUser");                                          // Lo guardamos en una variable
    }
    return this.conexHttp.post(
      "/api/getFullUsuarioById",this.idUser,{
        headers:new HttpHeaders({'Content-Type':'application/json'})
      }
    )
  }
  updateInfoUsuario(usuario:User):Observable<any>{
    if(localStorage.getItem("idUser")!=undefined || localStorage.getItem("idUser")!=""){
      this.idUser= localStorage.getItem("idUser");
    }
    const body=
    {
      "idUser":this.idUser,
      "usuario":usuario
    };
    return this.conexHttp.put(
      "/api/updateUser",body,{
        headers:new HttpHeaders({'Content-Type':'application/json'})
      }
    );

  }

  getUsuarioById(id:number):Observable<any>{
    return this.conexHttp.post(
      "/api/getFullUsuarioById",id,{
        headers:new HttpHeaders({'Content-Type':'application/json'})
      }
    )
  }
}
