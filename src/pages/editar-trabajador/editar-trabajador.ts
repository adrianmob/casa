import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the EditarTrabajadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-trabajador',
  templateUrl: 'editar-trabajador.html',
})


export class EditarTrabajadorPage {

   trabajador = {
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

  ide : any;
  idt : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController,
              private afDB: AngularFireDatabase) {

              this.trabajador = this.navParams.get("trabajador");
              this.ide = this.trabajador.idEm;
              this.idt = this.trabajador.idTra;
              
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarTrabajadorPage');
  }

  close(){
    this.viewCtrl.dismiss();

  }
  edit_usuario(){
    this.afDB.database.ref('trabajadores/'+this.ide+'/'+this.idt).update({
      cedula: this.trabajador.cedula,
      correo: this.trabajador.correo,
      curp: this.trabajador.curp,
      name: this.trabajador.name,
      rfc: this.trabajador.rfc,
      tipo: this.trabajador.tipo,
      url: this.trabajador.url,
      telefono: this.trabajador.telefono
    });
    this.navCtrl.pop();
  }

}
