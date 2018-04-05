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
  bitacora = [];
  public event = {
    month: '2018-04-02',
    maximo: '2018-04-02'
  }

  constructor(public modal: ModalController, 
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public usua: UsuarioProvider, 
              public loadctrl: LoadingController,
              public actionCtrl:ActionSheetController,
              private afDB: AngularFireDatabase, 
              private afAuth:AngularFireAuth) {

    this.Uid = this.afAuth.auth.currentUser.uid;

    var fechaActu = new Date();
    var mes, dia;
    
    mes = fechaActu.getMonth() + 1;
    dia = fechaActu.getDate();

    if(mes<10) mes = "0" + mes;
    if(dia<10) dia = "0" + dia;

    console.log(mes, dia);

    this.event.month = fechaActu.getFullYear() + "-" + mes + "-" + dia;

    this.event.maximo = fechaActu.getFullYear() + "-" + mes + "-" + dia;
    
   
    
      

    
  }

  ionViewDidLoad() {

    
  }

  ir_detalle_reporte(){
    let modal = this.modal.create(DetalleReportePage);
      modal.present();

   }

   mostrarBitacora(){
    
     var fechaBuscar = this.event.month.split("-");
     for (let index = 1; index < fechaBuscar.length; index++) {
        fechaBuscar[index] = fechaBuscar[index].replace("0","");
       
     }
    let loader = this.loadctrl.create({
      content: "Espere porfavor...",
       });
      loader.present();
      this.reportes = this.afDB.list('registro/'+this.Uid+'/'+fechaBuscar[0]+'/'+fechaBuscar[1]+'/'+fechaBuscar[2]).snapshotChanges().map(changes => {
        return changes.map(c => ({ ...c.payload.val() }));
      });
  
       this.reportes.subscribe( respuesta =>{
        this.reporte = respuesta;
        var horasEntrada, horaSalida, minEnt, minSal, segEnt, segSal, am;
        for (let index = 0; index < this.reporte.length; index++) {
          var fechaEntrada = new Date(this.reporte[index].hora_entrada);
          var fechaSalida = new Date(this.reporte[index].hora_salida);
          horasEntrada = fechaEntrada.getHours();
          horaSalida = fechaSalida.getHours();
          minEnt = fechaEntrada.getMinutes();
          minSal = fechaSalida.getMinutes();
          segEnt = fechaEntrada.getSeconds();
          segSal = fechaSalida.getSeconds();
          if (horasEntrada == 0 ) horasEntrada = 12;
          if (horaSalida == 0 ) horaSalida = 12;
          if(minEnt<10)minEnt = "0" + minEnt;
          if(minSal<10)minSal = "0" + minSal; 
          if(segEnt<10)segEnt = "0" + segEnt;
          if(segSal<10)segSal = "0" + segSal; 
          if(horasEntrada>12){ horasEntrada = horasEntrada - 12; am = "P.M.";}
          else{
            am = "A.M.";
          }
          if(horaSalida>12){ horaSalida = horaSalida - 12; am = "P.M.";}
          else{
            am = "A.M.";
          }
          if(horasEntrada<10)horasEntrada = "0" + horasEntrada;
          if(horaSalida<10)horaSalida = "0" + horaSalida; 

          if(this.reporte[index].hora_entrada != 0) this.reporte[index].hora_entrada = horasEntrada + ":" + minEnt + ":" + segEnt + " " + am;
          else this.reporte[index].hora_entrada = "No ha registrado entrada";

          if(this.reporte[index].hora_salida != 0) this.reporte[index].hora_salida = horaSalida + ":" + minSal + ":" + segSal + " " + am ;
          else this.reporte[index].hora_salida = "No ha registrado salida";

          
        }
        loader.dismiss();
         
    });
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

