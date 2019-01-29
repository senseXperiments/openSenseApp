
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {Storage} from "@ionic/storage";
import { SaveChecksProvider } from '../providers/save-checks/save-checks';

@Component({
  templateUrl: 'app.html'
})
export class openSenseApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  pages: Array<{title: string, component: any}> = [
    { title: 'Home', component: HomePage },
    { title: 'Scientists Mode', component: 'SenseBoxPage' },
    { title: 'Game', component: 'MaxaccPage' },
    { title: 'Pendulum Basic', component: 'PendulumPage' },
    // { title: 'Experiments', component: 'ExperimentsPage' },
    { title: 'Pendulum Advanced', component: 'PendulumAdvancedPage'},
    { title: 'Gyroscope', component: 'GyroscopePage' },
    { title: 'Settings', component: 'SettingsPage' },
    { title: 'About us', component: 'AboutPage' }
  ];
    
   

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage, public saveChecks: SaveChecksProvider) {
    
  
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
      this.storage.get('showAgain').then((result) => {
        if(result){
          this.nav.setRoot(page.component);
        }
        else{
          this.nav.setRoot("GameIntroPage");
        }
      })
    }
    else this.nav.setRoot(page.component);
  }
}

