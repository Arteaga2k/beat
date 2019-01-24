import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.scss']
})
export class AltaClienteComponent implements OnInit {
  cargando: boolean = false;
  _tab: string = 'datos_personales_tab';

  constructor(private router: Router) { }


  ngOnInit() {
    this.cargando = true;
  }

  volverClick() {
    this.router.navigateByUrl('gestion/clientes/listar');
  }

}
