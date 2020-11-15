import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, AlertController, ToastController } from '@ionic/angular';
import { RecipayApiService } from '../../api/recipay-api.service';
import { UserService } from '../../app-data/user.service';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user';

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
  user: User;
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
    private storage: Storage
  ) {
    this.storage.get('hasLoggedin').then((val) => {
      if (val) {
        this.loadingCtrl.create({
          message: 'Signing in...'
        }).then(overlay => {
          this.loading = overlay;
          overlay.present();
        });
        this.setUser();
      }
    });
  }

  ngOnInit() { }

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
    this.loadingCtrl.create({
      message: 'Signing in...'
    }).then(overlay => {
      this.loading = overlay;
      overlay.present();
    });
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
            this.router.navigate(['/category']);
          }
          if (res.data.user_type === 'carrier') {
            this.userService.setUser(res.data);
            this.router.navigate(['/carrier']);
          }
          if (res.data.user_type === 'fb-client') {
            this.userService.setUser(res.data);
            // this.userService.setPassword(this.password.trim());
            this.router.navigate(['/category']);
          }

          // set storage
          this.storage.set('hasLoggedin', true);

          this.storage.set('username', res.data.username);
          this.storage.set('firstname', res.data.firstname);
          this.storage.set('lastname', res.data.lastname);
          this.storage.set('middlename', res.data.middlename);
          this.storage.set('mobile', res.data.mobile);
          this.storage.set('email', res.data.email);
          this.storage.set('image', res.data.image);
          this.storage.set('id', res.data.id);
          this.storage.set('user_type', res.data.user_type);
          this.storage.set('password', res.data.password);

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
          console.log(res.data);
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

            // set storage
            this.storage.set('hasLoggedin', true);
            this.storage.set('username', res.data.username);
            this.storage.set('firstname', res.data.firstname);
            this.storage.set('lastname', res.data.lastname);
            this.storage.set('middlename', res.data.middlename);
            this.storage.set('mobile', res.data.mobile);
            this.storage.set('email', res.data.email);
            this.storage.set('image', res.data.image);
            this.storage.set('id', res.data.id);
            this.storage.set('user_type', res.data.user_type);
            this.storage.set('password', res.data.password);

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

  private async setUser() {
    let id = null;
    let firstname = null;
    let lastname = null;
    let middlename = null;
    let username = null;
    let user_type = null;
    let email = null;
    let image = null;
    let mobile = null;
    id = await this.storage.get('id');
    firstname = await this.storage.get('firstname');
    lastname = await this.storage.get('lastname');
    middlename = await this.storage.get('middlename');
    username = await this.storage.get('username');
    user_type = await this.storage.get('user_type');
    email = await this.storage.get('email');
    image = await this.storage.get('image');
    mobile = await this.storage.get('mobile');

    this.storage.get('password').then((val) => {
      this.userService.setPassword(val);
    });

    this.user = {
      id,
      firstname,
      lastname,
      middlename,
      username,
      user_type,
      email,
      image,
      mobile,
    };

    this.userService.setUser(this.user);
    if (this.user.user_type === 'client') {
      this.router.navigate(['/category']);
    }
    if (this.user.user_type === 'carrier') {
      this.router.navigate(['/carrier']);
    }
    if (this.user.user_type === 'fb-client') {
      this.router.navigate(['/category']);
    }
    this.loading.dismiss();
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
