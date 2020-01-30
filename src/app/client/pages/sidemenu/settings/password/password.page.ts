import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/client/models/user';
import { UserService } from 'src/app/client/app-data/user.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  currentPassword;
  newPassword;
  confirmNewPassword;
  user: User;
  loading;
  password;

  constructor(
    private recipayApi: RecipayApiService,
    private userService: UserService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.initPassword();
  }

  initPassword() {
    this.userService.getUser.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
    this.userService.getPassword.subscribe(pass => {
      this.password = pass;
    });
  }

  updatePassword() {
    if (this.validate()) {

      this.loadingCtrl.create({
        message: 'Updating password...'
      }).then(overlay => {
        this.loading = overlay;
        overlay.present();
      });

      let params = {
        id: this.user.id,
        username: this.user.username.trim(),
        password: this.newPassword.trim()
      };

      setTimeout(() => {
        this.recipayApi.updatePasswordInfo(params).subscribe(res => {
          if (!res.error) {
            this.toastCtrl.create({
              message: 'Successfully updated password, Please relogin to take effect.',
              duration: 2000
            }).then(overlay => {
              overlay.present();
            });
          } else {
            this.toastCtrl.create({
              message: 'There is an error while updating your email address, please try again.',
              duration: 2000
            }).then(overlay => {
              overlay.present();
            });
          }
        },
          (err) => {
            this.loading.dismiss();
          },
          () => {
            this.loading.dismiss();
          });
      }, 1000);
    }
  }

  validate() {
    let valid = true;
    if (!this.currentPassword) {
      this.toastCtrl.create({
        message: 'Please your current password.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    } else if (!this.newPassword) {
      this.toastCtrl.create({
        message: 'Please enter new password.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    } else if (!this.confirmNewPassword) {
      this.toastCtrl.create({
        message: 'Please enter confirmation password.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    } else if (this.currentPassword !== this.password) {
      this.toastCtrl.create({
        message: 'Please your current password.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    } else if (this.newPassword !== this.confirmNewPassword) {
      this.toastCtrl.create({
        message: 'New password does not match.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    }

    return valid;
  }

}
