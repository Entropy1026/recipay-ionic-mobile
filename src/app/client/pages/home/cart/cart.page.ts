import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { RecipayDataService } from 'src/app/client/app-data/recipay-data.service';
import { CartService } from 'src/app/client/app-data/cart.service';
import { UserService } from 'src/app/client/app-data/user.service';
import { AlertController } from '@ionic/angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  empty = false;
  lastScreen: string;
  cart = [];

  constructor(
    private recipayApi: RecipayApiService,
    private recipayData: RecipayDataService,
    private cartService: CartService,
    private userService: UserService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    this.cartService.getLastScreen.subscribe(screen => this.lastScreen = screen);
    this.userService.getUser.subscribe(
      res => {
        this.cartService.getCartItems(res.id);
      }
    );
    this.cartService.getCart.subscribe(cart => {
      this.cart = cart;
      if (this.cart.length === 0) {
        this.empty = true;
      }
    });
  }

  onRemoveCartItem(index) {
    this.alertCtrl.create({
      header: `Delete ${this.cart[index].name}`,
      message: 'Are you sure you want to delete this?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete', handler: () => {
            this.cartService.removeToCart(this.cart[index]);
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });

  }

}
