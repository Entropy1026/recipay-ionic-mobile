import { Component, OnInit } from '@angular/core';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { RecipayDataService } from 'src/app/client/app-data/recipay-data.service';
import { Menu } from 'src/app/client/models/menu';
import { Category } from 'src/app/client/models/category';
import { retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/client/app-data/cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  cartItemCount: BehaviorSubject<number>;
  cart = [];
  menu: Menu;
  categories: Category[] = [];
  empty = false;

  constructor(
    private recipayApi: RecipayApiService,
    private recipayData: RecipayDataService,
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initToolbarTitle();
    this.initCategoryList();
    this.initCart();
  }

  initToolbarTitle() {
    this.recipayData.getSelectedMenu.subscribe(menu => this.menu = menu);
  }

  initCategoryList() {
    const params = {
      type: this.menu ? this.menu.name : null
    };
    this.recipayApi.getCategory(params).pipe(retry(2)).subscribe((categories: any) =>{
      this.categories = categories.data;
      if (!this.categories) {
        this.empty = true;
      }
    });
  }

  initCart() {
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  onClickCategory(index: number) {
    this.recipayData.setSelectedCategory(this.categories[index]);
    this.router.navigate(['/home/category/subcategory']);
  }

  openCart() {
    this.router.navigate(['/home/cart']);
  }

}
