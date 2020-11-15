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
  menuList = [];
  empty = false;
  filter = "all";
  cuisines = [];

  constructor(
    private recipayApi: RecipayApiService,
    private recipayData: RecipayDataService,
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initToolbarTitle();
    this.initCategoryList();
    this.initCuisineTypes();
    this.initCart();
  }

  initToolbarTitle() {
    this.recipayData.getSelectedMenu.subscribe(menu => this.menu = menu);
  }

  initCategoryList() {
    const params = {
      type: this.menu ? this.menu.name : null
    };
    this.recipayApi.getMenuNew().pipe(retry(2)).subscribe((res: any) => {
        this.categories = res;
        this.menuList = res;
        if (!this.categories) {
          this.empty = true;
        }
    });
  }

  initCuisineTypes() {
    this.recipayApi.getCuisines().pipe(retry(2)).subscribe((res: any) => {
       this.cuisines = res;
    });
  }

  initCart() {
    this.cartService.getCart.subscribe(cart => this.cart = cart);
    this.cartItemCount = this.cartService.getCartItemCount();
  }
  segmentChanged(data:any){
    this.filter = data;
    let temp = [...this.menuList];
    if(data === 'all'){
      this.categories = temp;
    }
    else{
      this.categories = temp.filter(t=>t.cuisine.name.toLowerCase( ) === data.toLowerCase( ) );
    }
  }
  filterMenu(data:any){
    let temp = [...this.menuList];
    if(this.filter !== "all"){
       temp = temp.filter(t=>t.cuisine.name.toLowerCase() === this.filter.toLowerCase());
    }
    if(data === ""){
      this.categories = temp;
    }
    else{
      let first = temp.filter(t=>t.name.toLowerCase().includes(data.toLowerCase()));
      this.categories = first;
    }
  }
  onClickCategory(index: number) {
    this.recipayData.setSelectedCategory(this.categories[index]);
    this.router.navigate(['/category/subcategory']);
  }

  openCart() {
    this.router.navigate(['/cart']);
  }

}
