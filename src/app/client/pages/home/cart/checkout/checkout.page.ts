import { Component, OnInit } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { RecipayDataService } from 'src/app/client/app-data/recipay-data.service';
import { CartService } from 'src/app/client/app-data/cart.service';
import { UserService } from 'src/app/client/app-data/user.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  cities = [
    {
      value: 0, display: 'Cebu'
    },
    {
      value: 100, display: 'Talisay'
    },
    {
      value: 120, display: 'Mandaue'
    }
  ];
  date;
  billingAddress: string;
  billingCity = this.cities[0];
  totalPayment: number;
  amount: number = 0;
  cart = [];
  userId;
  sucessfulPayment = false;
  contactNumber;

  constructor(
    private recipayApi: RecipayApiService,
    private recipayData: RecipayDataService,
    private cartService: CartService,
    private userService: UserService,
    private toastCtrl: ToastController,
    private payPal: PayPal,
    private router: Router,
    private push: Push
  ) { }

  ngOnInit() {
    this.getCartItems();
    this.date = new Date().toUTCString();
  }

  getCartItems() {
    this.userService.getUser.subscribe(
      res => {
        this.userId = res.id;
        this.contactNumber = res.mobile;
      }
    );
    this.cartService.getCart.subscribe(cart => {
      this.cart = cart;
      console.log(cart);
      this.cart.forEach(item => {
        this.amount = this.amount +  item.price;
      });
    });
  }

  onClickCheckout() {
    if (this.validate()) {
      this.totalPayment = Number(this.amount) + Number(this.billingCity.value);
      this.payPal.init({
        PayPalEnvironmentProduction: '',
        PayPalEnvironmentSandbox: 'AcUhzh4QgC4F80bhfHgKe8XfEmB6Fbs9CSx9SyjAtYiVdx0Q6sy0hrLKf-8oimoXcY2qHNkprNHhKA0A'
      }).then(() => {
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
          // Only needed if you get an "Internal Service Error" after PayPal login!
          // payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {
          let payment = new PayPalPayment(this.totalPayment.toString(), 'PHP', 'Order Payment:', 'Sale');
          this.payPal.renderSinglePaymentUI(payment).then((res) => {
            // Successfully paid
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
            this.sucessfulPayment = true;
            let params = {
              user_id: this.userId,
              billing_address: this.billingAddress.trim(),
              billing_city: this.billingCity,
              amount: this.totalPayment,
              contact_info: this.contactNumber.trim(),
              method: 'Paypal',
              transaction: res.response.id,
              delivery_date_picked: this.date
            };
            this.recipayApi.order(params).subscribe(data => {
              if (!data.error) {
                this.toastCtrl.create({
                  message: data.message,
                  duration: 2000
                });
                this.router.navigate(['/order']);
              } else {
                this.toastCtrl.create({
                  message: 'Order failed, please try again.'
                });
              }
            });
            this.router.navigate(['/order']);
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

    if (this.sucessfulPayment) {
      this.router.navigate(['/order']);
    }
  }

  validate() {
    let valid = true;
    const datetimeNow = new Date().toUTCString();
    if (!this.billingAddress) {
      this.toastCtrl.create({
        message: 'Please enter billing address.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    } else if (this.date === datetimeNow) {
      this.toastCtrl.create({
        message: 'Please enter billing address.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    } else if (!this.contactNumber) {
      this.toastCtrl.create({
        message: 'Please enter contact number.',
        duration: 2000
      }).then(overlay => {
        overlay.present();
      });
      valid = false;
    }
    return valid;
  }

}
