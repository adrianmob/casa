import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../modelos/user';
import { TabsPage } from '../tabs/tabs';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  user = {} as User;

  constructor(private afAuth : AngularFireAuth, 
              public navCtrl: NavController, 
              public navParams: NavParams,
              private afDatabase : AngularFireDatabase,
              private alertCtrl: AlertController) {
  }

  async registrar(user : User){
    try{
      user.url = "https://firebasestorage.googleapis.com/v0/b/casasegura-e1196.appspot.com/o/usuarios%2Ffotos_perfil%2Fperfil.png?alt=media&token=68ec1e1e-9284-4e3f-8da8-fe2082dfa60b";
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.correo, user.contrasena).then(()=>{
      this.afAuth.auth.signInWithEmailAndPassword(user.correo, user.contrasena)}).then(()=>{
        this.afAuth.authState.subscribe(auth => { 
          this.afDatabase.database.ref('usuarios').child(auth.uid).set(user).then(()=>{
            this.navCtrl.setRoot(TabsPage)});
          });
      })

  }
  catch(e){
    console.error(e);
  }

}

verificarContra(){
  if( this.user.contrasenaVer != this.user.contrasena){
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Las contraseñas no coinciden',
      buttons: ['Ok']
    });
    alert.present();
  }else{
    let alert = this.alertCtrl.create({
      title: 'Muy bien',
      subTitle: 'Las contraseñas coinciden',
      buttons: ['Ok']
    });
    alert.present();
  }
  }
}


