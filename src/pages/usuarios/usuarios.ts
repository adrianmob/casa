import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, ActionSheetController  } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { AngularFireAuth } from 'angularfire2/auth';
import { DetalleUsuarioPage } from '../detalle-usuario/detalle-usuario';


@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html'
})
export class UsuariosPage {

  public usuario = {};


  constructor(public navCtrl: NavController, public usua: UsuarioProvider, private afAuth: AngularFireAuth,
              public loadctrl: LoadingController,
              public modal: ModalController,
              public actionCtrl: ActionSheetController) {
  
      let loader = this.loadctrl.create({
      content: "Espere porfavor...",
       });
      loader.present();

      this.usua.get_usuarios().subscribe(data =>{
      this.usuario = data;
      loader.dismiss();
    });
  }

    cerrarSesion(){
      this.afAuth.auth.signOut();
    }

    ir_detalle_usuario(){
      let modal = this.modal.create(DetalleUsuarioPage);
      modal.present();

     }

     foto_perfil(){
      let actionSheet = this.actionCtrl.create({
        title: 'Foto de perfil',
        buttons: [
          {
            text: 'Tomar foto',
            role: 'Foto',
            handler: () => {
              this.usua.camera();
            }
          },{
            text: 'Escoger imagen',
            role: 'Imagen',
            handler: () => {
              this.usua.imagen();
            }
          }
        ]
      });
      actionSheet.present();
    }
  }
