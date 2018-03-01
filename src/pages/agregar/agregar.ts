import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Agregar } from '../../modelos/agregar';
import { AngularFireDatabase } from 'angularfire2/database';


/**
 * Generated class for the AgregarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-agregar',
  templateUrl: 'agregar.html',
})
export class AgregarPage {
  tipo: any;
  agregar = {} as Agregar;
  tipo_qr: any;
  boton: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private afDatabase: AngularFireDatabase) {
    this.tipo = this.navParams.get('tipo');
    this.tipo_qr = this.navParams.get('titulo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  habilitarBoton() {
    if (this.agregar.name != "") {
      this.boton = false;
    }
    else {
      this.boton = true;
    }

  }

  agregar_visitante() {
    this.agregar.tipo = this.tipo_qr;
    console.log(this.tipo);
    this.afDatabase.database.ref(this.tipo).push(this.agregar).then(() => {
      this.viewCtrl.dismiss()
    });

  }




}
