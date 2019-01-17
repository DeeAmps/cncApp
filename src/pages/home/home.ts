import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ControlPage } from '../control/control';
import { UploadPage } from '../upload/upload';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tab1Root: any = ControlPage;
  tab2Root: any = UploadPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadCtrl : LoadingController, 
    private alertCtrl: AlertController) {

  }

  dismiss(loading){
    
  }

  ShowAvailableBluetoothDevices(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Available Bluetooth Devices');
    let loading = this.loadCtrl.create({
      content: 'Searching Bluetooth Devices...',
    });
    loading.present();
    setTimeout(function() {
      loading.dismiss();
      alert.present();
    }, 3000);
    // this.bookApi.getListNames().subscribe( data => {
    //   this.listNames = data
    //   this.listNames.results.forEach(element => {
    //     alert.addInput({
    //       type: 'radio',
    //       label: element.display_name,
    //       value: element.list_name_encoded
    //     })
    //   });
    //   alert.addButton('Cancel');
    // alert.addButton({
    //   text: 'OK',
    //   handler: data => {
    //     this.navCtrl.push(ListBooksPage, { "ListName" : data })
    //   }
    // });
    
    
    //})
  }

}
