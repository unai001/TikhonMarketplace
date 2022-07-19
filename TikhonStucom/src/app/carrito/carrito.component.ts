import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../classes/producto';
import { LoginService } from '../services/login.service';
import { PerfilService } from '../services/perfil.service';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [LoginService, PerfilService],
})
export class CarritoComponent implements OnInit {
  constructor(
    private _router: Router,
    private _loginService: LoginService,
    private _perfilService: PerfilService,
    private _productoService: ProductoService
  ) {}
  carrito: Array<any> = [];
  user: any;
  precioTotal: number = 0;
  userId: any;
  divisaUser: any;
  divisaProduct: any;

  ngOnInit(): void {
    if (localStorage.getItem('clave') != undefined) {
      this._loginService
        .checkToken(localStorage.getItem('clave') + '')
        .subscribe(
          (resultado) => {
            if (resultado.correcto) {
              this.userId = localStorage.getItem('idUser');
              this.getUserById(this.userId);
              this.user = localStorage.getItem('nombreUsuario');
              this.carrito = JSON.parse(
                localStorage.getItem(this.user + 'carrito') as any
              );
              console.log(this.user);
              this.calcPrecio();
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

  deleteProductFromCarrito(id: number) {
    for (let index = 0; index < this.carrito.length; index++) {
      if ((this.carrito[index].idProducto as number) == (id as number)) {
        this.precioTotal -= this.carrito[index].precioTotalstock;
        this.carrito.splice(index, 1);
      }
    }
    localStorage.setItem(this.user + 'carrito', JSON.stringify(this.carrito));
  }

  calcPrecio() {
    if (this.carrito.length == 0) {
      this.precioTotal = 0;
    } else {
      for (let index = 0; index < this.carrito.length; index++) {
        this.precioTotal += this.carrito[index].precioTotalstock;
      }
    }
  }

  getUserById(id: number) {
    this._perfilService.getUsuarioById(id).subscribe(
      // Pide la seccion pasando un acronimo de esta por parametro
      (respuesta) => {
        console.log(respuesta);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showDate(fecha: string) {
    let date = fecha.split(' ', 2);
    return date[0];
  }

  comprar() {
    if (localStorage.getItem('clave') != undefined) {
      this._loginService
        .checkToken(localStorage.getItem('clave') + '')
        .subscribe(
          (resultado) => {
            if (resultado.correcto) {
              for (let index = 0; index < this.carrito.length; index++) {
                this._productoService
                .productTrade(
                  this.carrito[index].idProducto,
                  parseInt(localStorage.getItem('idUser') as string)
                )
                .subscribe(
                  (respuesta) => {
                    if (respuesta.correcto) {
                      this.carrito.splice(index, 1);
                      localStorage.setItem(this.user + 'carrito', JSON.stringify(this.carrito));
                    }
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              }
              this.carrito = [];
              localStorage.setItem(this.user + 'carrito', JSON.stringify(this.carrito));
              this.precioTotal = 0;
             
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
