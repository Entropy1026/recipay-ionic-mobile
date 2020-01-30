import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/client/app-data/user.service';
import { User } from 'src/app/client/models/user';
import { ToastController, LoadingController } from '@ionic/angular';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user: User;
  loading;

  constructor(
    private recipayApi: RecipayApiService,
    private userService: UserService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.initAccount();
  }

  initAccount() {
    this.userService.getUser.subscribe(user => this.user = user);
  }

  updateInformation() {
    if (this.validate()) {

      this.loadingCtrl.create({
        message: 'Updating information...'
      }).then(overlay => {
        this.loading = overlay;
        overlay.present();
      });

      let params = {
        id: this.user.id,
        fname: this.user.firstname.trim(),
        lname: this.user.lastname.trim(),
        mname: this.user.middlename.trim(),
        username: this.user.username.trim(),
        mobile: this.user.mobile.trim()
      };

      setTimeout(() => {
        this.recipayApi.updatePersonalInfo(params).subscribe(res => {
          if (!res.error) {
            this.toastCtrl.create({
              message: 'Successfully updated information, Please relogin to take effect.',
              duration: 2000
            }).then(overlay => {
              overlay.present();
            });
          } else {
            this.toastCtrl.create({
              message: 'There is an error while updating your information, please try again.',
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
    if (!this.user.username) {
      this.toastCtrl.create({
        message: 'Please enter username.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    } else if (!this.user.firstname) {
      this.toastCtrl.create({
        message: 'Please enter first name.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    } else if (!this.user.middlename) {
      this.toastCtrl.create({
        message: 'Please enter middle name.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    } else if (!this.user.lastname) {
      this.toastCtrl.create({
        message: 'Please enter last name.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    } else if (!this.user.mobile) {
      this.toastCtrl.create({
        message: 'Please enter mobile number.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    }

    return valid;
  }

}
