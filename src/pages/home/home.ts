import { Component } from '@angular/core';
import { AlertController, LoadingController, Platform, NavController, ToastController  } from 'ionic-angular';
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
  message: String;
  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices = false;
  devices: any[];
  showDevices: any = [];

  constructor(
    public loadCtrl: LoadingController,
    private alertCtrl: AlertController,
    public plt: Platform,
    private bluetoothSerial: BluetoothSerial,
    public auth: FirebaseServiceProvider,
    private navCtrl: NavController,
    public toastController: ToastController
  ) {
    bluetoothSerial.enable();
  }

  success = (data) => alert(data);
  fail = (error) => alert(error);

  selectDevice(address: any) {
    let alert = this.alertCtrl.create({
      title: 'Connect',
      message: "Connect with device?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            alert.dismiss();
          }
        },
        {
          text: 'Connect',
          handler: () => {
            let loading = this.loadCtrl.create({
              content: 'Connection device..',
            });
            loading.present();
            this.bluetoothSerial.connect(address).subscribe(() => {
              loading.dismiss();
              this.presentToast("Successfully Connected to Bluetooth Device")
            }, (err) => {
              loading.dismiss();
              this.presentToast("Bluetooth Connection Failed! " + err)
            });
          }
        }
      ]
    });
    alert.present();
  }

  disconnect() {
    let alert = this.alertCtrl.create({
      title: 'Disconnect?',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            alert.dismiss();
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
            this.gettingDevices=null;
          }
        }
      ]
    });
    alert.present();
  }

  presentToast(msg){
    let toast = this.toastController.create({
      message: msg,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'OK'
    });
    toast.present();
  }

  presentAlert(msg){
    const alert =  this.alertCtrl.create({
      message: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }

    return false;
  }

  ShowAvailableBluetoothDevices(){
    this.pairedDevices = null;
    this.unpairedDevices = null;

    let loading = this.loadCtrl.create({
      content: 'Searching Bluetooth Devices...',
    });
    loading.present();
    setTimeout(() => {
      if(this.showDevices.length <= 0){
        loading.dismiss()
        this.bluetoothSerial.clear()
        this.presentAlert("No Bluetooth Devices Found.")
      }
    }, 30000)
    this.bluetoothSerial.discoverUnpaired().then((success) => {
        this.unpairedDevices = success;
        let alert = this.alertCtrl.create();
        alert.setTitle('Available Bluetooth Devices');
        success.forEach(element => {
          this.gettingDevices = true;
          if(element.address && !this.containsObject(element, this.showDevices)){
            this.showDevices.push(element)
          }
        });
        loading.dismiss()
        this.removeDuplicates(this.showDevices, "name").forEach((item) => {
          alert.addInput({
            type: 'radio',
            label: item.name,
            value: item.address
          })
        })
        alert.addButton('Cancel');
        alert.addButton({
          text: 'OK',
          handler: data => {
            this.selectDevice(data)
          }
        });
        alert.present();
      },
      (err) => {
        loading.dismiss();
        this.presentToast(err)
        console.log(err);
      })
  }

  Logout(){
    this.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

}


