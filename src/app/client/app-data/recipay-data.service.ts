import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Menu } from '../models/menu';
import { Category } from '../models/category';
import { Subcategory } from '../models/subcategory';

@Injectable({
  providedIn: 'root'
})
export class RecipayDataService {

  selectedMenu = new BehaviorSubject<Menu>(null);
  getSelectedMenu = this.selectedMenu.asObservable();

  selectedCategory = new BehaviorSubject<Category>(null);
  getselectedCategory = this.selectedCategory.asObservable();

  selectedProduct = new BehaviorSubject<Subcategory>(null);
  getSelectedProduct = this.selectedProduct.asObservable();

  constructor() { }

  setSelectedMenu(menu: Menu) {
    this.selectedMenu.next(menu);
  }

  setSelectedCategory(category: Category) {
    this.selectedCategory.next(category);
  }

  setSelectedProduct(selectedProduct: Subcategory) {
    this.selectedProduct.next(selectedProduct);
  }

}
