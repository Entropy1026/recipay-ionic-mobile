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
    private localNotification: PhonegapLocalNotification
  ) {
    this.initializeApp();
  }

  ngOnInit() {
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
                tag:  '' + data.message,
                body: '' + data.message ,
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
