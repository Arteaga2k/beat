import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },  
    {
      title: 'Clientes',
      url: '/clientes/listar',
      icon: 'list'
    },
    {
      title: 'Usuarios',
      url: '/usuarios/listar',
      icon: 'list'
    },
  /*   {
      title: 'Clientes',
      url: '/gestion/clientes/listar',
      icon: 'list'
    }, */
    /* {
      title: 'Usuarios',
      url: '/gestion/usuarios/listar',
      icon: 'list'
    }, */
    {
      title: 'Proveedores',
      url: '/proveedores',
      icon: 'people'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
