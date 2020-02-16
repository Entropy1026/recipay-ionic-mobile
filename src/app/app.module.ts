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
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { Camera } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import { File } from '@ionic-native/file/ngx';
import { environment } from '../environments/environment';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AngularFireAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    RecipayApiService,
    PayPal,
    AngularFireStorage,
    Camera,
    File,
    { provide: BUCKET, useValue: environment.firebase.storageBucket },
    Facebook,
    AngularFireAuth,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
