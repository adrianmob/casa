import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../modelos/user';
import { TabsPage } from '../tabs/tabs';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  user = {} as User;

  constructor(private afAuth : AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,private afDatabase : AngularFireDatabase) {
  }

  async registrar(user : User){
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(()=>{
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)}).then(()=>{
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

}
