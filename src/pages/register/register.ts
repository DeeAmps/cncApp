import {Component} from "@angular/core";
import { NavController, AlertController, LoadingController } from "ionic-angular";
import {LoginPage} from "../login/login";
import { HomePage } from "../home/home";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service"


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(public navCtrl: NavController,
              public alert: AlertController, public auth: FirebaseServiceProvider,
              public loadCtrl: LoadingController) {
    
  }

  presentAlert(msg){
    const alert =  this.alert.create({
      message: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  register() {
    if(this.email.length == 0 || this.password.length == 0 || this.name.length == 0){
        this.presentAlert('Email, Password and Name is required');
        return;
    }
    else if (this.password.length < 6){
      this.presentAlert('Password must be at least 6 characters long');
      return;
    }
    else if(!this.validateEmail(this.email)){
      this.presentAlert('Please enter a valid Email');
      return;
    }
    else{
      let loading = this.loadCtrl.create({
        content: 'Signing you Up....'
      });
      loading.present();
      let credentials = {
        email: this.email,
        password: this.password
      }
      this.auth.signUp(credentials).then(
        () => {
          loading.dismiss();
          this.navCtrl.setRoot(HomePage)
        },
        (error) => {
          loading.dismiss();
          this.presentAlert(error.message)
        }
      );
    }
  }

  login() {
    this.navCtrl.setRoot(LoginPage);
  }
}
