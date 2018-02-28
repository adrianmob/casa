import { Component } from '@angular/core';
import { ToastController ,ActionSheetController ,NavController, NavParams, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { AgregarPage } from '../agregar/agregar';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { Vibration } from '@ionic-native/vibration';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  categoria: string = "trabajadores";
  tipo: any;
  titulo : any;
  personasRef: AngularFireList<any>;
  personas: Observable<any[]>;
  prueba = [];
  Uid : string;



  constructor( public loadctrl : LoadingController, 
               private afAuth:AngularFireAuth, 
               private afDatabase : AngularFireDatabase, 
               public navCtrl: NavController, 
               public viewCtrl : ViewController, 
               public modalCtrl: ModalController, 
               public navP : NavParams,
               private photoLib : PhotoLibrary,
               public actionSheet : ActionSheetController,
               private base : Base64ToGallery,
               public toastCtrl: ToastController,
               private vibration : Vibration,
               private photoViewer: PhotoViewer) {

    let loader = this.loadctrl.create({
      content: "Espere porfavor...",
       });
      loader.present();
    
    this.tipo = this.categoria;
    console.log(this.categoria);

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

  ionViewWillLoad(){
    
  }

  agregar(){
    this.titulo = this.categoria;
    let modal = this.modalCtrl.create(AgregarPage,{
      tipo: this.tipo,
      titulo: this.titulo
    });
    modal.present();


  }

  zoom(item){
    var imagen = document.querySelector('#'+item.key+" .qrcode img");
    var url = imagen.getAttribute("src");
    console.log(url);
    this.photoViewer.show("http://media3.viajesporeuskadi.com/c/16-home_slider/naturaleza-y-paisaje.jpg");
  }

  vamos(item){
    this.vibration.vibrate(500);
    var imagen = document.querySelector('#'+item.key+" .qrcode img");
    var url = imagen.getAttribute("src");
    let actionSheet = this.actionSheet.create({
      title: 'Guardar imagen',
      buttons: [
        {
          text: 'Guardar imagen',
          icon: 'cloud-download',
          role: 'destructive',
          handler: () => {
            this.base.base64ToGallery(url, { prefix: '_img' }).then(
              res =>{
                let toast = this.toastCtrl.create({
                  message: res,
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
              },
              err => { let toast = this.toastCtrl.create({
                message: err,
                duration: 3000,
                position: 'top'
              });
              toast.present();
            
            }

            );
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
        }
      ]
    });
    actionSheet.present();
  }
    

  segCambio(){

    let loader = this.loadctrl.create({
      content: "Espere porfavor...",
       });
      loader.present();
    
    this.tipo = this.categoria;

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


  
    
}



