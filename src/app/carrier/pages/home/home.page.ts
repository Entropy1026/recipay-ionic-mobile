import { Component, OnInit } from '@angular/core';
import { CarrierApiService } from '../../api/carrier-api.service';
import { RecipayDataService } from 'src/app/client/app-data/recipay-data.service';
import { UserService } from 'src/app/client/app-data/user.service';
import { User } from 'src/app/client/models/user';
import { AlertController, ToastController } from '@ionic/angular';
import { SMS } from '@ionic-native/sms/ngx';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [SMS],
})
export class HomePage implements OnInit {

  user: User;
  empty = false;
  deliveries = [];
  filteredOrders = [];
  isPending = false;
  constructor(
    private carrierApi: CarrierApiService,
    private userData: UserService,
    private sendSMS: SMS,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.initMyDelivery();
    this.initUser();
  }

  sendMessage(phone: any) {
    this.sendSMS.hasPermission().then((res: any) => {
      if (res.isEnabled) {
        this.sendSMS.send(phone, `Hello Good day I'm a carrier from recipay im currently on my way to deliver your order'`);
      }
    });
}
ionViewWillEnter() {
  this.initMyDelivery();
  this.initUser();
}

initUser() {
  this.userData.getUser.subscribe(user => {
    this.user = user;
  });
}

initMyDelivery() {
  if (this.user) {
    let params = {
      user_id: this.user.id
    };
    this.carrierApi.getMyDelivery(params).subscribe(res => {
      if (!res.error) {
        this.deliveries = res.data;
        this.filterOrders('Not-Delivered');
        if (this.deliveries.length === 0) {
          this.empty = true;
        }
      }
    });
  }
}

selectTab(status: any) {
  if (status === 'pending') {
    this.isPending = false;
    this.filterOrders('Not-Delivered');
  }
  if (status === 'complete') {
    this.isPending = true;
    this.filterOrders('Delivered');
  }
}

filterOrders(status: any) {
  let data;
  data = [];
  this.filteredOrders = [];
  this.deliveries.forEach(o => {
    if (status === 'Delivered') {
      if (o.status === 'Delivered') {
        data.push(o);
      }
    } else {
      if (o.status !== 'Delivered') {
        data.push(o);
      }
    }
  });
  this.filteredOrders = data;
  console.log(this.filteredOrders);
}

onClickCompleteDelivery(index: number) {
  let params = {
    order_id: index
  };

  this.alertCtrl.create({
    header: 'Confirmation',
    message: 'Please confirm delivery.',
    buttons: [
      { text: 'Cancel', role: 'cancel' },
      {
        text: 'Confirm', handler: () => {
          this.carrierApi.completeDeliver(params).subscribe(res => {
            console.log(res);
            if (!res.error) {
              this.deliveries = [];
              this.initMyDelivery();
              this.toastCtrl.create({
                message: 'Successfully confirmed deliver.',
                duration: 2000
              }).then(overlay => {
                overlay.present();
              });
            }
          });
        }
      }
    ]
  }).then(overlay => {
    overlay.present();
  });

}

}
