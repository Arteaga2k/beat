import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, EmailValidator, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {

    this.formulario = this.fb.group({
      email: ['', [Validators.required, EmailValidator]],
      clave: ['', [Validators.required, Validators.minLength(4)]],
      acceso: ['']
    });
  }

  acceder() {
    
     if (this.formulario.get('email').valid && this.formulario.get('clave').valid) {
         this.loginService.login({
             'email': this.formulario.get('email').value,
             'clave': this.formulario.get('clave').value,
             'acceso': this.formulario.get('acceso').value
         }).subscribe(data => {    

          alert(data);
 
             console.log(data);
 
             // Almacenamos los datos en el localStorage
             this.storage.set('token', data['token']);
             this.storage.set('usuario', JSON.stringify(data['usuario']));
             this.storage.set('empresa', JSON.stringify(data['empresa']));
             if (typeof data['localizacion'] !== 'undefined') {
               this.storage.set('localizacion', JSON.stringify(data['localizacion']));
             }
 
             this.router.navigateByUrl(data['redirect']);         
         }, err => {       
           //todo capturar error    
           alert('error');
         });
     }
     return false;
  }

}
