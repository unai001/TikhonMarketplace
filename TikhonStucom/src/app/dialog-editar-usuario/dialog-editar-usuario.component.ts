import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../classes/user';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'false-dialog-editar-usuario',
  templateUrl: './dialog-editar-usuario.component.html',
  styleUrls: ['./dialog-editar-usuario.component.css'],
  providers: [PerfilService]
})

export class DialogEditarUsuarioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _perfilService: PerfilService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // Funcion para actualizar el perfil
  actualizarPerfil() {
    this._perfilService.updateInfoUsuario(this.data.nuevosDatos).subscribe(   // Se envian los nuevos datos y se sobreescriben sobre tu usuario
      (respuesta) => {
        console.log(respuesta);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
