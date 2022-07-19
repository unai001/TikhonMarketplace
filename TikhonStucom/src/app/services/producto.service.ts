import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Producto } from "../classes/producto";
import { ProductoInfo } from "../classes/productoInfo";

@Injectable()
export class ProductoService{
  constructor(private conexHttp:HttpClient){}
  getSeccionByAcronimo(idSeccion:string):Observable<any>{
    return this.conexHttp.post(
      "/api/seccionByAcronimo",idSeccion,
      {
        headers:new HttpHeaders({'Content-Type':'application/json',"Access-Control-Allow-Origin":"*"})
      }
    )
  }
  getProductoByJuego(juego:string):Observable<any>{
    return this.conexHttp.post(
      "/api/productoByAcronimo",juego,
      {
        headers:new HttpHeaders({'Content-Type':'application/json'})
      }
    )
  }

  getAllProductos():Observable<any>{
    return this.conexHttp.get(
      "/api/allProductos",
      {
        headers:new HttpHeaders({'Content-Type':'application/json'})
      }
    )
  }


  postProducto(filesToUpload:FileList,producto:Producto, productoInfo:ProductoInfo):Observable<any>{
    let url = "/api/putProducto";
    let formData:FormData= new FormData();
    for(var i=0; i<filesToUpload.length;i++){
      let file = filesToUpload.item(i);
      if(file==null){
      }else{
        formData.append("imagen"+i,file,file.name);
      }
    }
    formData.append("nombre",producto.nombre);
    console.log(producto);
    formData.append("idUser",producto.idUser+"");
    formData.append("descripcion",producto.descripcion);
    formData.append("precio",producto.precioTotalstock+"");
    formData.append("categoria",producto.categoria);
    formData.append("divisa",producto.divisa.idDivisa+"");
    formData.append("idSeccion",producto.idSeccion+"");
    formData.append("usuario",productoInfo.usuario);
    formData.append("password",productoInfo.password);
    formData.append("secretAnswer",productoInfo.secretAnswer);
    formData.append("codigo",productoInfo.codigo);
    formData.append("correo",productoInfo.correo);
    return this.conexHttp.post(url,formData);
  }
  deleteProducto(producto:Producto):Observable<any>{
    return this.conexHttp.delete(
      "/api/deleteProducto/"+producto.idProducto, {
        headers:new HttpHeaders({'Content-Type':'application/json'})
      }
    )
  }
  getProductoById(id:number):Observable<any>{
    return this.conexHttp.get(
      "/api/getProducto/"+id,{
        headers:new HttpHeaders({'Content-Type':'application/json'})
      }
    )
  }
  getInfoProductoByProducto(id:number):Observable<any>{
    return this.conexHttp.get(
      "/api/getInfoProductoById/"+id,{
        headers:new HttpHeaders({'Content-Type':'application/json'})
      }
    )
  }

  updateProducto(filesToUpload:FileList|undefined,producto:Producto, productoInfo:ProductoInfo):Observable<any>{
    let url="/api/updateProducto";
    let formData:FormData= new FormData();
    if(filesToUpload===undefined){

    }else{
      for(var i=0; i<filesToUpload.length;i++){
        let file = filesToUpload.item(i);
        if(file==null){
        }else{
          formData.append("imagen"+i,file,file.name);
        }
      }
    }

    formData.append("idProducto",producto.idProducto+"");
    formData.append("nombre",producto.nombre);
    formData.append("descripcion",producto.descripcion);
    formData.append("precio",producto.precioTotalstock+"");
    formData.append("categoria",producto.categoria);
    formData.append("idSeccion",producto.idSeccion+"");
    formData.append("divisa",producto.divisa.idDivisa+"");
    formData.append("usuario",productoInfo.usuario);
    formData.append("password",productoInfo.password);
    formData.append("secretAnswer",productoInfo.secretAnswer);
    formData.append("codigo",productoInfo.codigo);
    formData.append("correo",productoInfo.correo);
    return this.conexHttp.post(
      url,formData
    )
  }
  getProductosByUserId(id:number):Observable<any>{
    return this.conexHttp.get(
      "/api/getProductosByUserId/"+id,{
        headers:new HttpHeaders({'Content-Type':'application/json'})
      }
    );
  }

  productTrade(idProducto:number, idUser:number):Observable<any>{
    console.log(idUser);
    let formData:FormData= new FormData();
    formData.append("idProducto",idProducto+"");
    formData.append("idUser",idUser+"");
    return this.conexHttp.post(
      "/api/productTrade", formData
    );
  }


}
