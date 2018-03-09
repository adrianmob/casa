import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetalleTrabajadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-trabajador',
  templateUrl: 'detalle-trabajador.html',
})
export class DetalleTrabajadorPage {

 
  item = {};

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.item = this.navParams.get("trabajador");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleTrabajadorPage');
  }


  close() {
    this.viewCtrl.dismiss();
  }

}
