import { Component } from '@angular/core';
import { ToastController ,ActionSheetController ,NavController, NavParams, ViewController, ModalController, LoadingController, Platform } from 'ionic-angular';
import { AgregarPage } from '../agregar/agregar';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { Vibration } from '@ionic-native/vibration';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { DetalleTrabajadorPage } from '../detalle-trabajador/detalle-trabajador';


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
               public actionSheet : ActionSheetController,
               private base : Base64ToGallery,
               public toastCtrl: ToastController,
               private vibration : Vibration,
               public Platform : Platform,
               public usua: UsuarioProvider) {

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

  

  vamos(item){
    this.vibration.vibrate(50);
    var imagen = document.querySelector('#'+item.key+" .qrcode img");
    var url = imagen.getAttribute("src");
    let actionSheet = this.actionSheet.create({
      title: 'Guardar imagen',
      cssClass: 'hoja-accion',
      buttons: [
        {
          text: 'Guardar imagen',
          icon: 'cloud-download',
          role: 'destructive',
          handler: () => {

            this.base.base64ToGallery(url, { prefix: item.name }).then(

              res => {
                let toast = this.toastCtrl.create({
                message: '¡La imagen se ha descargdo con exito!',
                duration: 3000,
                position: 'bottom'});
                toast.present();
              },

              err => {
                let toast = this.toastCtrl.create({
                message: '¡La imagen no se ha descargado!',
                duration: 3000,
                position: 'bottom'});
                toast.present();
              }
            );
          }},{
          text: 'Eliminar',
          icon: 'trash',
          role: 'destructive',
          handler: () => { 
            console.log(item);
            this.usua.delete_trabajadores(item.tipo,item.key,item.curp);}
          
        },{
          text: 'Cancelar',
          icon: this.Platform.is('android') ? 'close' : null,
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

  detalleTrab(item){
    let modal = this.modalCtrl.create( DetalleTrabajadorPage,{trabajador : item});
    modal.present();
  }


  
    
}





