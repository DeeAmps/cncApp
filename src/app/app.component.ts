import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";

import { FirebaseServiceProvider } from "../providers/firebase-service/firebase-service"

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: FirebaseServiceProvider
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},
    ];
  }

  initializeApp() {
    // this.logout()
    this.platform.ready().then(() => {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
      });

      this.auth.afAuth.authState
        .subscribe(
          user => {
            if (user) {
              this.rootPage = HomePage;
            } else {
              this.rootPage = LoginPage;
            }
          },
          () => {
            this.rootPage = LoginPage;
          }
        );
    });
  }

  logout() {
    this.auth.signOut();
    this.nav.setRoot(LoginPage);
  }

}
