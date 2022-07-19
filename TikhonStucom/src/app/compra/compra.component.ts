import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../classes/producto';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  juego: string | null = "";

  constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _productoService: ProductoService) { }

  productos: Array<Producto> = [];      // Declaracion del array donde se cargaran todos los productos

  ngOnInit(): void {

  }

  // Funcion que se ejecuta al dar clic a un producto
  comprarProducto(idProducto:number){                               // Recoge como parametro
   /* this._productoService.getProductoByID(idProducto).subscribe(    // Hace una peticion para que devuelva el producto en base a una id que mandamos
      (respuestaJuego)=>{
        this.juego=respuestaJuego                                   // Responde con el juego en el que se ha clicado comprar
      },
      (error) => {
        console.log(error)
      }
    );*/

  }
}
