import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Juegos } from '../classes/juegos';
import { Producto } from '../classes/producto';
import { JuegosService } from '../services/juegos.service';
import { ProductoService } from '../services/producto.service';
import { SectionService } from '../services/section.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [SectionService, ProductoService]
})
export class MainComponent implements OnInit {

  constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _productoService: ProductoService, private _sectionService: SectionService,
    ) { }

  juegos:Array<Juegos> = [];
  allProductos: Array<Producto> = [];

  ngOnInit(): void {
    // Pedimos todos los juegos para poder hacer el carrousel
    this._sectionService.getAllSecciones().subscribe(
      (respuestaJuegos) => {
        this.juegos = respuestaJuegos;
      },
      (error) => {
        console.log(error)
      }
    );
// Para guardar todos los productos de la base de datos
this._productoService.getAllProductos().subscribe(      // Pide todos los productos de cualquier juego
(respuesta) => {      
  this.allProductos = respuesta;
  console.log(this.allProductos);                      // Guardamos en el array de todos los productos la respuesta
  this.getOfertas();                                                     // Y lo mismo en aux para tener una copia
},
(error) => {
  console.log(error);
}
);
  }
  getOfertas() {
    //mostramos solo las ofertas
      let ofertas: any = [];
      this.allProductos.forEach((element) => {
        if (element.idOferta != null) {
          ofertas.push(element);
          this.allProductos = ofertas;
        }
      });
  }

  }
