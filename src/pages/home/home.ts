import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MaxaccPage } from '../maxacc/maxacc';
import { AccelerometerPage } from '../accelerometer/accelerometer';
import { GyroscopePage } from '../gyroscope/gyroscope';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  //Buttons
  //Button to get to Accelerometer Page
  btnClickAccel() {
    this.navCtrl.push(AccelerometerPage);
  }
  //Button to get to the Game
  btnClickGame() {
    this.navCtrl.push(MaxaccPage);
  }
  //Button to get to the Gyroscope
  btnClickGyros() {
    this.navCtrl.push(GyroscopePage);
  }
}
