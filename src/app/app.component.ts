import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './client/app-data/user.service';
import { User } from './client/models/user';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.userService.getUser.subscribe(user => {
      this.user = user;
    });
    console.log(this.user);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onClickLogout() {
    this.menuCtrl.toggle();
    this.userService.setUser(null);
    this.router.navigate(['/login']);
  }
}
