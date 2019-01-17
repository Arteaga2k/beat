import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.scss']
})
export class AltaClienteComponent implements OnInit {

  constructor(private router: Router) { }

  tab = 'calendar';

  show(tab) {
    this.tab = tab;
  }

  ngOnInit() {
  }

  volverClick() {
    this.router.navigateByUrl('gestion/clientes/listar');
  }

}
