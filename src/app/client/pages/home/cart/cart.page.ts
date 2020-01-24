import { Component, OnInit } from '@angular/core';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { RecipayDataService } from 'src/app/client/app-data/recipay-data.service';
import { CartService } from 'src/app/client/app-data/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  lastScreen: string;
  cart = [];

  constructor(
    private recipayApi: RecipayApiService,
    private recipayData: RecipayDataService,
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.initCart();
  }

  initCart() {
    this.cart = this.cartService.getCart();
    this.cartService.getLastScreen.subscribe(screen => this.lastScreen = screen);
  }

}
