import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class JuegosService{
    constructor (private conexHttp:HttpClient){}
    
    getJuegos():Observable<any>{
        let url = "CARPETA_PHP/getJuegos.php";
        return this.conexHttp.get(url,
          {headers: new HttpHeaders({'Content-Type':'application/json'})}
          );
      }
}