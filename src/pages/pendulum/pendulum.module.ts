import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendulumPage } from './pendulum';

@NgModule({
  declarations: [
    PendulumPage,
  ],
  imports: [
    IonicPageModule.forChild(PendulumPage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PendulumPageModule {}
