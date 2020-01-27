import { Component, OnInit } from '@angular/core';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { RecipayDataService } from 'src/app/client/app-data/recipay-data.service';
import { Subcategory } from 'src/app/client/models/subcategory';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/client/app-data/cart.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/client/app-data/user.service';
import { ModalController } from '@ionic/angular';
import { OrderQuantityComponent } from 'src/app/client/pages/components/order-quantity/order-quantity.component';
import { map } from 'rxjs/operators';

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
  instructionShow: boolean = false;
  ingredientShow: boolean = false;

  constructor(
    private recipayApi: RecipayApiService,
    private recipayData: RecipayDataService,
    private cartService: CartService,
    private router: Router,
    private userService: UserService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.initCart();
    this.initProductDetail();
  }

  initCart() {
    this.cartService.getCart.subscribe(cart => this.cart = cart);
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  initProductDetail() {
    this.recipayData.getSelectedProduct.subscribe(product => {
      this.product = product;
      if (this.product) {
        const stringToSplit = this.product.text_instruction;
        this.textInstruction = stringToSplit.split('.');
      }
    });
  }

  collapseInstruct() {
    this.instructionShow = !this.instructionShow;
  }

  collapseIngredient() {
    this.ingredientShow = !this.ingredientShow;
  }

  addToCart(product) {
    this.modalController.create({
      component: OrderQuantityComponent,
      cssClass: 'modal-size'
    }).then(async overlay => {
      overlay.present();

      if (overlay.onWillDismiss()) {
        const data = await overlay.onWillDismiss();
        if (data && data.data && data.data.quantity) {
          this.userService.getUser.subscribe(
            user => {
              if (user && user.id) {
                const params = {
                  product_id: product.id,
                  user_id: user.id,
                  quantity: data.data.quantity
                };
                this.cartService.addtoCart(params);
              }
            }
          );
        }
      }

    });
  }

  openCart() {
    this.router.navigate(['/home/cart']);
  }

}
