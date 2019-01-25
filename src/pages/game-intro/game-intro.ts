import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GameIntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game-intro',
  templateUrl: 'game-intro.html',
})
export class GameIntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  slideOpts = {
    effect: 'flip'
  };
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameIntroPage');
  }

}
