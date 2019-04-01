import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Paho } from 'ng2-mqtt/mqttws31';
import * as HighCharts from 'highcharts';
// import Boost from 'highcharts/modules/boost';
import { GlobalProvider } from "../../providers/global/global";

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

  boxData: any;
  client: any;
  message: any;
  xdatArray = [];
  ydatArray = []; 
  zdatArray = [];
  totDatArray = []; 
  xchart: any;
  allValChart: any;
  connected: boolean = false;
  count: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider) {
  }

  ionViewDidLoad() {

    HighCharts.setOptions({
      time: {
          timezone: 'Europe/Berlin'
      }
    });

      this.xchart = HighCharts.chart('xValues', {
        chart: {
          type: 'spline',
          zoomType: 'x',
          panning: true,
          panKey: 'shift',
          description: 'Click and drag a window to zoom in! Press  "Shift" and click and drag to move the window.',
        },
        title: {
          text: 'Acceleration of senseBox'
        },
        time: {
          useUTC: false
        },
        xAxis: {
          title: {
            text: 'Time'
          },
          type: 'datetime',
          tickInterval: 10000, // one week
          tickWidth: 0,
          gridLineWidth: 1,
          labels: {
              align: 'left',
              x: 3,
              y: -3
          }
        },
        yAxis: {
          title: {
            text: 'G-Force'
          }
        },
        plotOptions: {
          series: {
              marker: {
                  enabled: false
              }
          }
      },
        series: [{
            name: "X-Axis",
            data: [],
          },
          {
            name: "Y-Axis",
            data: [],
          },
          {
            name: "Z-Axis",
            data: [],
          },
          { name: "Total",
            data: [],
          }]
      });

      this.allValChart = HighCharts.chart('allValues', {
        chart: {
          type: 'spline',
          zoomType: 'x',
          panning: true,
          panKey: 'shift',
          description: 'Click and drag a window to zoom in! Press  "Shift" and click and drag to move the window.'
        },
        title: {
          text: 'Full measurement period of senseBox acceleration'
        },
        time: {
          useUTC: false
        },
        xAxis: {
          title: {
            text: 'Time'
          },
          type: 'datetime',
          tickInterval: 10000, // one week
          tickWidth: 0,
          gridLineWidth: 1,
          labels: {
              align: 'left',
              x: 3,
              y: -3
          }
        },
        yAxis: {
          title: {
            text: 'G-Force'
          }
        },
        plotOptions: {
          series: {
              marker: {
                  enabled: false
              },
          turboThreshold: 0
          }
      },
        series: [{
            name: "X-Axis",
            data: this.xdatArray
          },
          {
            name: "Y-Axis",
            data: this.ydatArray
          },
          {
            name: "Z-Axis",
            data: this.zdatArray
          },
          { name: "Total",
            data: this.totDatArray
          }]
      });
    
    // generating random clientID
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();

    // Create a client instance
    this.client = new Paho.MQTT.Client(this.global.mqttip, this.global.websocketsPort, uniqid);  
    

    // set callback handlers
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;

    // connect the this.client
    this.client.connect({onSuccess:this.onConnect.bind(this)});
    console.log(this.client);
    console.log('ionViewDidLoad SenseBoxPage');
  }

  // start subscribing data channel = data starts incoming

  getData() {
    console.log("get" + this.connected);
    if(this.connected){
      this.client.subscribe(this.global.channelName + "/#");  
    }
  }

  // unsubscribe data channel = no data incoming anymore
  stopData() {
    if(this.connected){
      this.client.unsubscribe(this.global.channelName + "/#");
    }
  }
  
  // delete all data from charts and storage arrays
  deleteData() {
    this.xchart.series[0].setData([]);
    this.xdatArray = [];
    this.allValChart.series[0].setData(this.xdatArray);
    this.xchart.series[1].setData([]);
    this.ydatArray = [];
    this.allValChart.series[1].setData(this.ydatArray);
    this.xchart.series[2].setData([]);
    this.zdatArray = [];
    this.allValChart.series[2].setData(this.zdatArray);
    this.totDatArray = [];
    this.xchart.series[3].setData([]);
    this.allValChart.series[3].setData(this.totDatArray);
  }


  // shows all the values that were measured during a measurement period 
  showAllValues() {   
    this.allValChart.series[0].setData(this.xdatArray, false);    
    this.allValChart.series[1].setData(this.ydatArray, false);    
    this.allValChart.series[2].setData(this.zdatArray, false);    
    this.allValChart.series[3].setData(this.totDatArray, false);
    this.allValChart.redraw(false);
  }

   // called when the this.client connects
  onConnect() {
    this.connected = true;
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    console.log(this.client);
  }

  // called when the this.client loses its connection
  onConnectionLost(responseObject) {
    console.log(responseObject);
    if (responseObject.errorCode !== 0) {
      this.connected = false;
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  onMessageArrived = (message) => {
    // console.log("onMessageArrived:", message.destinationName, message.payloadString);
    if(message.destinationName === this.global.channelName + "/x") {
      var timestep = Date.now();
      var pointArray = [timestep, +message.payloadString];
      var series = this.xchart.series[0];
      var shift = series.yData.length > 50;
      this.xchart.series[0].addPoint(pointArray, true, shift, false);
      this.xdatArray.push(pointArray);
      // this.xchart.series[0].setData(this.xdatArray);
    }
    else if(message.destinationName === this.global.channelName + "/y") {
      // this.xchart.series[1].setData(this.ydatArray);
      timestep = Date.now();
      pointArray = [timestep, +message.payloadString];
      series = this.xchart.series[1];
      shift = series.yData.length > 50;
      this.xchart.series[1].addPoint(pointArray, false, shift, false);    
      this.ydatArray.push(pointArray);
    }
    else if(message.destinationName === this.global.channelName + "/z") {
      // this.xchart.series[2].setData(this.zdatArray);
      timestep = Date.now();
      pointArray = [timestep, +message.payloadString];
      series = this.xchart.series[2];
      shift = series.yData.length > 50;
      this.xchart.series[2].addPoint(pointArray, false, shift, false);    
      this.zdatArray.push(pointArray);
    }
    else if(message.destinationName === this.global.channelName + "/tot") {
      // this.xchart.series[3].setData(this.totDatArray);
      timestep = Date.now();
      pointArray = [timestep, +message.payloadString/9.81];
      series = this.xchart.series[3];
      shift = series.yData.length > 50;
      this.xchart.series[3].addPoint(pointArray, false, shift, false);    
      this.totDatArray.push(pointArray);
    }
 
  }

 }



