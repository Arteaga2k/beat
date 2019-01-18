import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { FormGroup, Validators, EmailValidator, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/api/login.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private fabRef;

  cargando: boolean = false;
  formulario: FormGroup;
  foto_fondo: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private storage: Storage,
    private menuCtrl: MenuController,
    private element: ElementRef,
    private renderer: Renderer2
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.fondoLogin();

    this.formulario = this.fb.group({
      email: ['', [Validators.required, EmailValidator]],
      clave: ['', [Validators.required, Validators.minLength(4)]],
      acceso: ['']
    });

    this.storage.clear();
  }


  ngAfterViewInit() {

    this.fabRef = this.element.nativeElement; //.querySelectorAll("ion-page");
    console.log(' fabref ', this.fabRef);

   // this.fabRef = this.element.nativeElement.querySelectorAll("ion-fab")[0];
    this.renderer.setStyle(this.fabRef, 'background', 'url(/assets/images/login/login1.jpg) no-repeat 0 0');
  }

  acceder() {

    if (this.formulario.get('email').valid && this.formulario.get('clave').valid) {
      this.cargando = true;

      this.loginService.login({
        'email': this.formulario.get('email').value,
        'clave': this.formulario.get('clave').value,
        'acceso': this.formulario.get('acceso').value
      }).subscribe(data => {

        console.log(' acceder ', data);

        forkJoin(
          this.storage.set('token', data['token']),
          this.storage.set('usuario', JSON.stringify(data['usuario'])),
          this.storage.set('empresa', JSON.stringify(data['empresa'])),
        ).subscribe(datos => {
          if (typeof data['localizacion'] !== 'undefined') {
            this.storage.set('localizacion', JSON.stringify(data['localizacion']));
          }
          this.router.navigateByUrl(data['redirect']);
        }
        );
      }, err => {

        this.cargando = false;
        //todo capturar error    
        alert('error');
      });
    }
    return false;
  }

  fondoLogin() {
    const numero_aleatorio = Math.floor(Math.random() * 3 + 1);
    this.foto_fondo = 'url("/assets/images/login/login' + numero_aleatorio + '.jpg")';
  }

}
