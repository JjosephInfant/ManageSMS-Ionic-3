import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';

declare var SMS: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if (SMS) SMS.startWatch(() => {
        console.log('watching started');
        this.presentAlert("Alert",'watching started');
      }, Error => {
        console.log('failed to start watching');
        this.presentAlert("Alert",'failed to start watching');
      });

      document.addEventListener('onSMSArrive', (e: any) => {
        var sms = e.data;
        console.log(sms);
        this.presentAlert("SMS recieved ", "From ->"+sms.address+" Message is ->"+sms.body);
      });
    });
  }

  presentAlert(title, msg) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}

