import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-usuarios-popover',
  templateUrl: './usuarios-popover.component.html',
  styleUrls: ['./usuarios-popover.component.scss']
})
export class UsuariosPopoverComponent implements OnInit {
  orden: string = 'descendente';
  field: string = 'nombre';
  orden_email = '';
  orden_cif = '';
  orden_nombre = '';

  constructor(private popoverCtrl: PopoverController, navParams: NavParams) {
    this.orden = navParams.get('orden');
    this.field = navParams.get('field');

    if (this.orden == 'ascendente') {
      this.orden_nombre = 'arrow-round-up';
      this.orden_email = 'arrow-round-up';
      this.orden_cif = 'arrow-round-up';

    } else {
      this.orden_nombre = 'arrow-round-down';
      this.orden_email = 'arrow-round-down';
      this.orden_cif = 'arrow-round-down';

    }
  }

  ngOnInit() {
  }

  async guardarFiltro() {
    try {
      await this.popoverCtrl.dismiss(this.field, this.orden);
    } catch (e) {
      //click more than one time popover throws error, so ignore...
    }
  }


  async setOrden(_campo) {

    if (_campo == 'nombre') {
      if (this.orden_nombre === 'arrow-round-down') {
        this.orden_nombre = 'arrow-round-up';
        this.orden = 'ascendente';
        this.field = 'nombre';
      } else {
        this.orden_nombre = 'arrow-round-down';
        this.orden = 'descendente';
        this.field = 'nombre';
      }
    }

    if (_campo == 'cif') {
      if (this.orden_cif === 'arrow-round-down') {
        this.orden_cif = 'arrow-round-up';
        this.orden = 'ascendente';
        this.field = 'cif';
      } else {
        this.orden_cif = 'arrow-round-down';
        this.orden = 'descendente';
        this.field = 'cif';
      }

    }

    if (_campo == 'email') {
      if (this.orden_email === 'arrow-round-down') {
        this.orden_email = 'arrow-round-up';
        this.orden = 'ascendente';
        this.field = 'email';
      } else {
        this.orden_email = 'arrow-round-down';
        this.orden = 'descendente';
        this.field = 'email';
      }
    }

  }

  async(_orden) {
    // console.log(' orden seleccionado ', _orden);
    //this.orden = _orden;
  }
  async onDismiss(categoria) {
    try {
      await this.popoverCtrl.dismiss(categoria, this.orden);
    } catch (e) {
      //click more than one time popover throws error, so ignore...
    }

  }

}





