import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/api/usuarios.service';

@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.scss']
})
export class ListausuariosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'email', 'cargo', 'activo'];

  constructor( 
    private usuariosSvc: UsuariosService,
    private router: Router
    ) { }

  ngOnInit() {
  }

}
