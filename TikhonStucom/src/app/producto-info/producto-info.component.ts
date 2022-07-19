import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../classes/producto';
import { DivisaService } from '../services/divisa.service';
import { LoginService } from '../services/login.service';
import { PerfilService } from '../services/perfil.service';
import { ProductoService } from '../services/producto.service';
import { SectionService } from '../services/section.service';

@Component({
  selector: 'app-producto-info',
  templateUrl: './producto-info.component.html',
  styleUrls: ['./producto-info.component.css'],
  providers: [ProductoService, SectionService, DivisaService, PerfilService],
})
export class ProductoInfoComponent implements OnInit {
  constructor(
    private _loginService: LoginService,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _productoService: ProductoService,
    private _seccionService: SectionService,
    private _divisaService: DivisaService,
    private _perfilService: PerfilService
  ) {}
  producto!: Producto;
  seccion: any;
  user: any;
  divisa: any;
  allProductos: Array<Producto> = [];
  idProducto: Producto | any;
  msgBtn = 'Añadir al carrito ';
  iconBtn = 'addToCarrito';

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById() {
    this._activeRoute.paramMap.subscribe(
      // Por active route
      (params) => {
        // Enganchamos los parametros
        this.idProducto = params.get('idProducto'); // Le damos a la variable juego el titulo del juego
        if (this.idProducto == null) {
          // En el caso de que no sea nulo
        } else {
          this._productoService.getProductoById(this.idProducto).subscribe(
            // Pide la seccion pasando un acronimo de esta por parametro
            (respuesta) => {
              this.producto = respuesta;
              this.changeButton();
              this.getSectionById(this.producto.idSeccion);
              this.getUserById(this.producto.idUser);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      }
    );
  }

  getSectionById(id: number) {
    this._seccionService.getSectionById(id).subscribe(
      // Pide la seccion pasando un acronimo de esta por parametro
      (respuesta) => {
        this.seccion = respuesta;
        this.getProductsBySeccionId(id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProductsBySeccionId(id: number) {
    this._seccionService.getProductsBySeccionId(id).subscribe(
      // Pide la seccion pasando un acronimo de esta por parametro
      (respuesta) => {
        this.allProductos = respuesta;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getDivisaById(id: number) {
    this._divisaService.getDivisaById(id).subscribe(
      // Pide la seccion pasando un acronimo de esta por parametro
      (respuesta) => {
        this.divisa = respuesta;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUserById(id: number) {
    this._perfilService.getUsuarioById(id).subscribe(
      // Pide la seccion pasando un acronimo de esta por parametro
      (respuesta) => {
        this.user = respuesta;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addToShopingCar() {
    if (localStorage.getItem('clave') != undefined) {
      this._loginService
        .checkToken(localStorage.getItem('clave') + '')
        .subscribe(
          (resultado) => {
            if (resultado.correcto) {
              const user = localStorage.getItem('nombreUsuario');
              let carrito = JSON.parse(
                localStorage.getItem(user + 'carrito') as any
              );
              carrito.push(this.producto);
              localStorage.setItem(user + 'carrito', JSON.stringify(carrito));
              this.changeButton();
            } else {
              this._router.navigate(['/login']);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this._router.navigate(['/login']);
    }
  }

  inCarrito() {
    if (localStorage.getItem('nombreUsuario') != undefined) {
      const user = localStorage.getItem('nombreUsuario');
      let carrito = JSON.parse(localStorage.getItem(user + 'carrito') as any);
      if (carrito.length > 0) {
        for (let index = 0; index < carrito.length; index++) {
          if (carrito[index].idProducto == this.producto.idProducto) {
            return true;
          }
        }
      }
    }
    return false;
  }

  changeButton() {
    const button = document.getElementById('addToShopingCar');
    if (this.inCarrito() && button != null) {
      if (button.classList[1] == 'btnAddCarrito') {
        button.classList.remove('btnAddCarrito');
        button.classList.add('btnInCarrito');
        button.style.color = '#ffff';
        this.msgBtn = 'Añadido al carrito ';
        this.iconBtn = 'adedToCarrito';
      }
    }
    if (this.inCarrito() == false && button != null) {
      if (button.classList[1] == 'btnInCarrito') {
        button.classList.remove('btnInCarrito');
        button.classList.add('btnAddCarrito');
        this.msgBtn = 'Añadir al carrito ';
        this.iconBtn = 'addToCarrito';
      }
    }
  }

  carritoIconStyleOn() {
    let img = document.getElementById('carrIcon');
    if (img != null) {
      if (img.classList[1] == 'btnIcono2') {
        img.classList.remove('btnIcono2');
      }
      img.classList.add('btnIcono1');
    }
  }

  carritoIconStyleOff() {
    let img = document.getElementById('carrIcon');
    if (img != null) {
      if (img.classList[1] == 'btnIcono1') {
        img.classList.remove('btnIcono1');
      }
      img.classList.add('btnIcono2');
    }
  }

  getDate(producto: Producto): String {
    let stringData = JSON.parse(JSON.stringify(producto.fechaPublicacion))[
      'date'
    ];
    let date = new Date(stringData);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return year + '-' + month + '-' + day;
  }

  comprar() {
    if (localStorage.getItem('clave') != undefined) {
      this._loginService
        .checkToken(localStorage.getItem('clave') + '')
        .subscribe(
          (resultado) => {
                                  if (resultado.correcto) {
                                    this._productoService.productTrade(this.idProducto, parseInt(localStorage.getItem('idUser') as string)).subscribe(
                                      (respuesta) => {
                                        console.log(respuesta);
                                      },
                                      (error) => {
                                        console.log(error);
                                      }
                                    );
                                  } else {
                                    this._router.navigate(['/login']);
                                  }
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this._router.navigate(['/login']);
    }
  }
}
