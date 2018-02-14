import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor( public navCtrl: NavController, private camara : Camera) {

  }

  ionViewWillLoad(){
    
  }

  tomarfoto(){
    this.camara.getPicture({
      quality : 100,
      destinationType : this.camara.DestinationType.DATA_URL,
      sourceType : this.camara.PictureSourceType.PHOTOLIBRARY,
      allowEdit : true,
      encodingType: this.camara.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(foto => {
            let fotoref = firebase.storage().ref('usuarios/fotos_perfil/user1.jpg');
            fotoref.putString(foto, 'base64', {contentType: 'image/jpg'}).then(foto_guardad => {
              firebase.database().ref('usuario').set(foto_guardad.downloadURL);
            });
    }, error => {
      // Log an error to the console if something goes wrong.
      console.log("ERROR -> " + JSON.stringify(error));
    });


  }
    
}



