import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';


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

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public usua: UsuarioProvider) {
  
    this.usua.get_usuarios().subscribe(data =>{
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
