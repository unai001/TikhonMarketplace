import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class SectionService{
    constructor (private conexHttp:HttpClient){}

    getAllSecciones():Observable<any>{
      return this.conexHttp.get("/api/getAllSecciones");
    }
    
    getAllSections():Observable<any>{
        return this.conexHttp.get(
          "/api/allSecciones",
          {
            headers:new HttpHeaders({'Content-Type':'application/json'})
          }
        )
      }

      getSectionById(id:number):Observable<any>{
        return this.conexHttp.post(
          "/api/getSeccionById", id,
          {
            headers:new HttpHeaders({'Content-Type':'application/json'})
          }
        )
      }

      getProductsBySeccionId(id:number):Observable<any>{;
        return this.conexHttp.post(
          "/api/getProductsBySeccionId", id,
          {
            headers:new HttpHeaders({'Content-Type':'application/json'})
          }
        )
      }
}