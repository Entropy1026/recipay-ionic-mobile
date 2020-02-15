import { Component, OnInit, ChangeDetectorRef, ViewRef } from '@angular/core';
import { User } from 'src/app/client/models/user';
import { UserService } from 'src/app/client/app-data/user.service';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';

import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.page.html',
  styleUrls: ['./picture.page.scss'],
})
export class PicturePage implements OnInit {

  user: User;
  image;
  loading;
  sanitizeImage;
  ref;
  downloadURL;
  fileBlob;

  constructor(
    private recipayApi: RecipayApiService,
    private userService: UserService,
    private toastCtrl: ToastController,
    private camera: Camera,
    private loadingCtrl: LoadingController,
    private file: File,
    private storage: AngularFireStorage,
    private detectRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.initPicture();
  }

  initPicture() {
    this.userService.getUser.subscribe(user => this.user = user);
  }

  async onClickImage() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      targetWidth: 600,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: false,
    };

    this.camera.getPicture(options).then((imageData) => {
      this.image = imageData;
      this.sanitizeImage = this.sanitizer.bypassSecurityTrustUrl('data:Image/jpeg;base64,' + imageData);
    }, (err) => {
      // Handle error
    });
  }

  updatePicture() {
    if (this.image) {
      this.loadingCtrl.create({
        message: 'Uploading image...'
      }).then(overlay => {
        this.loading = overlay;
        overlay.present();
      });
      const photoName = this.generateRandomName(16);
      const storage = firebase.storage();
      const storageRef = storage.ref('/ProfilePicture/' + photoName);
      const uploadTask = storageRef.putString('data:Image/jpeg;base64,' + this.image, 'data_url').then((snapshot) => {
        this.downloadURL = snapshot.ref.getDownloadURL().then(url => {
          this.downloadURL = url;
          const params = {
            id: this.user.id,
            image: this.downloadURL
          };
          this.recipayApi.updateImageInfo(params).subscribe(
            data => {
              if (!data.error) {
                this.loading.dismiss();
                this.toastCtrl.create({
                  message: 'Profile picture has been updated.',
                  duration: 2000
                }).then(overlay => {
                  overlay.present();
                });
              }
            },
            err => { },
            () => {
              this.loading.dismiss();
            });
        });
      });
    } else {
      this.toastCtrl.create({
        message: 'No image to be uploaded.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
    }

  }

  generateRandomName(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}
