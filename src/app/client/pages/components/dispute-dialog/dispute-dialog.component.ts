import { Component, OnInit, ChangeDetectorRef, ViewRef } from '@angular/core';
import { User } from 'src/app/client/models/user';
import { UserService } from 'src/app/client/app-data/user.service';
import { ToastController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dispute-dialog',
  templateUrl: './dispute-dialog.component.html',
  styleUrls: ['./dispute-dialog.component.scss'],
})
export class DisputeDialogComponent implements OnInit {
  user: User;
  image;
  reason = '';
  loading;
  sanitizeImage;
  ref;
  downloadURL;
  fileBlob;
  data;
  constructor(
    private modalController: ModalController,
    private recipayApi: RecipayApiService,
    private userService: UserService,
    private toastCtrl: ToastController,
    private camera: Camera,
    private loadingCtrl: LoadingController,
    private detectRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.userService.getUser.subscribe(user => this.user = user);
  }

  closeModal() {
    this.modalController.dismiss();
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

  OnReport() {
    if (this.image) {
      this.loadingCtrl.create({
        message: 'Sending report.....'
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
            user_id: this.user.id,
            attachment: this.downloadURL,
            order_id: this.data,
            message: this.reason,
            type: 'dispute',
            status: 'unresolve'
          };
          this.recipayApi.reportDispute(params).subscribe(
            data => {
              if (!data.error) {
                this.loading.dismiss();
                this.toastCtrl.create({
                  message: 'Successfully Sent A Dispute Report.',
                  duration: 2000
                }).then(overlay => {
                  overlay.present();
                });
                this.modalController.dismiss();
              } else if (data.error) {
                this.loading.dismiss();
                this.toastCtrl.create({
                  message: data.message,
                  duration: 2000
                }).then(overlay => {
                  overlay.present();
                });
              }
            },
            err => { this.loading.dismiss(); },
            () => {
              this.loading.dismiss();
            });
        });
      });
    } else {
      this.toastCtrl.create({
        message: 'Select Attachment.',
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
