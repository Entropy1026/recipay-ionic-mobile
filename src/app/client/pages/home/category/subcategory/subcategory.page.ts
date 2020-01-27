import { Component, OnInit } from '@angular/core';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { RecipayDataService } from 'src/app/client/app-data/recipay-data.service';
import { Category } from 'src/app/client/models/category';
import { Subcategory } from '../../../../models/subcategory';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/client/app-data/cart.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/client/app-data/user.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.page.html',
  styleUrls: ['./subcategory.page.scss'],
})
export class SubcategoryPage implements OnInit {

  cartItemCount: BehaviorSubject<number>;
  cart = [];
  category: Category;
  subcategories: Subcategory[] = [];
  empty = false;

  constructor(
    private recipayApi: RecipayApiService,
    private recipayData: RecipayDataService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initToolbarTitle();
    this.initCart();
    this.getSubcategoryList();
  }

  initToolbarTitle() {
    this.recipayData.getselectedCategory.subscribe(category => this.category = category);
  }

  initCart() {
    this.cartService.getCart.subscribe(cart => this.cart = cart);
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  getSubcategoryList() {
    let id: any;
    this.userService.getUser.subscribe(res => {
      id = res.id;
    });
    const params = {
      category: this.category ? this.category.id : null,
      user_id: id
    };
    this.recipayApi.getSubcategory(params).subscribe((res: any) => {
      if (!res.error) {
        this.subcategories = res.data;
        if (!this.subcategories) {
          this.empty = true;
        }
      }
    });
  }

  onClickProduct(index: number) {
    this.recipayData.setSelectedProduct(this.subcategories[index]);
  }

  openCart() {
    this.router.navigate(['/home/cart']);
  }

}
