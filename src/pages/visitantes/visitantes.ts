import { Component } from '@angular/core';
import { NavController, ModalController  } from 'ionic-angular';
import { ModalPage } from '../modal/modal';

@Component({
  selector: 'page-visitantes',
  templateUrl: 'visitantes.html'
})
export class VisitantesPage {

  lista: Array<any> =[
    {
      titulo:"Solo un dia",
      icono: 'partly-sunny',
      color: "blue"
    },
    {
      titulo:"Familiares",
      icono: 'contacts',
      color: "green"
    },
    {
      titulo:"Amigos",
      icono: 'beer',
      color: "yellow"
    },
    {
      titulo:"Servicios",
      icono: 'construct',
      color: "brown"
    },
    {
      titulo:"Bloqueados",
      icono: 'remove-circle',
      color: "red"
    }

  ]

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  openModal(tipo) {

    let modal = this.modalCtrl.create(ModalPage,{
      tipo: tipo,
      titulo: tipo
    });
    modal.present();
  }
}

