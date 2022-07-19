import { Producto } from "./producto";

export class User{
    idUser: number=0;
    usuario: string="";
    nombre: string="";
    apellidos: string="";
    email: string="";
    fechaNacimiento: string="";
    pais: string="";
    saldo: number= 0;
    administrator: boolean=false;
    password: string="";
    productos:Array<Producto>=[];
    constructor(usuario: string, nombre: string,apellidos: string, email: string, fechaNacimiento: string, pais: string, saldo: number,administrator: boolean, password: string, productos:Array<Producto>=[]){
        this.usuario = usuario;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
        this.pais = pais;
        this.saldo = saldo;
        this.administrator =administrator;
        this.password = password;
        this.productos= productos;
    }

}
