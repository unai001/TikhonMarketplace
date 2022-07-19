import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../classes/user';
import { SignInService } from '../services/signin.service';
import { LoginService } from '../services/login.service';
import { LogInComponent } from '../log-in/log-in.component';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [SignInService]
})
export class SignInComponent implements OnInit {
  today = new Date();
  paisList = ["Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita", "Argelia", "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bangladés", "Barbados", "Baréin", "Bélgica", "Belice", "Benín", "Bielorrusia", "Birmania", "Bolivia", "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi", "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China", "Chipre", "Ciudad del Vaticano", "Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba", "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", "España", "Estados Unidos", "Estonia", "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón", "Gambia", "Georgia", "Ghana", "Granada", "Grecia", "Guatemala", "Guyana", "Guinea", "Guinea ecuatorial", "Guinea-Bisáu", "Haití", "Honduras", "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia", "Islas Marshall", "Islas Salomón", "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait", "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí", "Malta", "Marruecos", "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montenegro", "Mozambique", "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda", "Omán", "Países Bajos", "Pakistán", "Palaos", "Palestina", "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú", "Polonia", "Portugal", "Reino Unido", "República Centroafricana", "República Checa", "República de Macedonia", "República del Congo", "República Democrática del Congo", "República Dominicana", "República Sudafricana", "Ruanda", "Rumanía", "Rusia", "Samoa", "San Cristóbal y Nieves", "San Marino", "San Vicente y las Granadinas", "Santa Lucía", "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Suazilandia", "Sudán", "Sudán del Sur", "Suecia", "Suiza", "Surinam", "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo", "Tonga", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay", "Uzbekistán", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbabue"];

  SignUser = '';
  SignUserError = '';
  SignName = "";
  SignNameError = '';
  SignApellidos = "";
  SignApellidosError = '';
  SignPass1 = '';
  SignPass1Error = '';
  SignPass2 = '';
  SignPass2Error = '';
  SignEmail = '';
  SignEmailError = '';
  SignFecha = '';
  SignFechaError = '';
  SignPais = '';
  SignPaisError = '';
  SignCaptchaError = '';

  respuestaCaptcha = '';

  constructor(private _router: Router, private _activeRoute: ActivatedRoute, private _SignInService: SignInService, private _login: LogInComponent, private _loginService: LoginService) { }

  captchaDiv: HTMLElement | undefined;      // Declaro el div del captcha y el boton de submit
  submitButton!: HTMLButtonElement;         // Creo tambien como elemento el boton de enviar el captcha

  captcha1 = <HTMLImageElement>document.createElement('img');     // Guardo en variables cada elemento de imagen del div
  captcha2 = <HTMLImageElement>document.createElement('img');
  captcha3 = <HTMLImageElement>document.createElement('img');
  captcha4 = <HTMLImageElement>document.createElement('img');

