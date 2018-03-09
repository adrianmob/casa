import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Agregar } from '../../modelos/agregar';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { AngularFireAuth } from 'angularfire2/auth';
declare function escape(s:string): string;
import firebase from 'firebase';


/**
 * Generated class for the AgregarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-agregar',
  templateUrl: 'agregar.html',
})
export class AgregarPage {
  tipo: any;
  agregar = {} as Agregar;
  tipo_qr: any;
  boton: boolean = true;
  imagen:any = "";
  Uid : string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl: ViewController, 
              private afDatabase: AngularFireDatabase,
              public usuario : UsuarioProvider,
              private afAuth:AngularFireAuth) {

    this.tipo = this.navParams.get('tipo');
    this.agregar.name="";
    this.agregar.curp="";
    this.agregar.rfc="";
    this.agregar.cedula="";
    this.tipo_qr = this.navParams.get('titulo');
    this.Uid = this.afAuth.auth.currentUser.uid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  habilitarBoton() {
    if (this.imagen !="" && this.agregar.name != "" && this.agregar.curp != "" && this.agregar.rfc !="" && this.agregar.cedula !="") {
      this.boton = false;
    }
    else {
      this.boton = true;
    }

  }

  agregar_visitante() {
    debugger;
    this.agregar.tipo = this.tipo_qr;
    console.log(this.agregar.rfc);
    let fotoref = firebase.storage().ref('usuarios/trabajadores/'+this.Uid+'/'+this.agregar.rfc);
        fotoref.putString(this.imagen, 'base64', {contentType: 'image/jpg'}).then(foto_guardad => {
          this.agregar.url = foto_guardad.downloadURL;
          this.afDatabase.database.ref(this.tipo).push(this.agregar);
          this.viewCtrl.dismiss();
        });
  

  }

   prueba(){
    
    var imagen = document.getElementById("ife");
    this.usuario.imagen_ife().then(foto=>{

      this.imagen = foto; 

      foto = escape(foto);
      
      imagen.setAttribute("src",'data:image/jpg;base64,'+foto);
     
      this.habilitarBoton();
    });
  }




}
