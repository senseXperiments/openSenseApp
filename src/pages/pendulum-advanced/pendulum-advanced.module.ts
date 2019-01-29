import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendulumAdvancedPage } from './pendulum-advanced';

@NgModule({
  declarations: [
    PendulumAdvancedPage,
  ],
  imports: [
    IonicPageModule.forChild(PendulumAdvancedPage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PendulumAdvancedPageModule {}
