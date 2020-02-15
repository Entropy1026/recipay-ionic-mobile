import { Component, OnInit } from '@angular/core';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { RecipayDataService } from 'src/app/client/app-data/recipay-data.service';
import { User } from 'src/app/client/models/user';
import { UserService } from 'src/app/client/app-data/user.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  user: User;
  empty = false;
  orders = [];
  filteredOrders = [];
  isPending = false;

  constructor(
    private recipayApi: RecipayApiService,
    private recipayData: RecipayDataService,
    private userData: UserService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.initOrders();
  }

  initOrders() {
    this.userData.getUser.subscribe(user => {
      this.user = user;
    });
    const params = {
      user_id: this.user.id
    };
    this.recipayApi.getOrders(params).subscribe(res => {
      if (!res.error) {
        this.orders = res.data || [];
        this.filterOrders('Not-Delivered');
        if (this.orders.length === 0) {
          this.empty = true;
        }
      }
    });
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
    this.orders.forEach(o => {
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
  }

  onClickOrderDetail(index: number) {
    this.recipayData.setSelectedOrder(this.orders[index]);
  }

  onClickReceiveOrder(index: number) {
    let params = {
      order_id: this.orders[index].id
    };

    this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Please confirm delivery.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Confirm', handler: () => {
            this.recipayApi.receiveOrder(params).subscribe(res => {
              if (!res.error) {
                this.orders = [];
                this.initOrders();
                this.toastCtrl.create({
                  message: 'Successfully received order.',
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

  rate(index: number) {

  }

  comment(index: number) {
    
  }

}
