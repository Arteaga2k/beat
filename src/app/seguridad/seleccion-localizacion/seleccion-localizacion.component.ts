import { Component, OnInit } from '@angular/core';
import { Localizacion } from 'src/app/classes/localizacion';
import { LoginService } from 'src/app/services/api/login.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-seleccion-localizacion',
  templateUrl: './seleccion-localizacion.component.html',
  styleUrls: ['./seleccion-localizacion.component.scss']
})
export class SeleccionLocalizacionComponent implements OnInit {

  token: string;
  localizaciones: Array<Localizacion>;

  constructor(
    private storage: Storage,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    

    this.loginService.prueba().subscribe(
      data => {
        console.log(' prueba ', data);
      
      },
      err => {
        alert('error' + err);
        //this.router.navigate([environment.url_login]);
      }
    );

    // Obtenemos el token de usuario  
  /*  this.storage.get('token').then((val) => {
      this.token = val;

      if (this.token == null) {
        this.router.navigate([environment.url_login]);
      }
      //todo cargar las localizaciones
      //this.cargaLocalizaciones();
      this.loginService.prueba();
    });*/

  }

  cargaLocalizaciones() {
    // Obtenemos las localizaciones con permisos
    this.localizaciones = new Array();
    this.storage.get("usuario").then((usuario) => {      
      this.loginService.getLocalizacionesUsuario( JSON.parse(usuario)).subscribe(
        data => {
          console.log(' localizaciones ', data);
          this.localizaciones = data;
        },
        err => {
          alert('error' + err);
          //this.router.navigate([environment.url_login]);
        }
      );
    })

  }



}
