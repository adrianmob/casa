import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleTrabajadorPage } from './detalle-trabajador';

@NgModule({
  declarations: [
    DetalleTrabajadorPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleTrabajadorPage),
  ],
})
export class DetalleTrabajadorPageModule {}
