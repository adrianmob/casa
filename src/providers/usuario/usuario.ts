import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  Uid : string;
  id: any;

  constructor(private afDB: AngularFireDatabase, private afAuth:AngularFireAuth) {
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

}
