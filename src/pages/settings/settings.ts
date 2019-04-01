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
  public channelName: string = this.global.channelName;
  public username: string = this.global.username;
  public showTooltip: boolean = this.global.showTooltip;
  public websocketsPort: number = this.global.websocketsPort;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.save();
  }
  save() {
    this.global.username = this.username;
    this.global.mqttip = this.mqttip;
    this.global.channelName = this.channelName;
    this.global.showTooltip = this.showTooltip;
    this.global.websocketsPort = this.websocketsPort;
    console.log(this.global.mqttip + 'global');
    console.log(this.mqttip + 'local');
    console.log(this.channelName + 'channel');
  }

}
