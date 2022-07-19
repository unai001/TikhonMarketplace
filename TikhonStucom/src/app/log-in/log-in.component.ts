import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Login } from "../classes/login";
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  providers: [LoginService]
})
export class LogInComponent implements OnInit, OnDestroy {

  constructor(private _router: Router, private _acitvRoute: ActivatedRoute, private _loginService: LoginService) { }
  ngOnDestroy(): void {           // Al destruir la variable de localstorage del usuario
    if(this.salir==true){
      window.location.reload()    // Se reinicia la pagina
    }
  }

  ngOnInit(): void {

  }

  loginUser = "";         // Declaro el usuario y la contraseña
  loginPassword = "";
  salir=false;            // Declaro variable que indicara cuando haga log out

  // Funcion de loguearse
  loginFunction(option:number,user?:string,password?:string):void {
    var logCredentials;
    if (option == 0) {
      logCredentials = new Login(this.loginUser, this.loginPassword);
    }else{
      logCredentials = new Login(user!, password!);
    }
    this._loginService.login(logCredentials).subscribe(
      (resultado)=>{
        if(resultado.correcto){
          localStorage.setItem("clave",resultado.token);
          localStorage.setItem("nombreUsuario",resultado.usuario);
          localStorage.setItem("idUser",resultado.idUser);
          this.salir=true;
          this.setCarrito();
          this._router.navigate(["/"]);
        }else{
          window.alert("Credenciales incorrectos");
        }
      },
      (error)=>{
        console.log(error);
      }
    );
   /*      // Declaro una constante de los credenciales y creo un objeto login
    this._loginService.checkLoginAjax(logCredentials).subscribe(              // Ejecuto la funcion de ajax que chequea si los datos estan bien
      (data) => {                                                             // La data que me devuelve
        let ok = JSON.parse(JSON.stringify(data))["ok"];                      // la dejo en una variable y parseo a Json
        if(ok == "correcto"){                                                 // En el caso de que OK valga correcto
            let token = JSON.parse(JSON.stringify(data))["token"];                                // Declaro el token y le doy el valor que devuelva
            localStorage.setItem("clave",token);                                                  // La guardo en localStorage
            localStorage.setItem('nombreUsuario',JSON.parse(JSON.stringify(data))['usuario']);
            localStorage.setItem('idUser',JSON.parse(JSON.stringify(data))['idUser']);            // Junto al nombre de usuario
            this.salir=true;         
            this.setCarrito();                                                             // Salir es true y recargara la pagina
            this._router.navigate(["/"]);
                                                                    // Y redirigimos a main
            

        }else{
            window.alert("Credenciales incorrectos");         // En el caso de que no, significa que los credenciales son erroneos
        }
      }, (error) => {console.log(error) }
    )*/
  }
  setCarrito(){
  let  user = localStorage.getItem('nombreUsuario');
    if(localStorage.getItem(user+'carrito') == null){
      localStorage.setItem(user+'carrito', JSON.stringify(new Array()));
    }
  }
}
