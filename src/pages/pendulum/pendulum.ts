import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as HighCharts from 'highcharts';

/**
 * Generated class for the PendulumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pendulum',
  templateUrl: 'pendulum.html',
})
export class PendulumPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendulumPage');
    
    HighCharts.chart('xValues', {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Acceleration on X-Axis'
      },
      xAxis: {
        title: {
          text: 'Measurements'
        }
      },
      yAxis: {
        title: {
          text: 'Value of Acceleration'
        }
      },
      series: [{
        data: [9, 6, 9, 8, 1, 6, 10, 4, 1, 3, 2, 3, 12, 8, 10, 1, 3, 12, 8, 10, 4, 5, 4, 7, 0, 7, 7, 12, 1, 3, 0, 5, 3, 8, 7, 6, 5, 11, 3, 6, 8, 7, 5, 2, 0, 5, 2, 9, 9, 4]
        }]
    });
  }

}
