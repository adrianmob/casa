import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { AgregarPage } from '../agregar/agregar';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  tipo: any;
  titulo : any;
  personasRef: AngularFireList<any>;
  personas: Observable<any[]>;
  prueba = [];
  Uid : string;

  constructor(public loadctrl : LoadingController, private afAuth:AngularFireAuth, private afDatabase : AngularFireDatabase, public navCtrl: NavController, public viewCtrl : ViewController, public modalCtrl: ModalController, public navP : NavParams) {
    
    let loader = this.loadctrl.create({
      content: "Espere porfavor...",
       });
      loader.present();
    
    this.tipo = this.navP.get('tipo');
    this.titulo = this.navP.get('titulo');
    

    if(this.tipo == "Solo un dia"){
      this.tipo = "solo_dia"; 
      console.log(this.tipo);
    }
    else{
      if(this.tipo == "Familiares"){
        this.tipo = "familiares"; 
        console.log(this.tipo);
      }
      else{
        if(this.tipo == "Amigos"){
          this.tipo = "amigos"; 
          console.log(this.tipo);
        }
        else{
          if(this.tipo == "Servicios"){
            this.tipo = "servicios"; 
            console.log(this.tipo);
          }
          else{
            
              this.tipo = "bloqueados"; 
              console.log(this.tipo);
            
          }
        }
      }
    }
    this.Uid = this.afAuth.auth.currentUser.uid;
    this.tipo = this.tipo+"/"+this.Uid;
    console.log(this.tipo);
    this.personasRef = this.afDatabase.list(this.tipo);
    this.personas = this.personasRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      
    });
    this.personas.subscribe(respuesta =>{
      this.prueba = respuesta;
      loader.dismiss();
    });
  

  }



  ionViewDidLoad() {
  

  }

  close(){
    this.viewCtrl.dismiss();
  }

  agregar(){
    let modal = this.modalCtrl.create(AgregarPage,{
      tipo: this.tipo
    });
    modal.present();


  }

}
