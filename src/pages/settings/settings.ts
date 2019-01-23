import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public mqttip: string = this.global.mqttip;
  public channelName: string = 'accelerometer';

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.save();
  }
  save() {
    this.global.mqttip = this.mqttip;
    this.global.channelName = this.channelName;
    console.log(this.global.mqttip + 'global');
    console.log(this.mqttip + 'local');
    console.log(this.channelName + 'channel');
  }

}
