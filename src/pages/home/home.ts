import { Component } from '@angular/core';
import { AlertController, LoadingController, Platform, NavController } from 'ionic-angular';
import { ControlPage } from '../control/control';
import { UploadPage } from '../upload/upload';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import {LoginPage} from "../login/login";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service"


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tab1Root: any = ControlPage;
  tab2Root: any = UploadPage;
  output:any;
  message:String;
  responseTxt:any;
  unpairedDevices: any;
  pairedDevices: any;
  statusMessage: string;
  gettingDevices: Boolean;

  constructor(
              public loadCtrl : LoadingController,
              private alertCtrl: AlertController,
              public plt: Platform,
              private bluetoothSerial: BluetoothSerial,
              public auth: FirebaseServiceProvider,
              private navCtrl : NavController
  ) {
    bluetoothSerial.enable();
  }

  success = (data) => alert(data);
  fail = (error) => alert(error);

  ShowAvailableBluetoothDevices(){
    let alert = this.alertCtrl.create();
    this.bluetoothSerial.isEnabled()
      .then(() => {
        alert.setTitle('Available Bluetooth Devices');
        let loading = this.loadCtrl.create({
          content: 'Searching Bluetooth Devices...',
        });
        loading.present();
        this.plt.ready().then((readySource) => {
          console.log("Platform ready " , readySource);
          this.pairedDevices = null;
          this.unpairedDevices = null;
          this.gettingDevices = true;
          this.bluetoothSerial.setDeviceDiscoveredListener().subscribe((dev) => {
            console.log("FOUND DEVICE ", dev);
            this.bluetoothSerial.discoverUnpaired().then((success) => {
                console.log("in here!!");
                this.unpairedDevices = success;
                this.gettingDevices = false;
                success.forEach(element => {
                  console.log(element);
                  alert.addInput({
                    type: 'radio',
                    label: element,
                    value: element
                  })
                });
                alert.addButton('Cancel');
                alert.addButton({
                  text: 'OK',
                  handler: data => {
                    console.log(data);
                    // this.navCtrl.push(ListBooksPage, { "ListName" : data })
                  }
                });
                loading.dismiss();
                alert.present();
              },
              (err) => {
                console.log(err);
                loading.dismiss();
              });
            this.bluetoothSerial.list().then((success) => {
                this.pairedDevices = success;
              },
              (err) => {
                console.log(err);
              })
          });
        })
          .catch((er) => {
            console.log("NOT ENABLED " , er);
          })


          });

    }

  Logout(){
    this.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }
}
