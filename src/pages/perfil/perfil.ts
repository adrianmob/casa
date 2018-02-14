import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Perfil } from '../../modelos/perfil';
import { AngularFireDatabase } from 'angularfire2/database';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  perfil = {} as Perfil;

  constructor(private afAuth : AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,
  private afDatabase : AngularFireDatabase) {
  }

  crearperfil(){
    this.afAuth.authState.subscribe(auth => { 
      this.afDatabase.database.ref('usuarios').child(auth.uid).set(this.perfil).then(()=>{
        this.navCtrl.setRoot(TabsPage)});
      });
        
  }

}
