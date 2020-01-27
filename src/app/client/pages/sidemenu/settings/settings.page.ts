import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/client/app-data/user.service';
import { User } from 'src/app/client/models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user: User;
  title;
  description;

  constructor(
    private userData: UserService
  ) { }

  ngOnInit() {
    this.initSettings();
  }

  initSettings() {
    this.userData.getUser.subscribe(user => this.user = user);
  }

}
