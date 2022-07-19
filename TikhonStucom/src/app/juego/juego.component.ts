import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../classes/producto';
import { Seccion } from '../classes/seccion';
import { CompraComponent } from '../compra/compra.component';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
  providers : [CompraComponent]
})
export class JuegoComponent implements OnInit {
  constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _productoService: ProductoService, private _compraComponent : CompraComponent ) { }

  juego: string | null = "";              // Declaro la variable juego
  productos: Array<Producto> = [];        // Declaro el array de productos
  seccion: Seccion = new Seccion();       // Declaro la seccion

  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe(     // Por active route
      (params) => {                           // Enganchamos los parametros
        this.juego = params.get("juego");     // Le damos a la variable juego el titulo del juego
        if (this.juego == null) {             // En el caso de que no sea nulo
        } else {
          this._productoService.getSeccionByAcronimo(this.juego+"").subscribe(              // Pide la seccion pasando un acronimo de esta por parametro
            (respuestaSeccion)=>{
              this.seccion=respuestaSeccion;
              this._productoService.getProductoByJuego(this.seccion.acronimo).subscribe(   // Pide los productos de un juego a partir del juego
                (respuestaProducto)=>{
                  this.productos=respuestaProducto;                                        // Ponemos en la variable de productos los productos del juego
                  console.log(respuestaProducto);
                },
                (error) => {
                  console.log(error);
                }
              );
            },
            (error) => {
              console.log(error);
            }
          );
        }
      }
    )
  }

  comprarProducto(idProducto:number){
    if (localStorage.getItem('nombreUsuario') == undefined) {     // En el caso de que el local storage tenga el usuario
      this._router.navigate(['/login']);
    }
    
  }

}
