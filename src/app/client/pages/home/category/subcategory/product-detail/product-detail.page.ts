import { Component, OnInit } from '@angular/core';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { RecipayDataService } from 'src/app/client/app-data/recipay-data.service';
import { Subcategory } from 'src/app/client/models/subcategory';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/client/app-data/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  cart = [];
  cartItemCount: BehaviorSubject<number>;
  product: Subcategory;
  textInstruction = [];

  constructor(
    private recipayApi: RecipayApiService,
    private recipayData: RecipayDataService,
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initCart();
    this.initProductDetail();
  }

  initCart() {
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  initProductDetail() {
    this.recipayData.getSelectedProduct.subscribe(product => {
      this.product = product;
      if (this.product) {
        const stringToSplit = this.product.text_instruction;
        console.log(this.product);
        console.log(stringToSplit);
        this.textInstruction = stringToSplit.split('.');
      }
    });
  }

  addToCart(product) {
    this.cartService.setLastScreen('product-detail');
    this.cartService.addProduct(product);
  }

  openCart() {
    this.router.navigate(['/home/cart']);
  }

}
