import { Divisa } from "./divisa";

export class Producto{
  idProducto:number=0;
  idUser:number=0;
  idSeccion:number=0;
  idOferta:number|null=0;
  nombre:string="";
  titulo:string="";
  descripcion:string="";
  precioTotalstock:number=0;
  fechaPublicacion:Date;
  imagen:string="";
  categoria:string="";
  divisa:Divisa;
  estado:string="";

  constructor(idProducto:number=0,idUser:number=0,idSeccion:number=0,idOferta:number|null=0,nombre:string="",descripcion:string="",titulo:string="",precioTotalstock:number=0,fechaPublicacion:Date,imagen:string="",categoria:string="",divisa:Divisa, estado:string=""){
    this.idProducto=idProducto;
    this.idUser= idUser;
    this.nombre=nombre;
    this.idSeccion=idSeccion;
    this.idOferta=idOferta;
    this.titulo=titulo;
    this.descripcion=descripcion;
    this.precioTotalstock=precioTotalstock;
    this.fechaPublicacion=fechaPublicacion;
    this.imagen=imagen;
    this.categoria=categoria;
    this.divisa=divisa;
    this.estado=estado;
  }

}
