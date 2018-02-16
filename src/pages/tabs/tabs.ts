import { Component } from '@angular/core';

import { VisitantesPage } from '../visitantes/visitantes';
import { EventosPage } from '../eventos/eventos';
import { HomePage } from '../home/home';
import { ReportesPage } from '../reportes/reportes';
import { UsuariosPage } from '../usuarios/usuarios';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  tab1Root = HomePage;
  tab2Root = VisitantesPage;
  tab3Root = EventosPage;
  tab4Root = ReportesPage;
  tab5Root = UsuariosPage;
}


