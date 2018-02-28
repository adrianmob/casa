import { Component } from '@angular/core';
import { ActionSheetController ,IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { DetalleReportePage } from '../detalle-reporte/detalle-reporte';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the ReportesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reportes',
  templateUrl: 'reportes.html',
})
export class ReportesPage {

  reportes: Observable<any[]>;
  reporte = [];
  Uid: string;

  constructor(public modal: ModalController, 
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public usua: UsuarioProvider, 
              public loadctrl: LoadingController,
              public actionCtrl:ActionSheetController,
              private afDB: AngularFireDatabase, 
              private afAuth:AngularFireAuth) {

    this.Uid = this.afAuth.auth.currentUser.uid;
      
    let loader = this.loadctrl.create({
      content: "Espere porfavor...",
       });
      loader.present();
      this.reportes = this.afDB.list('reportes/'+this.Uid).snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
  
       this.reportes.subscribe( respuesta =>{
        this.reporte = respuesta;
        console.log(this.reporte);
        loader.dismiss();
         
    });
  

    
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad ReportesPage');
  }

  ir_detalle_reporte(){
    let modal = this.modal.create(DetalleReportePage);
      modal.present();

   }

   opciones(reporte){

    let actionSheet = this.actionCtrl.create({
      title: 'Modificar reporte',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            console.log(reporte);
            this.usua.delete_reportes(reporte.key);
          }
        },
        {
          text: 'Editar',
          role: 'destructive',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
 
    actionSheet.present();
  }

   }

