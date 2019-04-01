import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  public mqttip: string = "192.168.0.101";
  public channelName: string = "accelerometer";
  public username: string = 'Player 1';
  public showTooltip: boolean = false;
  public websocketsPort: number = 11883;

  constructor(public http: HttpClient) {
    console.log('Hello GlobalProvider Provider');
  }

}