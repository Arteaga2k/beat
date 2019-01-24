import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/classes/empresa';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'src/app/services/api/empresa.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MenuController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.scss']
})
export class EditarClientesComponent implements OnInit {

  cargando: boolean = false;
  id_empresa = '';
  cliente: Empresa = null;
  _tab: string = 'datos_personales_tab';

  constructor(
    private empresasSvc: EmpresaService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private menuCtrl: MenuController,
    private router: Router,
    private navCtrl: NavController
  ) {
    //this.menuCtrl.enable(false);

  }

  ngOnInit() {
    
    this.route.queryParamMap.subscribe(queryParams => {
      //console.log('params son ', queryParams); 
      if (queryParams.get("tab")) {
        this._tab = queryParams.get("tab");   
      }
     
    })

   



    this.cargando = true;
    this.id_empresa = this.route.snapshot.paramMap.get('id');
    this.obtenerCliente();
  }

  obtenerCliente() {

    this.empresasSvc.getCliente(this.id_empresa).subscribe(
      cliente => {
        console.log(' EditarClienteComponent getCliente', cliente);
        this.cliente = cliente;
        this.cargando = false;
      },
      err => {
        console.log(' error get cliente ', err);
        //mensaje error
        // Simple message with an action.      
        let snackBarRef = this.snackBar.open(
          'Error. Ha ocurrido un error al intentar cargar los clientes. Si persiste contacte con el administrador.',
          'Aceptar',
          { verticalPosition: 'top' });

        snackBarRef.afterDismissed().subscribe(info => {
          if (info.dismissedByAction === true) {
            //todo hacer cosas   
            this.cargando = false;
          }
        }
        );
      }
    );

  }

  volverClick() {    

    this.router.navigateByUrl('gestion/clientes/listar', { replaceUrl: true })  
    
  }

}
