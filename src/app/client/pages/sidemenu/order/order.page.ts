import { Component, OnInit } from '@angular/core';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { RecipayDataService } from 'src/app/client/app-data/recipay-data.service';
import { User } from 'src/app/client/models/user';
import { UserService } from 'src/app/client/app-data/user.service';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { OrderRateComponent } from '../../components/order-rate/order-rate.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';



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
    private toastCtrl: ToastController,
    private socialSharing: SocialSharing,
    private modalController: ModalController
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
  shareOnFacebook(items: any) {
    // this.socialSharing.().then(() => {

    // }).catch(() => {

    // });
    let food = '';
    let i = 0;
    for (i = 0; i < items.length; i++) {
      if (items.length === 1) {
        food = items[0].name;
      } else if (items.length > 1 && i > items.length - 1) {
        food = food.concat(`, ${items[i].name}`);
      } else if (items.length > 1 && i === items.length - 1) {
        food = food.concat(`and ${items[i].name}`);
      }

    }
    // items.forEach(element => {
    //   food = food + element.id;
    // });
    this.socialSharing.shareViaFacebook(`I Ordered ${food} foods and its the best`,
     'https://image.freepik.com/free-vector/cute-bento-illustration_136610-24.jpg',
      null).then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
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
    console.log(index);
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

  comment(data: any) {
    console.log(data);
    this.modalController.create({
      component: OrderRateComponent,
      cssClass: 'modal-size-2',
      componentProps: { data: data }
    }).then(async overlay => {
      overlay.present();

      // if (overlay.onWillDismiss()) {
      //   const data = await overlay.onWillDismiss();
      //   if (data && data.data && data.data.quantity) {
      //     this.userService.getUser.subscribe(
      //       user => {
      //         if (user && user.id) {
      //           const params = {
      //             product_id: product.id,
      //             user_id: user.id,
      //             quantity: data.data.quantity
      //           };
      //           this.cartService.addtoCart(params);
      //         }
      //       }
      //     );
      //   }
      // }

    });
  }

}
