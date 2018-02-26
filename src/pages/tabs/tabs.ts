import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { ReportesPage } from '../reportes/reportes';
import { UsuariosPage } from '../usuarios/usuarios';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  tab1Root = HomePage;
  tab2Root = ReportesPage;
  tab3Root = UsuariosPage;
}


