import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, AlertController, ToastController } from '@ionic/angular';
import { RecipayApiService } from '../../api/recipay-api.service';
import { UserService } from '../../app-data/user.service';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

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
  user

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
    // fb.getLoginStatus()
    //   .then(res => {
    //     console.log(res.status);
    //     if (res.status === 'connect') {
    //       this.isLoggedIn = true;
    //     } else {
    //       this.isLoggedIn = false;
    //     }
    //   })
    //   .catch(e => console.log(e));
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.swipeGesture(false);
  }

  // Sign in with Facebook
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = result.credential as firebase.auth.OAuthCredential;
        // The signed-in user info.
        const token = credential.accessToken;
        const user = result.user;
        let firstName, lastName, email, phoneNumber = '';
        console.log(result);
        console.log('You have been successfully logged in!');
      }).catch((error) => {
        console.log(error);
      });
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

  // fbLogin() {
  //   this.fb.login(['public_profile', 'user_friends', 'email'])
  //     .then(res => {
  //       if (res.status === 'connected') {
  //         this.isLoggedIn = true;
  //         this.getUserDetail(res.authResponse.userID);
  //       } else {
  //         this.isLoggedIn = false;
  //       }
  //     })
  //     .catch(e => console.log('Error logging into Facebook', e));
  // }

  // getUserDetail(userid: any) {
  //   this.fb.api('/' + userid + '/?fields=id,email,name,picture', ['public_profile'])
  //     .then(res => {
  //       console.log(res);
  //       this.users = res;
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  // logout() {
  //   this.fb.logout()
  //     .then(res => this.isLoggedIn = false)
  //     .catch(e => console.log('Error logout from Facebook', e));
  // }

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
