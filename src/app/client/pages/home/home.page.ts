import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RecipayApiService } from '../../api/recipay-api.service';
import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';
import { Menu } from '../../models/menu';
import { RecipayDataService } from '../../app-data/recipay-data.service';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../../app-data/cart.service';
import { UserService } from '../../app-data/user.service';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed
} from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  cartItemCount: BehaviorSubject<number>;
  menu: Menu[] = [];
  cart = [];
  slideOpts;
  ads;

  constructor(
    private recipayApi: RecipayApiService,
    private recipayData: RecipayDataService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router,
    private detectRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // this.initHome();
    this.initAds();
    this.initMenu();
    this.initCart();
  }

  initHome() {
    console.log('Initializing HomePage');

    PushNotifications.register();

    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        alert('Push registration success, token: ' + token.value);
      }
    );

    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

  initAds() {
    this.slideOpts = {
      autoplay: true,
    };
    this.recipayApi.getAds().pipe(retry(2)).subscribe((ads: any) => {
      this.ads = ads.data;
      this.detectRef.detectChanges();
    });
  }

  initMenu() {
    this.recipayApi.getMenu().pipe(retry(2)).subscribe((menu: any) => {
      this.menu = menu.data;
      this.detectRef.detectChanges();
    });
  }

  initCart() {
    this.userService.getUser.subscribe(
      res => {
        if (res) {
          this.cartService.getCartItems(res.id);
        }
      }
    );
    this.cartService.getCart.subscribe(cart => this.cart = cart);
    this.cartItemCount = this.cartService.getCartItemCount();
    this.detectRef.detectChanges();
  }

  onClickAds(link: string) {
    window.open(link);
  }

  onClickTopSeller() {
    this.router.navigate(['/home/top-seller']);
  }

  onClickMenu(index: number) {
    this.recipayData.setSelectedMenu(this.menu[index]);
    this.router.navigate(['/home/category']);
  }

  openCart() {
    this.router.navigate(['/home/cart']);
  }

}
