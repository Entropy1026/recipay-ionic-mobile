import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, AlertController } from '@ionic/angular';
import { RecipayApiService } from '../../api/recipay-api.service';
import { UserService } from '../../api/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;
  loading;

  constructor(
    private recipayApi: RecipayApiService,
    private loadingCtrl: LoadingController,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.swipeGesture(false);
  }

  onClickLogin() {
    this.loadingCtrl.create({
      message: 'Signing in...'
    }).then(overlay => {
      this.loading = overlay;
      overlay.present();
    });

    const params = {
      username: this.username.trim(),
      password: this.password.trim()
    };
    this.recipayApi.login(params).subscribe(res => {
      if (res.error) {
        this.alertCtrl.create({
          message: res.message,
          buttons: ['Okay']
        }).then(overlay => {
          overlay.present();
        });
      } else {
        this.userService.setUser(res.data);
        this.router.navigate(['/home']);
      }
    },
      (err) => {
        this.loading.dismiss();
      },
      () => {
        this.loading.dismiss();
      }
    );
  }

}
