import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EditarTrabajadorPage } from '../editar-trabajador/editar-trabajador';

/**
 * Generated class for the TrabajadoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trabajadores',
  templateUrl: 'trabajadores.html',
})
export class TrabajadoresPage {

  trab = {
    idEm: "",
    idTra: "",
    cedula: "",
    correo:"",
    curp: "",
    name: "",
    rfc: "",
    tipo: "",
    url: "",
    telefono: ""
  };
  categoria: string = "trabajador";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modal: ModalController) {
    this.trab = this.navParams.get("trabajador");
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrabajadoresPage');
  }

  ir_editar_trabajador(){
    let modal = this.modal.create(EditarTrabajadorPage,{
      trabajador : this.trab
    });
    modal.present();

   }

  

}
