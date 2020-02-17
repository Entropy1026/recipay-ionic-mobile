import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, AlertController, ToastController } from '@ionic/angular';
import { RecipayApiService } from '../../api/recipay-api.service';
import { UserService } from '../../app-data/user.service';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;
  loading;
  isLoggedIn = false;
  // users = { id: '', name: '', email: '', picture: { data: { url: '' } } };
  // user

  constructor(
    private recipayApi: RecipayApiService,
    private loadingCtrl: LoadingController,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private userService: UserService,
    private router: Router,
    private fb: Facebook,
    public afAuth: AngularFireAuth,
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.swipeGesture(false);
  }

  // Sign in with Facebook
  FacebookAuth() {
    this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return firebase.auth().signInWithPopup(provider).then((result: any) => {
      // firebase.auth().getRedirectResult().then((result: any) => {
      let params = {
        username: result.additionalUserInfo.profile.id,
        password: result.additionalUserInfo.profile.id,
        firstname: result.additionalUserInfo.profile.first_name,
        middlename: '',
        lastname: result.additionalUserInfo.profile.last_name,
        email: result.additionalUserInfo.profile.email,
        mobile: null,
        user_image: 'https://www.fandompost.com/wp-content/uploads/2019/08/Itai-no-wa-Iya-nano-de-Bogyoryoku-Header.jpg'
      };
      this.loginViaFacebook(params);
      //   }).catch((error) => {
      //     console.log(error);
      // });
    });
  }
  loginViaFacebook(params: any) {
    setTimeout(() => {
      this.recipayApi.loginViaFacebook(params).subscribe(res => {
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
          if (res.data.user_type === 'fb-client') {
            this.userService.setUser(res.data);
            // this.userService.setPassword(this.password.trim());
            this.router.navigate(['/home']);
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
    // }
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

  fbLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
      if (res.status === 'connected') {
        // this.isLoggedIn = true;
        this.getUserDetail(res.authResponse.userID);
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log('Error logging into Facebook', e));
  }

  getUserDetail(userid: any) {
    this.fb.api('/' + userid + '/?fields=id,email,first_name,last_name,picture', ['public_profile'])
      .then(res => {
        console.log(res);
        // this.users = res;
        // { id: '', name: '', email: '', picture: { data: { url: '' } } };
        let params = {
          username: res.id,
          password: res.id,
          firstname: res.first_name,
          middlename: '',
          lastname: res.last_name,
          email: res.email,
          mobile: null,
          // user_image: 'https://www.fandompost.com/wp-content/uploads/2019/08/Itai-no-wa-Iya-nano-de-Bogyoryoku-Header.jpg'
          user_image: res.picture.data.url
        };
        this.loginViaFacebook(params);
      })
      .catch(e => {
        console.log(e);
      });
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
