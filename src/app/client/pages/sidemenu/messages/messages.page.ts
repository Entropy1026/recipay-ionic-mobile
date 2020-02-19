import { Component, OnInit, ChangeDetectorRef, ViewRef } from '@angular/core';
import { User } from 'src/app/client/models/user';
import { UserService } from 'src/app/client/app-data/user.service';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  reason = '';
  attachment;

  user;
  message = [];
  isShowContent = false;
  msgCount = 0;

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
    private detectRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.userService.userData.subscribe(res => { this.user = res; this.getMessage(); });
  }
  changeTab() {
    this.isShowContent = !this.isShowContent;
  }
  getMessage() {
    this.recipayApi.getPersonalMessage({ user_id: this.user.id }).subscribe(
      res => {
        this.message = res.data;
      },
      err => { },
      () => { }
    );
  }

  createMessage() {
    if (this.reason.length > 1 || this.attachment) {
    const params = {
      user_id: this.user.id,
      attachment: this.attachment ? this.attachment : null,
      order_id: null,
      message: this.reason ? this.reason : null,
      status: 'unread',
      type: 'response'
    };
    this.recipayApi.reportDispute(params).subscribe(
      data => {
      this.getMessage();
      },
      err => { },
      () => {
        this.attachment = null;
        this.image = null;
        this.sanitizeImage = null;
        this.reason = '';
      });
  }
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

uploadImageThenCreate() {
  if (this.image) {
    const photoName = this.generateRandomName(16);
    const storage = firebase.storage();
    const storageRef = storage.ref('/ProfilePicture/' + photoName);
    const uploadTask = storageRef.putString('data:Image/jpeg;base64,' + this.image, 'data_url').then((snapshot) => {
      this.downloadURL = snapshot.ref.getDownloadURL().then(url => {
      this.attachment = url;
      this.createMessage();
      });
    });
  } else {
    if (this.reason.length > 1) {
        this.createMessage();
    }
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
