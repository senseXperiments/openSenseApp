import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SaveChecksProvider } from '../../providers/save-checks/save-checks';
import {Storage} from "@ionic/storage";

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public saveChecks: SaveChecksProvider, public storage: Storage) {
  }

  slideOpts = {
    effect: 'flip'
  };
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad GameIntroPage');
  }

  noShowAgain() {
         this.storage.ready().then(() =>
        {
              this.storage.get('showAgain').then((result)=> {
                if(result) {
                  this.storage.set('showAgain', false);
                }
                else this.storage.set('showAgain', true);
              })
        });
  }

  skip() {
    this.navCtrl.setRoot('MaxaccPage');
  }

  loadSettings() {
    this.navCtrl.push("SettingsPage");
  }
}
