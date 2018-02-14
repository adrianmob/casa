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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, private afDatabase : AngularFireDatabase) {
    this.tipo = this.navParams.get('tipo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarPage');
  }

  close(){
    this.viewCtrl.dismiss();
  }

  agregar_visitante(){
    console.log(this.tipo);
    this.afDatabase.database.ref(this.tipo).push(this.agregar).then(()=>{
      this.viewCtrl.dismiss()});
    
  }


  
  
}
