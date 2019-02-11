import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { AlertController } from 'ionic-angular';

declare var SMS: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public androidPermissions: AndroidPermissions, public platform: Platform, private alertCtrl: AlertController) {

  }

  ionViewWillEnter() {

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
      success => console.log('Permission granted'),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);

    this.platform.ready().then((readySource) => {

      // if (SMS) SMS.startWatch(() => {
      //   console.log('watching started');
      //   this.presentAlert("Alert",'watching started');
      // }, Error => {
      //   console.log('failed to start watching');
      //   this.presentAlert("Alert",'failed to start watching');
      // });

      // document.addEventListener('onSMSArrive', (e: any) => {
      //   var sms = e.data;
      //   console.log(sms);
      //   this.presentAlert("SMS recieved ", "From ->"+sms.address+" Message is ->"+sms.body);
      // });

    });
  }

  SendMySMS() {

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
      success => console.log('Permission granted'),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SEND_SMS]);

    this.platform.ready().then((readySource) => {

      if (SMS) SMS.sendSMS("+919884950017", "SMS from App to test", () => {
        console.log("Sent");
        this.presentAlert("Alert",'SMS Sent');
      }, Error => {
        console.log("Error occurs")
        this.presentAlert("Alert",'SMS not sent '+Error);
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
