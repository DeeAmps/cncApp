import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { ControlPage } from "../pages/control/control";
import { UploadPage } from "../pages/upload/upload";
import{ BluetoothSerial } from '@ionic-native/bluetooth-serial'



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ControlPage,
    UploadPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ControlPage,
    UploadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
