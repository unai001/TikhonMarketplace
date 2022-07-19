import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class SeccionService{
  constructor(private conexHttp:HttpClient){}
  getAllSecciones():Observable<any>{
    return this.conexHttp.get("/api/getAllSecciones");
  }
}
