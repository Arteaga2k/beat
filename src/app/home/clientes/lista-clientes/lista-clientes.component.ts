import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpresaService } from 'src/app/services/api/empresa.service';
import { Empresa } from 'src/app/classes/empresa';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {

  clientes: Empresa[] = [];
  displayedColumns: string[] = ['nombre', 'cif', 'email', 'tipo'];
  dataSource = null;
  modoBusqueda = false;
  textoBusqueda: string;


  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private empresaSvc: EmpresaService,
    private router: Router,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
    this.actualizarListaClientes();
  }

  actualizarListaClientes() {

    this.empresaSvc.getClientes().subscribe(
      data => {
        this.clientes = [];
        if (data.clientes) {
          for (const c of data.clientes) {
            this.clientes.push(new Empresa(c));
          }

          for (const c of data.clientes) {
            this.clientes.push(new Empresa(c));
          }

          for (const c of data.clientes) {
            this.clientes.push(new Empresa(c));
          }
        }

        console.log('data', this.clientes);
        this.dataSource = new MatTableDataSource<Empresa>(this.clientes);
        this.dataSource.sort = this.sort;
      },
      err => {
        alert('error' + err);

      }
    );
  }

  clienteSeleccionado(cliente) {
    console.log('fila seleccionada', cliente);   
    //this.router.navigate(['/gestion/clientes/editar/'+ cliente.getId() ]);  
    this.router.navigateByUrl('/gestion/clientes/editar/'+ cliente.getId() );  
  }

  limpiaBusqueda() {
    this.dataSource.filter = this.textoBusqueda.trim().toLowerCase();
  }

  cancelarBusqueda() {
    this.modoBusqueda = !this.modoBusqueda;
    this.dataSource.filter = "";

  }

  abrirBusqueda() {
    this.modoBusqueda = !this.modoBusqueda;
  }

  inputBusqueda() {
    this.dataSource.filter = this.textoBusqueda.trim().toLowerCase();
  }

}
