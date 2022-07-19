import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { MainComponent } from './main/main.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JuegosComponent } from './juegos/juegos.component';
import { JuegoComponent } from './juego/juego.component';
import { RecursosComponent } from './recursos/recursos.component';
import { AreaPersonalComponent } from './area-personal/area-personal.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { SearchComponent } from './search/search.component';
import { SubirProductoComponent } from './subir-producto/subir-producto.component';
import { CompraComponent } from './compra/compra.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DialogEditarUsuarioComponent } from './dialog-editar-usuario/dialog-editar-usuario.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductoInfoComponent } from './producto-info/producto-info.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import { CarritoComponent } from './carrito/carrito.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    MainComponent,
    SignInComponent,
    JuegosComponent,
    JuegoComponent,
    RecursosComponent,
    AreaPersonalComponent,
    AboutComponent,
    ContactComponent,
    ServiciosComponent,
    SearchComponent,
    SubirProductoComponent,
    CompraComponent,
    DialogEditarUsuarioComponent,
    ProductoInfoComponent,
    EditarProductoComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
