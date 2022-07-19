import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../classes/producto';
import { Seccion } from '../classes/seccion';
import { ProductoService } from '../services/producto.service';
import { SeccionService } from '../services/secciones.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ProductoInfo } from '../classes/productoInfo';
import { Divisa } from '../classes/divisa';
import { DivisaService } from '../services/divisa.service';


@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css'],
  providers:[SeccionService,ProductoService,DivisaService,{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { displayDefaultIndicatorType: false }
  }]
})
export class EditarProductoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private _seccionService:SeccionService, private _productoService:ProductoService,private _divisaService: DivisaService) { }

    producto!:Producto;
    infoProducto!:ProductoInfo;
    secciones!:Array<Seccion>;
    nombre:string ="";
    descripcion:string = "";
    precio:number = 0;
    divisa!:number;
    categoria:string = "";
    seccion:number = 0;
    filesToUpload:any;
    divisas!:Array<Divisa>;

    userLog:string = "";
    correo:string = "";
    contra:string = "";
    secretAnswer:string = "";
    codigo:string="";
    modificado:boolean=false;
  ngOnInit(): void {
    console.log(this.data.idProducto);
    this._productoService.getProductoById(this.data.idProducto).subscribe(
      (resultado)=>{
        this.producto=resultado;
        this.nombre=this.producto.nombre;
        this.descripcion=this.producto.descripcion;
        this.precio=this.producto.precioTotalstock;
        this.categoria=this.producto.categoria;
        this.seccion=this.producto.idSeccion;
        this._productoService.getInfoProductoByProducto(this.data.idProducto).subscribe(
          (resultado2)=>{
            this.infoProducto=JSON.parse(resultado2);
            console.log(this.infoProducto);
            this.userLog = this.infoProducto.usuario;
            this.correo = this.infoProducto.correo;
            this.contra = this.infoProducto.password;
            this.secretAnswer = this.infoProducto.secretAnswer;
            this.codigo= this.infoProducto.codigo;
            this._seccionService.getAllSecciones().subscribe(
              (result)=>{
                console.log(result);
                this.secciones=result;
                this._divisaService.getAllDivisas().subscribe(
                  (resultado3)=>{
                    this.divisas= resultado3;
                    this.divisa= this.producto.divisa.idDivisa;
                    console.log(this.divisa==this.producto.divisa.idDivisa);
                  },
                  (error)=>{
                    console.log(error);
                  }
                )
              },
              (error)=>{
                console.log(error)
              }
            )
          },
          (error)=>{
            console.log(error)
          }
        )

      },
      (error)=>{
        console.log(error);
      }
    )

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  handleFileInput(evt:Event){
    const element = evt.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    this.filesToUpload = fileList;
  }
  controlActualizar(){
    if(this.nombre==this.producto.nombre &&
      this.descripcion==this.producto.descripcion &&
      this.precio==this.producto.precioTotalstock &&
      this.categoria==this.producto.categoria &&
      this.seccion==this.producto.idSeccion &&
      this.divisa == this.producto.divisa.idDivisa &&
      this.userLog == this.infoProducto.usuario &&
      this.correo == this.infoProducto.correo &&
      this.contra == this.infoProducto.password &&
      this.secretAnswer == this.infoProducto.secretAnswer &&
      this.codigo== this.infoProducto.codigo){
        this.modificado=false
      }else{
        this.modificado=true;
      }
  }
  modificar(){
    this.producto.nombre=this.nombre;
    this.producto.descripcion=this.descripcion;
    this.producto.precioTotalstock=this.precio;
    this.producto.categoria=this.categoria;
    this.producto.idSeccion=this.seccion;
    this.producto.divisa.idDivisa=this.divisa;
    this.infoProducto.usuario=this.userLog;
    this.infoProducto.correo=this.correo;
    this.infoProducto.password=this.contra;
    this.infoProducto.secretAnswer=this.secretAnswer;
    this.infoProducto.codigo=this.codigo;

    this._productoService.updateProducto(this.filesToUpload,this.producto,this.infoProducto).subscribe(
      (result)=>{
        console.log(result);
        if(result.correcto){
          alert("El producto se ha modificado correctamente");
          location.reload();
        }
      },
      (error)=>{
        console.log(error);
        this.dialogRef.close();
      }
    )
  }
}
