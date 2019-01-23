import { Component, OnInit } from '@angular/core';
import { Localizacion } from 'src/app/classes/localizacion';
import { LoginService } from 'src/app/services/api/login.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-seleccion-localizacion',
  templateUrl: './seleccion-localizacion.component.html',
  styleUrls: ['./seleccion-localizacion.component.scss']
})
export class SeleccionLocalizacionComponent implements OnInit {

  token: string;
  localizaciones: Array<Localizacion>;
  cargando: boolean = false;

  constructor(
    private storage: Storage,
    private loginService: LoginService,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.cargando = true;
    this.storage.get('token').then((val) => {
      this.token = val;

      if (this.token == null) {
        this.router.navigate([environment.url_login]);
      }
      //todo cargar las localizaciones    
      this.cargaLocalizaciones();

    });
  }

  seleccionar(localizacion: Localizacion) {
    console.log(' localizacion seleccionada ', localizacion);

    this.storage.set('localizacion', JSON.stringify(localizacion)).then(() => {
      this.menuCtrl.enable(true);
      this.router.navigate([environment.url_home]);
    }
    );
  }

  cargaLocalizaciones() {
    // Obtenemos las localizaciones con permisos   
    this.localizaciones = new Array();
    this.storage.get("usuario").then((usuario) => {
      console.log(' usuario ', usuario);

      this.loginService.getLocalizacionesUsuario(JSON.parse(usuario)).subscribe(
        data => {
          this.localizaciones = data;
          this.cargando = false;
        },
        err => {
          alert('error' + err);
          this.router.navigate([environment.url_login]);
        }
      );
    })
  }

  // https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
  estiloBorde(localizacion: Localizacion): any {
    function shadeColor2(color, percent) {
      const f = parseInt(color.slice(1), 16);
      const t = percent < 0 ? 0 : 255;
      const p = percent < 0 ? percent * -1 : percent;
      // tslint:disable-next-line:no-bitwise
      const R = f >> 16;
      // tslint:disable-next-line:no-bitwise
      const G = f >> 8 & 0x00FF;
      // tslint:disable-next-line:no-bitwise
      const B = f & 0x0000FF;
      const _r = Math.round((t - R) * p) + R;
      const _g = Math.round((t - G) * p) + G;
      const _b = Math.round((t - B) * p) + B;
      return '#' + (0x1000000 + _r * 0x10000 + _g * 0x100 + _b).toString(16).slice(1);
    }

    const hexColor = localizacion.getColor() != null ? '#' + localizacion.getColor() : '#000000';

    return {
      'border-color': hexColor
    };
  }



}
