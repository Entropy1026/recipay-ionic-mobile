import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RecipayApiService } from '../api/recipay-api.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  userId;
  lastScreen = new BehaviorSubject<string>(null);
  getLastScreen = this.lastScreen.asObservable();
  private cart = new BehaviorSubject<[]>([]);
  private cartItemCount = new BehaviorSubject(0);
  getCart = this.cart.asObservable();

  constructor(private recipayApi: RecipayApiService, private toastController: ToastController) { }

  setLastScreen(screen: string) {
    this.lastScreen.next(screen);
  }

  setCart(cart: any) {
    this.cart.next(cart);
  }

  getCartItemCount() {
    return this.cartItemCount;
  }


  removeToCart(product) {
    let forReturn = '';
    const params = { id: product.cart_id };
    this.recipayApi.deleteCartItems(params).subscribe(
      res => {
        if (!res.error) {
          forReturn = 'Succesfully deleted.';
          this.getCartItems(this.userId);
        } else {
          forReturn = 'There is an error while deleting cart';
        }
      },
      err => {
        forReturn = 'Unexpected Error ! Please Try Again Later';
      },
      () => {
        this.toastController.create({
          message: forReturn,
          duration: 2000
        }).then(overlay => {
          overlay.present();
        });
      }
    );
  }

  addtoCart(params: any) {
    let forReturn = '';
    this.recipayApi.addtoCart(params).subscribe(
      res => {
        if (!res.error) {
          forReturn = 'Succesfully added to cart.';
          this.getCartItems(params.user_id);
        } else {
          forReturn = 'There is an error while adding cart';
        }
      },
      err => {
        forReturn = 'Unexpected Error ! Please Try Again Later';
      },
      () => {
        this.toastController.create({
          message: forReturn,
          duration: 2000
        }).then(overlay => {
          overlay.present();
        });
      }
    );
  }

  getCartItems(userId: any) {
    this.userId = userId;
    let forReturn = '';
    this.recipayApi.getCartItems({ id: userId }).subscribe(
      res => {
        if (!res.error) {
          this.setCart(res.data);
          this.cartItemCount.next(res.data.length);
        } else {
          forReturn = 'There is an error in adding cart';
        }
      },
      err => {
        forReturn = 'Unexpected Error ! Please Try Again Later';
      },
      () => {
        if (forReturn) {
          this.toastController.create({
            message: forReturn,
            duration: 2000
          }).then(overlay => {
            overlay.present();
          });
        }
      }
    );
  }
}
