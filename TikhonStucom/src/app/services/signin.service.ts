import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../classes/user";

@Injectable()
export class SignInService{
    constructor(private http:HttpClient) { };

    addUser(user : User):Observable<any>{
        let url = "/api/addUser";
        let formData: FormData = new FormData();
        formData.append("usuario", user.usuario);
        formData.append("nombre", user.nombre);
        formData.append("apellidos", user.apellidos);
        formData.append("email", user.email);
        formData.append("fechaNacimiento", user.fechaNacimiento);
        formData.append("pais", user.pais);
        formData.append("password", user.password);
        return this.http.post(url, formData);
    }
}
