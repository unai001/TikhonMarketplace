import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class DivisaService{
    constructor (private conexHttp:HttpClient){}

    getDivisaById(id:number):Observable<any>{
        return this.conexHttp.get(
            "/api/getDivisaById/"+id,{
              headers:new HttpHeaders({'Content-Type':'application/json'})
            }
          )
      }

      getAllDivisas():Observable<any>{
        return this.conexHttp.get(
          "/api/getAllDivisas",{
            headers:new HttpHeaders({'Content-Type':'application/json'})
          }
        )
      }
}
