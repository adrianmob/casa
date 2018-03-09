import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { HomePage } from '../pages/home/home';
import { ReportesPage } from '../pages/reportes/reportes';
import { TabsPage } from '../pages/tabs/tabs';
import { UsuariosPage } from '../pages/usuarios/usuarios';
import { ModalPage } from '../pages/modal/modal';
import { AgregarPage } from '../pages/agregar/agregar';
import { DetalleUsuarioPage } from '../pages/detalle-usuario/detalle-usuario';
import { DetalleReportePage } from '../pages/detalle-reporte/detalle-reporte';
import { LoginPage } from '../pages/login/login';
import { RegistroPage} from '../pages/registro/registro';
import { DetalleTrabajadorPage } from '../pages/detalle-trabajador/detalle-trabajador';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { Camera } from '@ionic-native/camera';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { Vibration } from '@ionic-native/vibration';

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
    HomePage,
    TabsPage,
    ReportesPage,
    UsuariosPage,
    ModalPage,
    AgregarPage,
    DetalleUsuarioPage,
    DetalleReportePage,
    LoginPage,
    RegistroPage,
    DetalleTrabajadorPage

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
    HomePage,
    TabsPage,
    ReportesPage,
    UsuariosPage,
    ModalPage,
    AgregarPage,
    DetalleUsuarioPage,
    DetalleReportePage,
    LoginPage,
    RegistroPage,
    DetalleTrabajadorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UsuarioProvider,
    Camera,
    Base64ToGallery,
    Vibration
  ]
})
export class AppModule {}
