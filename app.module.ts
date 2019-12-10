import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './services/authentication.service';
import { AngularFireAuthModule } from '@angular/fire/auth';

import * as firebase from 'firebase';
import { ReactiveFormsModule } from '@angular/forms';

import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), ReactiveFormsModule, AppRoutingModule, AngularFireAuthModule],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    File,
    Camera
],
  bootstrap: [AppComponent]
})
export class AppModule {}
