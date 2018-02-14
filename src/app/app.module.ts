import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { VisitantesPage } from '../pages/visitantes/visitantes';
import { EventosPage } from '../pages/eventos/eventos';
import { HomePage } from '../pages/home/home';
import { ReportesPage } from '../pages/reportes/reportes';
import { TabsPage } from '../pages/tabs/tabs';
import { DetallePage } from '../pages/detalle/detalle';
import { EditarPage } from '../pages/editar/editar';
import { EliminarPage } from '../pages/eliminar/eliminar';
import { UsuariosPage } from '../pages/usuarios/usuarios';
import { ModalPage } from '../pages/modal/modal';
import { AgregarPage } from '../pages/agregar/agregar';
import { DetalleUsuarioPage } from '../pages/detalle-usuario/detalle-usuario';
import { DetalleReportePage } from '../pages/detalle-reporte/detalle-reporte';
import { LoginPage } from '../pages//login/login'



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { Camera } from '@ionic-native/camera';

export const firebaseConfig = {
  apiKey: "AIzaSyAja20tnMsPmKsqnIAYE8EC9itQhDZH340",
    authDomain: "casasegura-e1196.firebaseapp.com",
    databaseURL: "https://casasegura-e1196.firebaseio.com",
    storageBucket: "casasegura-e1196.appspot.com",
    messagingSenderId: "119885070123"
}

@NgModule({
  declarations: [
    MyApp,
    VisitantesPage,
    EventosPage,
    HomePage,
    TabsPage,
    DetallePage,
    EditarPage,
    EliminarPage,
    ReportesPage,
    UsuariosPage,
    ModalPage,
    AgregarPage,
    DetalleUsuarioPage,
    DetalleReportePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    NgxQRCodeModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    VisitantesPage,
    EventosPage,
    HomePage,
    TabsPage,
    DetallePage,
    ReportesPage,
    EditarPage,
    UsuariosPage,
    EliminarPage,
    ModalPage,
    AgregarPage,
    DetalleUsuarioPage,
    DetalleReportePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UsuarioProvider,
    Camera
  ]
})
export class AppModule {}
