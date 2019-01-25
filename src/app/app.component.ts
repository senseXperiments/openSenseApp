
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {Storage} from "@ionic/storage";

@Component({
  templateUrl: 'app.html'
})
export class openSenseApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  pages: Array<{title: string, component: any}> = [
    { title: 'Home', component: HomePage },
    { title: 'Acceleration', component: 'SenseBoxPage' },
    { title: 'Game', component: 'MaxaccPage' },
    // { title: 'Games', component: 'GamesPage' },
    // { title: 'Experiments', component: 'ExperimentsPage' },
    // { title: 'Accelerometer', component: 'AccelerometerPage'},
    { title: 'Gyroscope', component: 'GyroscopePage' },
    { title: 'About', component: 'AboutPage' },
    { title: 'Settings', component: 'SettingsPage' },
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage) {
    
  
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title == 'Game'){
      this.storage.get('introShown').then((result) => {
        if(result){}
        else{
          this.nav.setRoot("GameIntroPage");
        }
      })
    }
    else this.nav.setRoot(page.component);
  }
}

