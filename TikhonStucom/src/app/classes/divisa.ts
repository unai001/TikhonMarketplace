export class Divisa{

    idDivisa:number=0;
    nombre:string="";
    simbolo:string="";
    valor:number=0;


    constructor(id:number=0, nombre:string="", simbolo:string="", valor:number=0){
        this.idDivisa = id;
        this.nombre = nombre;
        this.simbolo = simbolo;
        this.valor = valor;
    }
}
