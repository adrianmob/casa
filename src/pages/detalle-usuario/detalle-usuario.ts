import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


/**
 * Generated class for the DetalleUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-usuario',
  templateUrl: 'detalle-usuario.html',
})
export class DetalleUsuarioPage {

  

  public usuario = {};
  Uid : string;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public usua: UsuarioProvider,
              private afDB: AngularFireDatabase,
              private afAuth:AngularFireAuth) {

    this.Uid = this.afAuth.auth.currentUser.uid;
  
    this.afDB.object('usuarios/'+this.Uid).valueChanges().subscribe(data =>{
      this.usuario = data;
      console.log(this.usuario);
    });

  }

  ionViewDidLoad() {
    
  }

  edit_usuario(){
    this.usua.editar_usuarios(this.usuario);
    this.navCtrl.pop();
  }

  close(){
    this.viewCtrl.dismiss();

  }

}
