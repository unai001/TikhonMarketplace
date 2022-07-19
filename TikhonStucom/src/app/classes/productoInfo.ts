export class ProductoInfo{
    idInfoProducto:number=0;
    usuario:string="";
    correo:string="";
    password:string="";
    secretAnswer:string="";
    codigo:string="";
    idProducto:number=0;

    constructor( idInfoProducto:number=0,usuario:string="",correo:string="",password:string="",secretAnswer:string="",codido:string="",idProducto:number=0){
        this.idInfoProducto = idInfoProducto;
        this.usuario = usuario;
        this.correo = correo;
        this.password = password;
        this.secretAnswer = secretAnswer;
        this.idProducto= idProducto;
    }
}
