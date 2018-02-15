import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  Uid : string;
  id: any;

  constructor(private afDB: AngularFireDatabase, private afAuth:AngularFireAuth, private camara : Camera) {
    this.Uid = this.afAuth.auth.currentUser.uid;
    this.id = Date.now();
    
  }

  get_usuarios(){
    return this.afDB.object('usuarios/'+this.Uid).valueChanges();
  }

  editar_usuarios(usuario){
    this.afDB.database.ref('usuarios/'+this.Uid).set(usuario);
  }

  agregar_reporte(reportes){
    this.afDB.database.ref('reportes/'+this.Uid+'/'+this.id).set(reportes);
  }

  get_reportes(){
    return this.afDB.list('reportes/'+this.Uid).valueChanges();
  }

  camera(){
    this.camara.getPicture({
      quality : 100,
      destinationType : this.camara.DestinationType.DATA_URL,
      sourceType : this.camara.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.camara.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(foto => {
            let fotoref = firebase.storage().ref('usuarios/fotos_perfil/'+this.Uid);
            fotoref.putString(foto, 'base64', {contentType: 'image/jpg'}).then(foto_guardad => {
              firebase.database().ref('usuario').set(foto_guardad.downloadURL);
            });
    }, error => {
      // Log an error to the console if something goes wrong.
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
    

  imagen(){
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
            let fotoref = firebase.storage().ref('usuarios/fotos_perfil/'+this.Uid);
            fotoref.putString(foto, 'base64', {contentType: 'image/jpg'}).then(foto_guardad => {
              firebase.database().ref('usuario').set(foto_guardad.downloadURL);
            });
    }, error => {
      // Log an error to the console if something goes wrong.
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

}