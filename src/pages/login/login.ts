import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../modelos/user';
import { RegistroPage } from '../registro/registro';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private afAuth : AngularFireAuth,
    public alertCtrl : AlertController,
    public toastCtrl: ToastController) {
  }

  

  signin(){
    this.navCtrl.push(RegistroPage);

  }

 login(user : User){
  try { 
  this.afAuth.auth.signInWithEmailAndPassword(user.correo, user.contrasena);
  
  }
  catch(e){
    console.error(e);
    console.log(e.message)
    this.presentAlert(e.code, e.message);
  }
 }

 presentAlert(codigo, mensaje) {
  let toast = this.toastCtrl.create({
    message: 'El campo de email tiene que ser un texto valido, verifiquelo',
    position: 'bottom',
    duration: 2500,
    dismissOnPageChange: true
  });

   if(codigo == "auth/user-not-found"){
  let alert = this.alertCtrl.create({
    title: 'El usuario no existe',
    subTitle: 'No hay registro de usuario correspondiente a este identificador. El usuario puede haber sido eliminado.',
    buttons: ['Ok']
  });
  alert.present();
}

if(codigo == "auth/wrong-password"){
  let alert = this.alertCtrl.create({
    title: 'Contraseña incorrecta',
    subTitle: 'La contraseña es invalida o el usuario no tiene contraseña.',
    buttons: ['Ok']
  });
  alert.present();
}

if(codigo == "auth/argument-error"){
  if(mensaje == 'signInWithEmailAndPassword failed: First argument "email" must be a valid string.'){
    toast.present();
    
}
else{
    toast = this.toastCtrl.create({
    message: 'El campo de contraseña tiene que ser un texto valido, verifiquelo',
    position: 'bottom',
    duration: 2500,
    dismissOnPageChange: true
  });
  toast.present();

}
}

if(codigo == "auth/invalid-email"){
    toast = this.toastCtrl.create({
    message: 'El campo de email tiene un formato incorrecto',
    position: 'bottom',
    duration: 2500,
    dismissOnPageChange: true
  });
  toast.present();

}


}
 }

