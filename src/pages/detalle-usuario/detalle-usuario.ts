import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public usua: UsuarioProvider) {
  
    this.usua.get_usuarios().subscribe(data =>{
      this.usuario = data;
      console.log(this.usuario);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleUsuarioPage');
  }

  edit_usuario(){
    this.usua.editar_usuarios(this.usuario);
    this.navCtrl.pop();
  }

}
