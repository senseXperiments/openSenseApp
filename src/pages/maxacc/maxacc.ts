import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Paho } from 'ng2-mqtt/mqttws31';
import * as HighCharts from 'highcharts';
import { GlobalProvider } from "../../providers/global/global";
import { SaveChecksProvider } from '../../providers/save-checks/save-checks';
import {Storage} from "@ionic/storage";


/**
 * Generated class for the MaxaccPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maxacc',
  templateUrl: 'maxacc.html'
})
export class MaxaccPage {
  cards: any;
  category: string = 'gear';
  hideMe: boolean = false;
  showPlayers: boolean = true;
  boxData: any;
  client: any;
  message: any;
  maxOne: number = 0;
  maxTwo: number = 0;
  chart: any;
  player = {name: "none", val: 0, disabled: false};
  todos = [{name: this.global.username, val: 0, disabled: false}, {name: "Player 2", val: 0, disabled: false}];
  scores = [];
  newItem = "";
  gameRunning = false;
  winner = {name : "", val: 0};
  showTooltip: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider, public toastCtrl: ToastController, public saveChecks: SaveChecksProvider, public storage: Storage) {
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
            text: 'Seconds'
          },
          type: 'datetime',
          dateTimeLabelFormats: {
            second: '%S',
          } ,        
          tickInterval: 1000, // one week
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
            text: 'm/s&#178;',
            useHTML: true
          }
        },
        tooltip: {
          enabled: this.global.showTooltip
        },
        plotOptions: {
          series: {
              marker: {
                  enabled: false
              }, 
              states: {
                hover: {
                  enabled: false
                }
              }
          }
        },
        series: [
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

  /* shows Introduction slides */
  showIntroduction() {
    this.navCtrl.push('GameIntroPage');
  }

  /* save and create new player */
  saveNew(item) {
    var newPlayer = {name: item, val: 0, disabled: false};
    this.todos.push(newPlayer);
    this.cancelNew();
  }

  /* cancel creation of new player */
  cancelNew() {
    this.hideMe = false;
    this.newItem = '';
  }

  /* toggle-display input for new player */
  hideAddPlayer() {
    // if input is hided display it 
    if (this.hideMe){
      this.hideMe = false;
    }
    // otherwise hide it 
    else this.hideMe = true;
  }

  togglePlayButton() {
    if (this.showPlayers){
      this.showPlayers = false;
    }
    // otherwise hide it 
    else this.showPlayers = true;
  }

  /* creates Toast for impatiently players */
  async gameRunningAlert(name) {
      let toast = this.toastCtrl.create({
        message: 'Sorry ' + name + ' there is still someone playing. Please wait until he or she finished his game time.' ,
        duration: 3000,
        position: 'middle'
      });
      toast.present();
    }

    async winnerIs() {
      if(this.winner.name == ""){
        let toast = this.toastCtrl.create({
          message: "Oops! You need to start the game first before I can determine who has won!",
          showCloseButton: true,
          position: 'middle'
        });
        toast.present();
       
        }
      else{
        let toast = this.toastCtrl.create({
          message: "And the winner is " + this.winner.name + " with a maximum acceleration of " + this.winner.val + "m/s^2",
          showCloseButton: true,
          position: 'middle'
        });
        toast.present();
        // {
        //   this.storage.ready().then(() => 
        //   this.storage.get('highscoreList').then((result)=> {
        //     console.log(result);
        //       var array = result.push(this.scores[0]);
        //       this.storage.set('highscoreList', array);
        //   }))
        // }
      }
    }

    deletePlayer(idx) {
      this.todos.splice(idx,idx);
    }

  /* starts the game for one player */
  play(item) {
    // if there is already some player playing, give toast with wait instructions
    if(this.gameRunning){
      this.gameRunningAlert(item.name);
    }
    // otherwise play
    else{
      // game is Running
      this.gameRunning = true;
      // disable start button for current player
      item.disabled = "true";
      // set current player to player that was started by button click
      this.player = item;
      // add a series with player name as id and name and empty data 
      this.chart.addSeries({
        id: item.name,
        name: item.name,
        data: [],
        pointInterval: 100
      })
      // add another series with player name + 'total' as id and name + ' Accumulated' as name and empty data 
      // this.chart.addSeries({
      //   id: item.name + "total",
      //   name: item.name + " Accumulated",
      //   data: [],
      //   pointInterval: 100
      // })
      //subscribe to global channelname
      this.client.subscribe(this.global.channelName + "/#");
      // wait 5 seconds
      setTimeout( () => {
        // unsubscribe global channelname
        this.client.unsubscribe(this.global.channelName + "/#");
        // set maximum value of series to high score
        var highscore = Math.max(Math.abs(this.chart.get(item.name).dataMax), Math.abs(this.chart.get(item.name).dataMin));
        if(highscore > this.winner.val){
          this.winner.val=highscore;
          this.winner.name = item.name;
        }
        item.val = highscore;
        this.scores = this.todos; 
        this.scores.sort(function(a, b){return b.val - a.val});

        // reset current player variable
        this.player = {name: "none", val: 0, disabled: false};
        // game time is over next player allowed to play
        this.gameRunning = false;
      }, 5000);
    }
  }

  /* resets the game */
  resetGame() {
    // reset all highscores and re-enable start buttons
    for(var i = 0; i < this.chart.series.length/2; i++){
      this.todos[i].val = 0;
      this.todos[i].disabled = false; 
    }
    // remove all series from chart
    while(this.chart.series.length > 0)
    this.chart.series[0].remove(true);

    this.gameRunning = false;
    this.winner = {name : "", val: 0};  
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
        var totalSeries =  this.chart.get(this.player.name 
          // + "total"
          );
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
      // }
      // else if(message.destinationName === this.global.channelName + "/y") {
      //   var series = this.chart.get(this.player.name);
      //   pointArray = 
      //   // [timestep, 
      //     +message.payloadString*9.81;
      //   // ];
      //   series.addPoint(pointArray, true, false, false);
      //   // this.pOneYDatArray.push(pointArray); 
      //   // this.pOneYDatArray.push(+message.payloadString * 9.81);
      //   // this.chart.series[1].setData(this.pOneYDatArray);
      } 
    }    
  }
}
