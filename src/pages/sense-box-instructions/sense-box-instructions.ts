import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SaveChecksProvider } from '../../providers/save-checks/save-checks';
import {Storage} from "@ionic/storage";

/**
 * Generated class for the SenseBoxInstructionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sense-box-instructions',
  templateUrl: 'sense-box-instructions.html',
})
export class SenseBoxInstructionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,  public saveChecks: SaveChecksProvider, public storage: Storage) {
  }
  slideOpts = {
    effect: 'flip'
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad SenseBoxInstructionsPage');
  }

}
