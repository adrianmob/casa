import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarTrabajadorPage } from './editar-trabajador';

@NgModule({
  declarations: [
    EditarTrabajadorPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarTrabajadorPage),
  ],
})
export class EditarTrabajadorPageModule {}
