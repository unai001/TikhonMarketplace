export class Juegos{
    idSeccion:number=0;
    nombre:string="";
    descripcion:string="";
    imagen:string="";
    imagenSecundaria:string="";
    fondo:string="";
    logo:string="";
    colorPrincipal:string="";
    colorSecundario:string="";
    popularidad:string="";
    desarrollador:string="";
    anoLanzamiento:string="";
    acronimo:string ="";

    constructor(idSeccion:number=0,acronimo:string="",nombre:string="",descripcion:string="",imagen:string="",desarrollador:string="",anoLanzamiento:string=""){
        this.idSeccion = idSeccion;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.desarrollador = desarrollador;
        this.anoLanzamiento = anoLanzamiento;
        this.acronimo = acronimo
    }
}