  ngOnInit(): void {
    // Pongo en un array todos los caracteres
    let arrayCaracters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z',];

    this.captchaDiv = <HTMLElement>document.getElementById('captchaImages');      // En el patchadiv pongo la seccion donde iran las iamgenes
    this.submitButton = <HTMLButtonElement>document.getElementById('submit');     // En la variable pongo el boton para enviar
    this.submitButton.style.backgroundColor = '#FF7659';

    //primer catacter
    let randNumber = Math.floor(Math.random() * (24 + 1));                    // Cojo un numero aleatorio que sera la posicion del array de caracteres
    this.captcha1.className = 'captchaImage';                                 // Le asigno una clase
    this.captcha1.id = arrayCaracters[randNumber];                            // Le asigno un ID dependiendo del caracter que sea
    this.captcha1.src =                                                       // Como soruce le pongo la ruta relativa
      '/assets/caracteresCaptcha/' + arrayCaracters[randNumber] + '.png';     // Concatendandola con el caracter aleatorio + .png

    //segundo                                                                 // Lo mismo para los demas caracteres
    randNumber = Math.floor(Math.random() * (24 + 1));
    this.captcha2.className = 'captchaImage';
    this.captcha2.id = arrayCaracters[randNumber];
    this.captcha2.src =
      '/assets/caracteresCaptcha/' + arrayCaracters[randNumber] + '.png';

    //tercero
    randNumber = Math.floor(Math.random() * (24 + 1));
    this.captcha3.className = 'captchaImage';
    this.captcha3.id = arrayCaracters[randNumber];
    this.captcha3.src =
      '/assets/caracteresCaptcha/' + arrayCaracters[randNumber] + '.png';

    //cuarto
    randNumber = Math.floor(Math.random() * (24 + 1));
    this.captcha4.className = 'captchaImage';
    this.captcha4.id = arrayCaracters[randNumber];
    this.captcha4.src =
      '/assets/caracteresCaptcha/' + arrayCaracters[randNumber] + '.png';

    this.captchaDiv.appendChild(this.captcha1);     // Los displayeo
    this.captchaDiv.appendChild(this.captcha2);
    this.captchaDiv.appendChild(this.captcha3);
    this.captchaDiv.appendChild(this.captcha4);
  }

  // Funcion de recoger y enviar resultado del captcha
  sendCaptcha() {
    var error = false;                            // Declaro una variable donde indicara si ha habido algun error o no en el captcha
    let captchaAnswer = this.captcha1.id + this.captcha2.id + this.captcha3.id + this.captcha4.id;        // La respuesta son todas las ID's concatenadas

    // Diferentes requerimientos para que se desloquee el boton de submit para regisrarse
    if (this.respuestaCaptcha == captchaAnswer    // La respuesta del captcha debe ser correcta
      && !this.chekUserName()                     // Checkea que los campos cumplan ciertas condiciones
      && !this.chekPass1()
      && !this.chekPass2()
      && !this.chekName()
      && !this.chekApellidos()
      && !this.chekEmail()
      && !this.chekEdad()
      && !this.chekPais()) {
      error = false;                                // En el caso de que todo este bien la variable error sera false
      this.submitButton.disabled = false;           // Y se activara el boton
      this.SignCaptchaError = "";
      this.submitButton.style.backgroundColor = '#A7FFA4';  // Cambiamos el color del boton para indicar que ya se puede clicar
    } else {
      error = true;                                       // En el caso de que haya algun error la variable sera true
      this.submitButton.disabled = true;                  // Y el boton seguira apagado
      this.SignCaptchaError = "*Captcha incorrect";       // En el caso de que haya error en el captcha nos lo indicara
      this.submitButton.style.backgroundColor = '#FF7659';
    }
    return error;
  }

  // Funcion que se ejecuta al pulsar el boton de enviar la informacion para registrarse
  onSubmit() {
    if (!this.chekUserName()        // De nuevo checkea que todo esta correcto
      && !this.chekPass1()
      && !this.chekPass2()
      && !this.chekName()
      && !this.chekApellidos()
      && !this.chekEmail()
      && !this.chekEdad()
      && !this.chekPais()
      && !this.sendCaptcha()) {

      this.signInFunction();                                        // Ejecuta la funcion de registrar el usuario
       // Y luego lo loguea
    }
  }

  // Funcion de chekear el nombre de usuario
  chekUserName() {
    var error = false;
    if (this.SignUser.length < 3) {                 // tiene que tener minimo 3 caracteres
      error = true;
      this.SignUserError = '*min 3 characters';
    }
    if (this.SignUser.length >= 10) {               // maximo 10
      error = true;
      this.SignUserError = '*max 10 characters';
    }
    if (this.SignUser == '') {                      // que no sea nulo
      error = true;
      this.SignUserError = '*required';
    }
    if (error == false) {                           // Y que no haya ningun error
      this.SignUserError = '';
    }
    return error;
  }

