import {Component, ViewChild} from "@angular/core";
import {Platform, Nav, AlertController} from "ionic-angular";
import {StatusBar, Push, Splashscreen} from "ionic-native";
import {TabsPage} from "../pages/tabs/tabs";
import {DetailsPage} from "../pages/details/details";
import {ServerService} from "./server.service";

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [ServerService]
})

export class Ionic2PushApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(public platform: Platform,
              public alertCtrl: AlertController, public serverService: ServerService) {
    this.rootPage = TabsPage;

    //Function to save the device token to server
    function addDeviceToken(tokenID){
       var newToken = {
        token: tokenID
       }

      serverService.addToken(newToken);
    }

    platform.ready().then(() => {
      // After the platform is ready and our plugins are available
      //Intialize push service
      StatusBar.styleDefault();
      Splashscreen.hide();
      let push = Push.init({
        android: {
          //senderId of your project on FCM
          senderID: "1024972771000"
        },
        ios: {
          //Whether you allow alert, badge/ alert/ sound
          alert: true,
          badge: true,
          sound: true
        },
        windows: {}
      });

      //Register this device
      push.on('registration', (data) => {
        console.log("device token ->", data.registrationId);

        //Get the old RegistrationID of this device
        var oldRegId = localStorage.getItem('registrationId');

        //Check whether this is a new device or
        //the RegisterationId of this device changed because reinstalling
        if (oldRegId !== data.registrationId) {
         // Save new registrationID to localstorage
         localStorage.setItem('registrationId', data.registrationId);

         console.log(localStorage.getItem('registrationId'));
         //Save new registerationID to the server
         addDeviceToken(data.registrationId);
        }
      });

      push.on('notification', (data) => {
        console.log('message', data.message);
        let self = this;
        //Define the callback function when app is open in the foreground
        if (data.additionalData.foreground) {
          // if in the foreground, show alert
          let confirmAlert = this.alertCtrl.create({
            title: 'New Notification',
            message: data.message,
            buttons: [{
              text: 'Ignore',
              role: 'cancel'
            }, {
              text: 'View',
              handler: () => {
                //define function when the user click "view"
                self.nav.push(DetailsPage, {message: data.message});
              }
            }]
          });
          confirmAlert.present();
        } else {
          //Define the callback function for user clicking on push notification directly
          //when app is open in the foreground

          var pastPushSavedID = window.localStorage.getItem("pastPushSavedID");

          if (data.additionalData.id !== pastPushSavedID){
            window.localStorage.setItem("pastPushSavedID", data.additionalData.id);
            let confirmAlert = this.alertCtrl.create({
            title: 'New Notification',
            message: data.message,
            buttons: [{
              text: 'Ignore',
              role: 'cancel'
            }, {
              text: 'View',
              handler: () => {
                //define function when the user click "view"
                self.nav.push(DetailsPage, {message: data.message});
              }
            }]
          });
          confirmAlert.present();
          console.log("Push notification clicked");
          }
        }
      });

      push.on('error', (e) => {
        console.log(e.message);
      });

    });
  }
}

