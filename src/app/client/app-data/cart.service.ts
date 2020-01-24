import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  lastScreen = new BehaviorSubject<string>(null);
  getLastScreen = this.lastScreen.asObservable();
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor() { }

  setLastScreen(screen: string) {
    this.lastScreen.next(screen);
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        // p.amount =
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  removeProduct(product) {}
}
