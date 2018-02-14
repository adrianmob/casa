import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EditarPage} from '../editar/editar';
import {EliminarPage} from '../eliminar/eliminar';

/**
 * Generated class for the DetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
              let item = this.navParams.get('item');
              console.log(item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePage');
  }

  onEditar(){
    this.navCtrl.push(EditarPage)
  }

  onEliminar(){
    this.navCtrl.push(EliminarPage)
  }

}
