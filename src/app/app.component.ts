import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './client/app-data/user.service';
import { User } from './client/models/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import * as firebase from 'firebase';
import { RecipayApiService } from './client/api/recipay-api.service';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  user: User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private menuCtrl: MenuController,
    private router: Router,
    private recipayApi: RecipayApiService,
    private push: Push
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.userService.getUser.subscribe(user => {
      this.user = user;
    });
    console.log(this.user);
  }

  ionViewDidLoad() {
    const channel = this.recipayApi.init();
    channel.bind('buy', ({ res }) => {
      const options: PushOptions = {
        android: {
          senderID: ''
        },
        ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
        }
      };
      const pushObject: PushObject = this.push.init(options);
      pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
      pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onClickLogout() {
    this.userService.setUser(null);
    this.userService.setPassword(null);
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    this.menuCtrl.toggle();
    this.router.navigate(['/login']);
  }
}
