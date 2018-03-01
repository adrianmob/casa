import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the DetalleReportePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-reporte',
  templateUrl: 'detalle-reporte.html',
})
export class DetalleReportePage {

  public reporte: { asunto: string, descripcion: string, fecha: string };
  public fecha: any;
  public boton: boolean = true;


  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public usua: UsuarioProvider) {
    var f = new Date();
    this.reporte = { asunto: "", descripcion: "", fecha: "" };
    this.fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    this.reporte.fecha = this.fecha;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleReportePage');
  }

  habilitarBoton() {
    if (this.reporte.asunto != "" && this.reporte.descripcion != "") {
      this.boton = false;
    }
    else {
      this.boton = true;
    }

  }

  add_reporte() {
    this.usua.agregar_reporte(this.reporte);
    this.navCtrl.pop();
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
