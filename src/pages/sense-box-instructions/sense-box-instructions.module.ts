import { NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SenseBoxInstructionsPage } from './sense-box-instructions';

@NgModule({
  declarations: [
    SenseBoxInstructionsPage,
  ],
  imports: [
    IonicPageModule.forChild(SenseBoxInstructionsPage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SenseBoxInstructionsPageModule {}
