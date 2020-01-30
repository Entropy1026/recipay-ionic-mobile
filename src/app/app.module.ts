import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipayApiService } from './client/api/recipay-api.service';
import { HttpClientModule } from '@angular/common/http';
import { PayPal } from '@ionic-native/paypal/ngx';
import { Firebase } from '@ionic-native/firebase';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

const firebase = {
  apiKey: 'AIzaSyBPVjsxZ_7zFEKrl4B4yh79-7TvkzpByac',
  // authDomain: "project-id.firebaseapp.com",
  databaseURL: 'https://recipaymobile.firebaseio.com/',
  projectId: 'recipaymobile',
  storageBucket: 'gs://recipaymobile.appspot.com',
  // messagingSenderId: "sender-id",
  appId: '1:509103223362:android:7ce2b6e346a06895e533db',
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    RecipayApiService,
    PayPal,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
