import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
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
  letraMin: string;
  letraMay: string

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl: ViewController, 
              private afDatabase: AngularFireDatabase,
              public usuario : UsuarioProvider,
              private afAuth:AngularFireAuth,
              public loadingCtrl: LoadingController) {

    this.tipo = this.navParams.get('tipo');
    this.agregar.name="";
    this.agregar.curp="";
    this.agregar.rfc="";
    this.agregar.cedula="";
    this.agregar.correo="";
    this.agregar.pass="MTIzNDU=";
    this.agregar.telefono="";
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
    if (this.imagen !="" && this.agregar.telefono!="" && this.agregar.correo != "" && this.agregar.name != "" && this.agregar.curp != "" && this.agregar.rfc !="" && this.agregar.cedula !="") {
      this.boton = false;
    }
    else {
      this.boton = true;
    }

  }

  agregar_visitante() {

    let loader = this.loadingCtrl.create({
      content: "Guardando...",
      spinner: "crescent"
    });
    loader.present();
    this.agregar.tipo = this.tipo_qr;
    let fotoref = firebase.storage().ref('usuarios/trabajadores/'+this.Uid+'/'+this.agregar.curp);
        fotoref.putString(this.imagen, 'base64', {contentType: 'image/jpg'}).then(foto_guardad => {
          this.agregar.url = foto_guardad.downloadURL;
          this.afDatabase.database.ref(this.tipo).push(this.agregar);
          loader.dismiss();
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

  mayus(arg){ 

    
    if(arg == "curp"){

      this.letraMin = document.getElementById("curp").getAttribute("ng-reflect-model");
      this.letraMay = this.letraMin.toUpperCase();
      this.agregar.curp = this.letraMay;
      if(this.agregar.curp.length < 11) this.agregar.rfc = this.letraMay;
    }else{
       this.letraMin = document.getElementById("rfc").getAttribute("ng-reflect-model");
       this.letraMay = this.letraMin.toUpperCase();
      this.agregar.rfc = this.letraMay;

    }
    
    
  }




}
