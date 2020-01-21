import { Component, OnInit } from '@angular/core';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { RecipayDataService } from 'src/app/client/app-data/recipay-data.service';
import { Menu } from 'src/app/client/models/menu';
import { Category } from 'src/app/client/models/category';
import { retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  menu: Menu;
  categories: Category[] = [];
  empty = false;

  constructor(
    private recipayApi: RecipayApiService,
    private recipayData: RecipayDataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initToolbarTitle();
    this.initCategoryList();
  }

  initToolbarTitle() {
    this.recipayData.getSelectedMenu.subscribe(menu => this.menu = menu);
  }

  initCategoryList() {
    const params = {
      type: this.menu.name
    };
    this.recipayApi.getCategory(params).pipe(retry(2)).subscribe((categories: any) =>{
      this.categories = categories.data;
      if(!this.categories) {
        this.empty = true;
      }
    });
  }

  onClickCategory(index: number) {
    this.recipayData.setSelectedCategory(this.categories[index]);
    this.router.navigate(['/home/category/subcategory']);
  }

}
