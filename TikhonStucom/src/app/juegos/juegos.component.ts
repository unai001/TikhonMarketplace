import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Juegos } from '../classes/juegos';
import { JuegosService } from '../services/juegos.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css'],
  providers: [JuegosService]
})
export class JuegosComponent implements OnInit {

  constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _juegosService: JuegosService) { }

  juegos:Array<Juegos> = [];                      // Array donde se vna guardando todos los juegos que tenemos

  ngOnInit(): void {
    this._juegosService.getJuegos().subscribe(    // Al abrir la pagina pedira todos los juegos
      (respuestaJuegos) => {
        this.juegos = respuestaJuegos;            // Y lo guardamos en el arraylist de juegos
      },
      (error) => {
        console.log(error)
      }
    );
  }
}