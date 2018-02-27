import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { DetalleReportePage } from '../detalle-reporte/detalle-reporte';

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

 public reportes = [];

  constructor(public modal: ModalController, public navCtrl: NavController, public navParams: NavParams,  public usua: UsuarioProvider, public loadctrl: LoadingController) {
      
    let loader = this.loadctrl.create({
      content: "Espere porfavor...",
       });
      loader.present();
      this.usua.get_reportes().subscribe(data =>{
      this.reportes = data;
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

}
