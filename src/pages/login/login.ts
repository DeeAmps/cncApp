import { Component } from "@angular/core";
import { NavController, AlertController, MenuController, LoadingController} from "ionic-angular";
import { HomePage } from "../home/home";
import { RegisterPage } from "../register/register";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service"


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: string = '';
  password:string = '';
  constructor(public navCtrl: NavController, public alert: AlertController, public menu: MenuController, public auth: FirebaseServiceProvider, public  loadCtrl: LoadingController) {
    this.menu.swipeEnable(false);
  }

  presentAlert(msg){
    const alert =  this.alert.create({
      message: msg,
      buttons: ['OK']
    });
    alert.present();
  }


  register() {
    this.navCtrl.setRoot(RegisterPage);
  }

  login() {
    if(this.email.length == 0 || this.password.length == 0){
      this.presentAlert("Email and Password are required to Login")
    }
    else{
      let loading = this.loadCtrl.create({
        content: 'Signing you In....'
      });
      loading.present();
      let credentials = {
        email: this.email,
        password: this.password
      };
      this.auth.signInWithEmail(credentials)
        .then(
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


}
