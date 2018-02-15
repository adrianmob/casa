import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { AngularFireAuth } from 'angularfire2/auth';
import { DetalleUsuarioPage } from '../detalle-usuario/detalle-usuario';


@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html'
})
export class UsuariosPage {

  public show: boolean = false;
  public usuario = {};
  public press: number = 0;


  constructor(public navCtrl: NavController, public usua: UsuarioProvider, private afAuth: AngularFireAuth,
              public loadctrl: LoadingController) {

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
      this.navCtrl.push(DetalleUsuarioPage);  

     }

     opcion(){
       this.show = true;

     }

     hide_opcion(){
      this.press++;
     if(this.press > 1){
       this.show = false;
       this.press = 0;
     }
      
  }

  tomarFoto(){
    this.usua.camera();
  }


  tomarImagen(){
    this.usua.imagen();
    
  }
}


  


