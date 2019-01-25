import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage} from "@ionic/storage";
/*
  Generated class for the SaveChecksProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SaveChecksProvider {
  public showAgain: boolean;

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello SaveChecksProvider Provider');
    this.loadCheckVal();
  }

  loadCheckVal(){
    this.storage.ready().then(() => {
      this.storage.get('showAgain').then((val) => {
        this.showAgain = val;
      });
    
     })
    }

}