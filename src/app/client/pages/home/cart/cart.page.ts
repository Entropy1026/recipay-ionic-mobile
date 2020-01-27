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
    private payPal: PayPal
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

  onClickCheckOut() {
    this.payPal.init({
      PayPalEnvironmentProduction: '',
      PayPalEnvironmentSandbox: 'AXALwZIXPKfrALMTE884TmyBagq52qh_z8hkXrVCQsBpEjeGgjp9v2o7RYTQ9SoxIBRsQiC8Gs3qox-'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        // payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          // Successfully paid
          console.log(payment);
          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }

}
