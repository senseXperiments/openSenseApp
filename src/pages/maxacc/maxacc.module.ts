import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaxaccPage } from './maxacc';


@NgModule({
  declarations: [
    MaxaccPage,
  ],
  imports: [
    IonicPageModule.forChild(MaxaccPage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MaxaccPageModule {}
