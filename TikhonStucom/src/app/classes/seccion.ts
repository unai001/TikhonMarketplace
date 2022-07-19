export class Seccion{
  idSeccion:number=0;
  nombre:string="";
  descripcion:string="";
  imagen:string="";
  desarrollador:string="";
  anoLanzamiento:string="";
  acronimo:string="";
    constructor( idSeccion:number=0,nombre:string="",descripcion:string="", imagen:string="", desarrollador:string="", anoLanzamiento:string="",acronimo:string=""){
    this.idSeccion=idSeccion;
    this.nombre=nombre;
    this.descripcion=descripcion;
    this.imagen=imagen;
    this.desarrollador=desarrollador;
    this.anoLanzamiento=anoLanzamiento;
    this.acronimo=acronimo;
  }
}
