import { Component, OnInit } from '@angular/core';
import { CarrierApiService } from '../../api/carrier-api.service';
import { RecipayDataService } from 'src/app/client/app-data/recipay-data.service';
import { UserService } from 'src/app/client/app-data/user.service';
import { User } from 'src/app/client/models/user';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
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
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.initMyDelivery();
    this.initUser();
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
      order_id: this.deliveries[index].id
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
                  message: 'Successfully confirmed deliver.'
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
