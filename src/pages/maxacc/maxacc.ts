import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Paho } from 'ng2-mqtt/mqttws31';
import * as HighCharts from 'highcharts';
import { GlobalProvider } from "../../providers/global/global";


/**
 * Generated class for the MaxaccPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maxacc',
  templateUrl: 'maxacc.html',
})
export class MaxaccPage {

  hideMe: boolean = false;
  boxData: any;
  client: any;
  message: any;
  // pOneDatArray = [];
  // pTwoDatArray = [];
  // pOneYDatArray = [];
  // pTwoYDatArray = [];
  maxOne: number = 0;
  maxTwo: number = 0;
  chart: any;
  player = {name: "none", val: 0};
  todos = [{name: "Player 1", val: 0}, {name: "Player 2", val: 0}];
  toggleNew: boolean = false;
  newItem = {name: "", val: 0};

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider) {
  }

  ionViewDidLoad() {

      this.chart = HighCharts.chart('values', {
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
            text: 'm/s^2'
          }
        },
        series: [
        // {
        //     name: "Player 1 Total",
        //     data: this.pOneDatArray
        //   },
        //   {
        //     name: "Player 1 Y-Axis",
        //     data: this.pOneYDatArray
        //   },
        //   {
        //     name: "Player 2 Total",
        //     data: this.pTwoDatArray
        //   },
        //   {
        //     name: "Player 2 Y-Axis",
        //     data: this.pTwoYDatArray
        //   }
          ]
      });
    

    // Create a client instance
    this.client = new Paho.MQTT.Client(this.global.mqttip, 11883, "clienId");
    

    // set callback handlers
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;

    // connect the this.client
    this.client.connect({onSuccess:this.onConnect.bind(this)});
    console.log(this.client);
    console.log('ionViewDidLoad MaxAccPage');
  }

  play(item) {
    this.player = item;
    this.chart.addSeries({
      id: item.name,
      name: item.name,
      data: []
    })
    this.chart.addSeries({
      id: item.name + "total",
      name: item.name + " Accumulated",
      data: []
    })
    this.client.subscribe(this.global.channelName + "/#");
    setTimeout( () => {
      this.client.unsubscribe(this.global.channelName + "/#");
      item.val = this.chart.get(this.player.name).dataMax;
      this.player = {name: "none", val: 0};
    }, 5000);
  }

  // playerOne() {
  //   this.player = "one";
  //   this.client.subscribe(this.global.channelName + "/#");
  //   setTimeout( () => {
  //     this.client.unsubscribe(this.global.channelName + "/#");
  //     this.player = "none";
  //   }, 5000);
    
  // }

  // playerTwo() {
  //   this.player = "two";
  //   this.client.subscribe(this.global.channelName + "/#");
  //   setTimeout( () => {
  //     this.client.unsubscribe(this.global.channelName + "/#");
  //     this.player = "none";
  // }, 5000);
  // }

  deleteData() {
    this.chart.destroy();
    // this.pOneDatArray = [];
    // this.chart.series[0].setData(this.pOneDatArray);
    // this.pOneYDatArray = [];
    // this.chart.series[1].setData(this.pOneYDatArray);
    // this.pTwoYDatArray = [];
    // this.chart.series[2].setData(this.pTwoYDatArray);
    // this.pTwoDatArray = [];
    // this.chart.series[3].setData(this.pTwoDatArray);
    // this.maxOne = 0;
    // this.maxTwo = 0;
  }

  hide() {

    if (this.hideMe){
      this.hideMe = false;
    }
    else this.hideMe = true;
  }

   // called when the this.client connects
  onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    console.log(this.client);
  }

  // called when the this.client loses its connection
  onConnectionLost(responseObject) {
    console.log(responseObject);
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  onMessageArrived = (message) => {
    console.log("onMessageArrived:", message.destinationName, message.payloadString);
    if(this.player.name != "none"){
      
      // var timestep = Date.now();
      if(message.destinationName === this.global.channelName + "/tot"){
        var totalSeries =  this.chart.get(this.player.name + "total");
        var pointArray = 
        // [timestep, 
          +message.payloadString
        // ];
        totalSeries.addPoint(pointArray, true, false, false);
        // this.pOneDatArray.push(pointArray); 
        // if(this.maxOne < +message.payloadString) {
        //   this.maxOne = +message.payloadString;
        // }
        // this.chart.series[0].setData(this.pOneDatArray);
      }
      else if(message.destinationName === this.global.channelName + "/y") {
        var series = this.chart.get(this.player.name);
        pointArray = 
        // [timestep, 
          +message.payloadString*9.81;
        // ];
        series.addPoint(pointArray, true, false, false);
        // this.pOneYDatArray.push(pointArray); 
        // this.pOneYDatArray.push(+message.payloadString * 9.81);
        // this.chart.series[1].setData(this.pOneYDatArray);
      } 
    }    
  }
}
