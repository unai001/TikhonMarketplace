import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Divisa } from '../classes/divisa';
import { Producto } from '../classes/producto';
import { ProductoInfo } from '../classes/productoInfo';
import { Seccion } from '../classes/seccion';
import { DivisaService } from '../services/divisa.service';
import { LoginService } from '../services/login.service';
import { ProductoService } from '../services/producto.service';
import { SeccionService } from '../services/secciones.service';

@Component({
  selector: 'app-subir-producto',
  templateUrl: './subir-producto.component.html',
  styleUrls: ['./subir-producto.component.css'],
  providers: [SeccionService, ProductoService, DivisaService, LoginService]
})
export class SubirProductoComponent implements OnInit {
  allSections: any = [];

  constructor(private _seccionService: SeccionService, private _productoService: ProductoService,private _divisaService: DivisaService, private _loginService: LoginService, private _router: Router) { }
  secciones!: Array<Seccion>;
  nombre: string = "";
  descripcion: string = "";
  precio: number = 0;
  divisa!: number;
  categoria: string = "";
  seccion: number = 0;
  filesToUpload: any;
  divisas! : Array<Divisa>;


  userLog: string = "";
  correo: string = "";
  contra: string = "";
  secretAnswer: string = "";
  codigo:string="";

  correcto:boolean=false;
  ngOnInit(): void {
    if (localStorage.getItem('clave') != undefined) {     // En el caso de que el local storage tenga el usuario
      this._loginService.checkToken(localStorage.getItem('clave')+"").subscribe(
        (resultado)=>{
          if(resultado.correcto){
            this._seccionService.getAllSecciones().subscribe(
              (result) => {
                console.log(result);
                this.secciones = result;
                this._divisaService.getAllDivisas().subscribe(
                  (resultado)=>{
                    this.divisas= resultado;
                    console.log(this.divisas);
                  },
                  (error)=>{
                    console.log(error);
                  }
                )
              },
              (error) => {
                console.log(error)
              }
            )
          }else{
            this._router.navigate(['/login']);
          }

        },
        (error) => {
          console.log(error);
        }
      )
  }else{
    this._router.navigate(['/login']);
  }
}
  handleFileInput(evt: Event) {
    const element = evt.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    this.filesToUpload = fileList;
  }
  subirProducto() {
    console.log("Esta entrando al post");
    let idUser = Number.parseInt(localStorage.getItem("idUser") + "");
    let producto = new Producto(0, idUser, this.seccion, null, this.nombre, this.descripcion, "", this.precio, new Date(), "", this.categoria, new Divisa(this.divisa));
    producto.idUser = idUser;
    let infoProducto=  new ProductoInfo(0, this.userLog, this.correo, this.contra, this.secretAnswer,this.codigo ,0);
    infoProducto.codigo= this.codigo;
    this._productoService.postProducto(this.filesToUpload, producto, infoProducto).subscribe(
      (result) => {
        if (result.correcto) {
          location.reload();
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  controlSubirProducto(){
      console.log(this.categoria);
      switch(this.categoria){
        case "Cuenta":
          if( this.userLog == "" ||
          this.correo == "" ||
          this.contra == "" ||
          this.secretAnswer == "" ||
          this.nombre=="" ||
          this.descripcion == ""||
          this.precio == 0 ||
          this.divisa==0 ||
          this.seccion == 0){
            this.correcto=false;
          }else{
            this.correcto=true;
          }
          console.log("nombre:"+ (this.nombre==""));
          console.log("descripcion:"+ (this.descripcion == ""));
          console.log("precio:"+(this.precio == 0));
          console.log("divisa:"+(this.divisa==0));
          console.log("seccion:"+(this.seccion == 0));
          console.log("usuario:"+(this.userLog==""));
          console.log("correo"+(this.correo==""));
          console.log("password"+(this.contra==""));
          console.log("secretAnswer"+(this.secretAnswer==""));
          break;
        case "Skin":
          if( this.userLog == "" ||
          this.correo == "" ||
          this.nombre=="" ||
    this.descripcion == ""||
    this.precio == 0 ||
    this.divisa==0 ||
    this.seccion == 0){
            this.correcto=false;
          }else{
            this.correcto=true;
          }
          console.log("nombre:"+ (this.nombre==""));
          console.log("descripcion:"+ (this.descripcion == ""));
          console.log("precio:"+(this.precio == 0));
          console.log("divisa:"+(this.divisa==0));
          console.log("seccion:"+(this.seccion == 0));
          console.log("usuario:"+(this.userLog==""));
          console.log("correo"+(this.correo==""));
          break;
        case "Codigo":
          if( this.codigo == "" ||
          this.nombre=="" ||
    this.descripcion == ""||
    this.precio == 0 ||
    this.divisa==0 ||
    this.seccion == 0 ){
            this.correcto=false;
          }else{
            this.correcto=true;
          }
          console.log("nombre:"+ (this.nombre==""));
          console.log("descripcion:"+ (this.descripcion == ""));
          console.log("precio:"+(this.precio == 0));
          console.log("divisa:"+(this.divisa==0));
          console.log("seccion:"+(this.seccion == 0));
          console.log("codigo:"+(this.codigo==""));
          break;
      }
    console.log(this.correcto);
  }

}