  // Funcion de checkear la contraseña
  chekPass1() {
    var error = false;
    if (this.SignPass1.length < 4) {                // Minimo 4 caracteres
      error = true;
      this.SignPass1Error = '*min 4 characters';
    }
    if (this.SignPass1.length >= 30) {              // Maximo 30
      error = true;
      this.SignPass1Error = '*max 30 characters';
    }
    if (this.SignPass1 == '') {                     // Que no sea nulla
      error = true;
      this.SignPass1Error = '*required';
    }
    if (error == false) {
      this.SignPass1Error = '';
    }
    return error;
  }

  // Metodo para comprobar que sea igual la contraseña
  chekPass2() {
    var error = false;
    if (this.SignPass2 != this.SignPass1) {
      error = true;
      this.SignPass2Error = '*pass mssmatch';
    }
    if (this.SignPass2 == '') {
      error = true;
      this.SignPass2Error = '*required';
    }
    if (error == false) {
      this.SignPass2Error = '';
    }
    return error;
  }

  // Metodo de chekear nombre
  chekName() {
    var error = false;
    if (this.SignName.length < 3) {
      error = true;
      this.SignNameError = '*min 3 characters';
    }
    if (this.SignName == '') {
      error = true;
      this.SignNameError = '*required';
    }
    if (error == false) {
      this.SignNameError = '';
    }
    return error;
  }

  //Metodo de comprobar el apellido
  chekApellidos() {
    var error = false;
    if (this.SignApellidos.length < 3) {
      error = true;
      this.SignApellidosError = '*min 3 characters';
    }
    if (this.SignApellidos == '') {
      error = true;
      this.SignApellidosError = '*required';
    }
    if (error == false) {
      this.SignApellidosError = '';
    }
    return error;
  }

  //Metodo de comprobar el mail
  chekEmail() {
    var error = false;
    //Damos unos parametros
    var regexp = new RegExp("[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?");

    if (!regexp.test(this.SignEmail)) {   // Comprobamos que el mail cumpla los matrones
      error = true;
      this.SignEmailError = '*format error';    // Si no lo hace da error
    }
    if (this.SignEmail == '') {
      error = true;
      this.SignEmailError = '*required';
    }
    if (error == false) {
      this.SignEmailError = '';
    }
    return error;
  }

  // Metodo para checkear la edad
  chekEdad() {
    var birthDate = new Date(this.SignFecha);     // Creamos una objeto fecha
    var error = false;

    // Condicion que comprueba que tengas mas de 16 años
    if ((birthDate.getFullYear() + 16) > this.today.getFullYear()
      || (birthDate.getFullYear() + 16) == this.today.getFullYear() && birthDate.getMonth() > this.today.getMonth()
      || (birthDate.getFullYear() + 16) == this.today.getFullYear() && birthDate.getMonth() == this.today.getMonth() && birthDate.getDay() > (this.today.getDay() + 1)) {
      error = true;
      this.SignFechaError = '*you must have at least 16 ';
    }
    if (this.SignFecha == '') {
      error = true;
      this.SignFechaError = '*required';
    }
    if (error == false) {
      this.SignFechaError = '';
    }
    return error;
  }

  // Metodo que checkea el pais
  chekPais() {
    var SignPais = <HTMLButtonElement>document.getElementById('signPais');
    var error = false;
    if (SignPais.value == "Pais") {
      error = true;
      this.SignPaisError = '*Inserte un pais valido';
    } else {
      var error = false;
      this.SignPais = SignPais.value;
      this.SignPaisError = '';
    }
    return error;
  }


  // Metodo para registrar el usuario con todos los parametros ya chekceados
  signInFunction() {
    const newUser = new User(this.SignUser, this.SignName, this.SignApellidos, this.SignEmail, this.SignFecha, this.SignPais, 0, false, this.SignPass1);
    this._SignInService.addUser(newUser).subscribe(
      (result) => {
        console.log(result);
        if(result.correcto){
          this._login.loginFunction(1, newUser.usuario, newUser.password);
        }
      }

    )
  }


}
