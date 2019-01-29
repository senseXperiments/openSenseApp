import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  /* shows Introduction slides */
  openInstructions() {
    this.navCtrl.push('SenseBoxInstructionsPage');
  }
  openSettings() {
    this.navCtrl.push('SettingsPage');

  }
}
