import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameIntroPage } from './game-intro';


@NgModule({
  declarations: [
    GameIntroPage,
  ],
  imports: [
    IonicPageModule.forChild(GameIntroPage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class GameIntroPageModule {}
