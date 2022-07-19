import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../classes/producto';
import { User } from '../classes/user';
import { DialogEditarUsuarioComponent } from '../dialog-editar-usuario/dialog-editar-usuario.component';
import { EditarProductoComponent } from '../editar-producto/editar-producto.component';
import { LoginService } from '../services/login.service';
import { PerfilService } from '../services/perfil.service';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-area-personal',
  templateUrl: './area-personal.component.html',
  styleUrls: ['./area-personal.component.css'],
  providers:[ProductoService,LoginService]
})
export class AreaPersonalComponent implements OnInit {

  constructor(private _activeRoute: ActivatedRoute, private _router: Router,private _perfilService: PerfilService,public dialog: MatDialog, public _productoService:ProductoService,private _loginService:LoginService) { }

  // Declaracion de las variables de usuario para poder cambiarlas en la seccion update
  usuario!: User;
  nuevoUsuario!: string;
  nuevoNombre!: string;
  nuevosApellidos!: string;
  nuevoEmail!: string;
  nuevaFecha!: string;
  nuevoPais!: string;
  nuevaPassword!: string;
  nuevaPasswordRepetida!: string;
  modificado = false;
  passwordCorrecta = false;
  productosActivos:number = 0;
  saldo:number = 0;

  ngOnInit(): void {
    
    // Funcion para pedir login en la pagina en caso de que no estes logueado
    if (localStorage.getItem('clave') != undefined) {     // En el caso de que el local storage tenga el usuario
      this._loginService.checkToken(localStorage.getItem('clave')+"").subscribe(
        (resultado)=>{
          if(resultado.correcto){
            this._perfilService.getUsuarioWithProductosById().subscribe(                // Pide los productos de un usuario a traves de su id
            (respuesta) => {
              this.usuario = respuesta;
              console.log(this.usuario);
              this.nuevoUsuario = this.usuario.usuario;
              this.nuevoNombre = this.usuario.nombre;
              this.nuevosApellidos = this.usuario.apellidos;
              this.nuevoEmail = this.usuario.email;
              this.nuevaFecha = this.usuario.fechaNacimiento;
              this.nuevoPais = this.usuario.pais;
              this.nuevaPassword = this.usuario.password;
              this.nuevaPasswordRepetida = this.usuario.password;
              this.saldo = this.usuario.saldo;
              this._productoService.getProductosByUserId(this.usuario.idUser).subscribe(
                (resultado)=>{
                  this.usuario.productos=resultado;
                  console.log(this.usuario.productos);
                  this.productosActivos = this.usuario.productos.length;
                },
                (error)=>{
                  console.log(error);
                }
              )
            },
            (error) => {
              console.log(error);
            }
          )
          }else{
            this._router.navigate(['/login']);
          }
        },
        (error)=>{
          console.log(error);
        }
      );
    }else{
      this._router.navigate(['/login']);
    }


    // Metodo para cargar todos los productos que tiene el usuario que esta logueado

  }

  // Metodo de control de errores en la seccion de cambiar datos de un usuario
  controlActualizar() {
    if (this.nuevoUsuario == this.usuario.usuario &&            // En caso de que NO se haya modificado algun campo
      this.nuevoNombre == this.usuario.nombre &&
      this.nuevosApellidos == this.usuario.apellidos &&
      this.nuevoEmail == this.usuario.email &&
      this.nuevaFecha == this.usuario.fechaNacimiento &&
      this.nuevoPais == this.usuario.pais &&
      this.nuevaPassword == this.usuario.password &&
      this.nuevaPasswordRepetida == this.usuario.password) {
      this.modificado = false;                                // Devuelve falso
    } else {
      this.modificado = true;                                 // Si se ha modifiado algo, devolvera true
    }

    if (this.nuevaPassword != this.nuevaPasswordRepetida) {   // En caso de que las contraseñas sean diferentes
      this.passwordCorrecta = false                           // Lo indica en un booleano
    } else {
      this.passwordCorrecta = true;
    }
  }

  //Funcion para abrir el dialog de confirmar los datos modificados
  openDialog() {
    // Displayea todos los datos modificados
    const dialogEditarUsuarioRef = this.dialog.open(DialogEditarUsuarioComponent, {
      // Edita los campos modificados
      data: { nuevosDatos: new User(this.nuevoUsuario, this.nuevoNombre, this.nuevosApellidos, this.nuevoEmail, this.nuevaFecha, this.nuevoPais, this.usuario.saldo, this.usuario.administrator, this.nuevaPassword), usuario: this.usuario }
    });

    dialogEditarUsuarioRef.afterClosed().subscribe(result => {
      location.reload();                                            // Una vez se haya modificado se recarga la pagina
    });
  }
  borrarProducto(producto:Producto){
    this._productoService.deleteProducto(producto).subscribe(
      (respuesta)=>{
        if(respuesta.correcto){
          location.reload();
        }
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  openDialogEditar(idProducto: number){
    const dialogoEditarProductoRef = this.dialog.open(EditarProductoComponent,{
      data:{ "idProducto":idProducto}
    });
    dialogoEditarProductoRef.afterClosed().subscribe(result => {
      console.log(result);
     // location.reload();
    });
  }

  getDate(producto: Producto): String {
    let stringData = JSON.parse(JSON.stringify(producto.fechaPublicacion))[
      'date'
    ];
    let date = new Date(stringData);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();

    return year+"-"+month+"-"+day;
  }


}
