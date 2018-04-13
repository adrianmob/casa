import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../modelos/user';
import { RegistroPage } from '../registro/registro';
import { AngularFireDatabase } from 'angularfire2/database';
import { TrabajadoresPage } from '../trabajadores/trabajadores';
import { Observable } from 'rxjs/Observable';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  listaTrab: Observable<any[]>;
  trab = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,  
              private afAuth : AngularFireAuth,
              private afDB: AngularFireDatabase,
              public alertCtrl : AlertController,
              public toastCtrl: ToastController) {
              
              this.user.correo = "";
              this.user.contrasena = "";
  }

  

  signin(){
    this.navCtrl.push(RegistroPage);

  }

 async login(user : User){
  try { 
  const result = await this.afAuth.auth.signInWithEmailAndPassword(user.correo, user.contrasena);
  
  
  }
  catch(e){

    var trabaja = false;
    this.listaTrab = this.afDB.list('trabajadores').snapshotChanges().map(changes => {
      return changes.map(c =>  ({ key: c.payload.key, ...c.payload.val() }));
    });

    
    this.listaTrab.subscribe(respuesta =>{
      this.trab = respuesta;
    
      for (let index = 0; index < this.trab.length; index++) {
        
        for (const key in this.trab[index]) {
          if(user.correo == this.trab[index][key].correo){
            if(user.contrasena == atob(this.trab[index][key].pass)){
            

                trabaja = true;
  
                var trabajador = {
                  idEm: this.trab[index].key,
                  idTra: key,
                  cedula: this.trab[index][key].cedula,
                  correo: this.trab[index][key].correo,
                  curp: this.trab[index][key].curp,
                  name: this.trab[index][key].name,
                  rfc: this.trab[index][key].rfc,
                  tipo: this.trab[index][key].tipo,
                  url: this.trab[index][key].url,
                  telefono: this.trab[index][key].telefono
  
                }
             
                this.navCtrl.setRoot(TrabajadoresPage,{
                  trabajador : trabajador});

                  break;
                  
              
            }

          }
            
          }
        
        
      }
      if(trabaja == false){
      this.presentAlert(e.code, e.message);

      }
    });

    
    
    
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

