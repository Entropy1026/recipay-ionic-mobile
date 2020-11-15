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
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification/ngx';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
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
    private push: Push,
    private localNotification: PhonegapLocalNotification,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  ngOnInit() {

    this.storage.get('hasLoggedin').then((val) => {
      if (val) {
        this.setUser();
      }
    });

    this.userService.getUser.subscribe(user => {
      this.user = user;
    });

    const options: PushOptions = {
      android: {
        sound: true,
        vibrate: true,
        icon: '../assets/img/recipaylogo.png'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    };
    // this.push.hasPermission()
    //   .then((res: any) => {
    //     if (res.isEnabled) {
    //       console.log('We have permission to send push notifications');

    //       this.push.createChannel({
    //         id: 'order',
    //         description: 'Event order',
    //         // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
    //         importance: 4
    //       }).then(() => console.log('Channel created'));

    //       const pushObject: PushObject = this.push.init(options);

    //       pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
    //       pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
    //       pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    //     } else {
    //       console.log('We do not have permission to send push notifications');
    //     }
    //   });

    const channel = this.recipayApi.init();
    channel.bind('order', (data: any) => {
      if (this.user.id === data.id) {
        this.push.hasPermission()
          .then((res: any) => {
            if (res.isEnabled) {
              console.log('We have permission to send push notifications');
              this.push.createChannel({
                id: 'order',
                description: 'Event order',
                importance: 4
              }).then(() => console.log('Channel created'));
              const pushObject: PushObject = this.push.init(options);
              pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
              pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
              pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
              console.log(data.message);
              this.localNotification.create('Order Notification', {
                tag: '' + data.message,
                body: '' + data.message,
                icon: '../assets/img/recipaylogo.png'
              });

            } else {
              console.log('We do not have permission to send push notifications');
            }
          });
      }
    });
    channel.bind('message', (data) => {
      // console.log(res);
      if (this.user.id === data.id) {
        this.push.hasPermission()
          .then((res: any) => {
            if (res.isEnabled) {
              console.log('We have permission to send push notifications');
              this.push.createChannel({
                id: 'message',
                description: 'Event message',
                importance: 4
              }).then(() => console.log('Channel created'));
              const pushObject: PushObject = this.push.init(options);
              pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
              pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
              pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

              this.localNotification.create('Message Notification', {
                tag: data.message,
                body: data.message,
                icon: '../assets/img/recipaylogo.png'
              });

            } else {
              console.log('We do not have permission to send push notifications');
            }
          });
      }
    });
  }

  private async setUser() {
    let id = null;
    let firstname = null;
    let lastname = null;
    let middlename = null;
    let username = null;
    let user_type = null;
    let email = null;
    let image = null;
    let mobile = null;
    id = await this.storage.get('id');
    firstname = await this.storage.get('firstname');
    lastname = await this.storage.get('lastname');
    middlename = await this.storage.get('middlename');
    username = await this.storage.get('username');
    user_type = await this.storage.get('user_type');
    email = await this.storage.get('email');
    image = await this.storage.get('image');
    mobile = await this.storage.get('mobile');

    this.storage.get('password').then((val) => {
      this.userService.setPassword(val);
    });

    this.user = {
      id,
      firstname,
      lastname,
      middlename,
      username,
      user_type,
      email,
      image,
      mobile,
    };

    this.userService.setUser(this.user);
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
    this.storage.set('hasLoggedin', false);
    this.storage.set('username', null);
    this.storage.set('firstname', null);
    this.storage.set('lastname', null);
    this.storage.set('middlename', null);
    this.storage.set('mobile', null);
    this.storage.set('email', null);
    this.storage.set('image', null);
    this.storage.set('id', null);
    this.storage.set('user_type', null);
    this.storage.set('password', null);
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    this.menuCtrl.toggle();
    this.router.navigate(['/login']);
  }
}
