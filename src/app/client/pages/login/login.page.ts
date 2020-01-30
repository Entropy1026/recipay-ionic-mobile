import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, AlertController, ToastController } from '@ionic/angular';
import { RecipayApiService } from '../../api/recipay-api.service';
import { UserService } from '../../app-data/user.service';
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
    public toastCtrl: ToastController,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.swipeGesture(false);
  }

  onClickLogin() {
    if (this.validate()) {
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

      setTimeout(() => {
        this.recipayApi.login(params).subscribe(res => {
          if (res.error) {
            this.alertCtrl.create({
              message: res.message,
              buttons: ['Okay']
            }).then(overlay => {
              overlay.present();
            });
          } else {
            if (res.data.user_type === 'client') {
              this.userService.setUser(res.data);
              this.userService.setPassword(this.password.trim());
              this.router.navigate(['/home']);
            }
            if (res.data.user_type === 'carrier') {
              this.userService.setUser(res.data);
              this.router.navigate(['/carrier']);
            }
          }
        },
          (err) => {
            this.toastCtrl.create({
              message: 'Error:' + err,
              duration: 2000
            });
            this.loading.dismiss();
          },
          () => {
            this.loading.dismiss();
          }
        );
      }, 1000);
    }
  }

  validate() {
    let valid = true;
    if (!this.username) {
      this.toastCtrl.create({
        message: 'Please enter username.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    } else if (!this.password) {
      this.toastCtrl.create({
        message: 'Please enter password.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    }
    return valid;
  }

}
