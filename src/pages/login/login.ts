import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../modelos/user';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private afAuth : AngularFireAuth,
    public alertCtrl : AlertController) {
  }

  

  signin(){
    this.navCtrl.push('RegistroPage');

  }

 async login(user : User){
  try { 
  const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  if(result){
    console.log(result);
    this.navCtrl.push('RegistroPage');


  }
  }
  catch(e){
    console.error(e);
  }
 }

}
