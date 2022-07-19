import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../classes/producto';
import { Seccion } from '../classes/seccion';
import { ProductoService } from '../services/producto.service';
import { SeccionService } from '../services/secciones.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SeccionService, ProductoService],
})
 
export class SearchComponent implements OnInit {

                                                                                  // declaracion de variables
  allProductos: Array<Producto> = [];                                             // Array donde iran los productos del filtro
  aux: Array<Producto> = [];                                                      // Array copia de los productos
  search: String = ``;                                                            // String donde estara lo que busques
  selSection = -1;                                                                // Int para seleccionar una seccion
  selOther ='Mas recientes';                                                              // Para ir al ultimo
  selCat = 'all';                                                                 // Seleccionar todos
  allSections: any = [];                                                          // Array con todas las secciones
  categories: string[] = [];                                                      // Array con las categorias
  filters = ['Mas recientes','Precio mas alto', 'Precio mas bajo', 'Ofertas', 'Mas antiguos'];    // Array con diferentes filtros de ordenacion

  constructor(
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _productoService: ProductoService,
    private SeccionService: SeccionService
  ) {}

  ngOnInit(): void {
    
    // Para guardar todos los productos de la base de datos
    this._productoService.getAllProductos().subscribe(      // Pide todos los productos de cualquier juego
      (respuesta) => {      
        this.allProductos = respuesta;  
        console.log(this.allProductos);                    // Guardamos en el array de todos los productos la respuesta
        this.aux = respuesta;                               // Y lo mismo en aux para tener una copia
        this.getAllCategories();
        this.ordenarPorFechaAsc();                           // Y todas las categorias disponibles
      },
      (error) => {
        console.log(error);
      }
    );

    // Para tener todas las secciones (juegos) disponibles
    this.SeccionService.getAllSecciones().subscribe(
      (respuesta) => {
        this.allSections = respuesta;     // Hacemos la peticion y la guardamos en el array de secciones
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Metodo para buscar a traves de un parametro
  buscar(param: string) {
    let search1 = this.search.replace(/ /g, '').split('');
    let lnth = search1.length;
    let search2 = param.replace(/ /g, '').split('');
    if (
      search1.slice(0, lnth).toLocaleString().toUpperCase() ==
      search2.slice(0, lnth).toLocaleString().toUpperCase()
    ) {
      return true;
    } else {
      return false;
    }
  }

  getAllCategories() {
    let allCategories: string[] = [];
    this.allProductos.forEach((product) => {
      if (!allCategories.includes(product.categoria)) {
        allCategories.push(product.categoria);
      }
    });
    this.categories = allCategories;
  }

  getDate(producto: Producto): Date {
    let stringData = JSON.parse(JSON.stringify(producto.fechaPublicacion))[
      'date'
    ];
    let date = new Date(stringData);
    return date;
  }
  ordenarPorFechaAsc() {
    this.allProductos = this.allProductos.sort(
      (n1, n2) => this.getDate(n2).getTime() - this.getDate(n1).getTime()
    );
  }

  ordenarPorFechaDes() {
    this.allProductos = this.allProductos.sort(
      (n1, n2) => this.getDate(n1).getTime() - this.getDate(n2).getTime()
    );
  }

  otherSort() {
    //mostramos solo las ofertas
    if (this.selOther == 'Ofertas') {
      let ofertas: any = [];
      this.allProductos.forEach((element) => {
        if (element.idOferta != null) {
          ofertas.push(element);
          this.allProductos = ofertas;
        }
      });

    } else {
      this.allProductos = this.aux;
    }

    //Ordenamos por precio (de menos a mas)
    if (this.selOther == 'Precio mas bajo') {
      this.allProductos = this.allProductos.sort(
        (n1, n2) => n1.precioTotalstock - n2.precioTotalstock
      );
    }

    //Ordenamos por precio (de mas a menos)
    if (this.selOther == 'Precio mas alto') {
      this.allProductos = this.allProductos.sort(
        (n1, n2) => n2.precioTotalstock - n1.precioTotalstock
      );
    }

    //Ordenamos por fecha (de mas a menos)
    if (this.selOther == 'Mas recientes') {
      this.ordenarPorFechaAsc();
    }

    //Ordenamos por fecha (de mas a menos)
    if (this.selOther == 'Mas antiguos') {
      this.ordenarPorFechaDes();
    }
  }
}
