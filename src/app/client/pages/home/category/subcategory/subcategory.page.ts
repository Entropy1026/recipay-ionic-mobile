import { Component, OnInit } from '@angular/core';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { RecipayDataService } from 'src/app/client/app-data/recipay-data.service';
import { Category } from 'src/app/client/models/category';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.page.html',
  styleUrls: ['./subcategory.page.scss'],
})
export class SubcategoryPage implements OnInit {

  category: Category;

  constructor(
    private recipayApi: RecipayApiService,
    private recipayData: RecipayDataService,
  ) { }

  ngOnInit() {
    this.initToolbarTitle();
  }

  initToolbarTitle() {
    this.recipayData.getselectedCategory.subscribe(category => this.category = category);
  }

}
