import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/client/models/user';
import { UserService } from 'src/app/client/app-data/user.service';
import { ToastController } from '@ionic/angular';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.page.html',
  styleUrls: ['./picture.page.scss'],
})
export class PicturePage implements OnInit {

  user: User;

  constructor(
    private recipayApi: RecipayApiService,
    private userService: UserService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.initPicture();
  }

  initPicture() {
    this.userService.getUser.subscribe(user => this.user = user);
  }

  updatePicture() {
    this.toastCtrl.create({
      message: 'hhelo'
    }).then(overlay => {
      overlay.present();
    });
  }

}
