import { Component, OnInit } from '@angular/core';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { RecipayDataService } from 'src/app/client/app-data/recipay-data.service';
import { Category } from 'src/app/client/models/category';
import { Subcategory } from '../../../../models/subcategory';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/client/app-data/cart.service';
import { Router } from '@angular/router';

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
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  getSubcategoryList() {
    const params = {
      category: this.category ? this.category.id : null
    };
    this.recipayApi.getSubcategory(params).subscribe((response: any) => {
      this.subcategories = response.data;
      if (!this.subcategories) {
        this.empty = true;
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
