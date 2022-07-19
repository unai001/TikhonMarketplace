import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AreaPersonalComponent } from './area-personal/area-personal.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CompraComponent } from './compra/compra.component';
import { ContactComponent } from './contact/contact.component';
import { JuegoComponent } from './juego/juego.component';
import { JuegosComponent } from './juegos/juegos.component';
import { LogInComponent } from './log-in/log-in.component';
import { MainComponent } from './main/main.component';
import { ProductoInfoComponent } from './producto-info/producto-info.component';
import { RecursosComponent } from './recursos/recursos.component';
import { SearchComponent } from './search/search.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SubirProductoComponent } from './subir-producto/subir-producto.component';

const routes: Routes = [
  {path:'',component: MainComponent},
  {path:'login',component: LogInComponent},
  {path:'login/signin',component: SignInComponent},
  {path:'juegos',component: JuegosComponent},
  {path:'juego/:juego',component: JuegoComponent},
  {path:'about',component: AboutComponent},
  {path:'services',component: ServiciosComponent},
  {path:'contact',component: ContactComponent},
  {path:'recursos',component: RecursosComponent},
  {path:'areapersonal',component: AreaPersonalComponent},
  {path:'search',component: SearchComponent},
  {path:'upload',component: SubirProductoComponent},
  {path:'compra/:idProducto',component: CompraComponent},
  {path:'productoInfo/:idProducto',component: ProductoInfoComponent},
  {path:'carrito',component: CarritoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
