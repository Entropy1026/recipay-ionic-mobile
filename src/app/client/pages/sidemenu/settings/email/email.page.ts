import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/client/app-data/user.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/client/models/user';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],
})
export class EmailPage implements OnInit {

  currentEmail;
  newEmail;
  confirmNewEmail;
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
    this.initEmail();
  }

  initEmail() {
    this.userService.getUser.subscribe(user => {
      if (user) {
        this.user = user;
        this.currentEmail = this.user.email;
      }
    });
    this.userService.getPassword.subscribe(pass => {
      if (pass) {
        this.password = pass;
      }
    });
  }

  updateEmail() {
    if (this.validate()) {

      this.loadingCtrl.create({
        message: 'Updating email address...'
      }).then(overlay => {
        this.loading = overlay;
        overlay.present();
      });

      let params = {
        id: this.user.id,
        email: this.newEmail.trim(),
      };

      setTimeout(() => {
        this.recipayApi.updateEmailInfo(params).subscribe(res => {
          if (!res.error) {
            this.toastCtrl.create({
              message: 'Successfully updated email, Please relogin to take effect.',
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
    if (!this.currentEmail) {
      this.toastCtrl.create({
        message: 'Please your current email address.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    } else if (!this.newEmail) {
      this.toastCtrl.create({
        message: 'Please enter new email.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    } else if (!this.confirmNewEmail) {
      this.toastCtrl.create({
        message: 'Please enter confirmation email.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    } else if (this.currentEmail !== this.user.email) {
      this.toastCtrl.create({
        message: 'Please your current email address.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    } else if (this.newEmail !== this.confirmNewEmail) {
      this.toastCtrl.create({
        message: 'New email address does not match.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    }

    return valid;
  }

}
