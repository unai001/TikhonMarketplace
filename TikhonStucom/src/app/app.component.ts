import { Component, OnInit } from '@angular/core';
import { LogInComponent } from './log-in/log-in.component';
import { LoginService } from './services/login.service';
import { PerfilService } from './services/perfil.service';
import { ProductoService } from './services/producto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LogInComponent, LoginService, ProductoService, PerfilService]
})
export class AppComponent implements OnInit {
  title = 'TikhonStucom';
  displayName: any = "";              // Declaro la variable donde estara el nombre de usuario logueado
  logoffDiv: any = "";                // Declaro el div done estara el boton de logoff
  constructor(private _loginService:LoginService){}
  ngOnInit(): void {
    if (localStorage.getItem('nombreUsuario') != undefined && localStorage.getItem('idUser') != undefined ) {     // En el caso de que el local storage tenga el usuario
      localStorage.removeItem("nombreUsuario");    // Lo mismo con el nombre de usuario
      localStorage.removeItem("idUser");   // Lo displayeo
    }
    if(localStorage.getItem("clave") != undefined){
      this._loginService.checkToken(localStorage.getItem("clave")+"").subscribe(
        (resultado)=>{
          if(resultado.correcto){
            localStorage.setItem("nombreUsuario",resultado.usuario);
            localStorage.setItem("idUser",resultado.idUser);
            this.displayName=resultado.usuario;
          }
        },
        (error)=>{
          console.log(error);
        }
      )
    }


    // Control para mantener la fuente seleccionada aunque recargues la pagina
    var toggler = localStorage.getItem("dyslexicMode");
    if (toggler == "on") {
      let body = document.getElementsByTagName('body')[0];
      body.classList.add("bodyDyslexia")
    } else {
      let body = document.getElementsByTagName('body')[0];
      body.classList.remove("bodyDyslexia")
    }
  }

  // Funcion de logoff
  logOff() {
    localStorage.removeItem("clave");           // Borro el token del local storage
    localStorage.removeItem("nombreUsuario");    // Lo mismo con el nombre de usuario
    localStorage.removeItem("idUser");
    window.location.reload();                   // Y refresco la ventana
  }

  // Funcion que devuelve el nombre de usuario logueado
  readLocalStorageValue() {
    return localStorage.getItem('nombreUsuario')
  }

  //Funcion para cambiar la fuente de toda la pagina a una adaptada para personas con dislexia
  dyslexicMode() {
    var toggler = localStorage.getItem("dyslexicMode");

    if (toggler == "off") {
      localStorage.setItem("dyslexicMode", "on");
      let body = document.getElementsByTagName('body')[0];
      body.classList.add("bodyDyslexia")
    } else {
      localStorage.setItem("dyslexicMode", "off");
      let body = document.getElementsByTagName('body')[0];
      body.classList.remove("bodyDyslexia")
    }
  }

  carritoEmpty() {
    let user = localStorage.getItem('nombreUsuario');
    let carrito = JSON.parse(localStorage.getItem(user+'carrito')as any);
    if (carrito == null || carrito.length == 0) {
      return true;
    }else{
      return false;
    }
  }
}


