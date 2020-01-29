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

  selectedTopSeller = new BehaviorSubject<Subcategory>(null);
  getSelectedTopSeller = this.selectedTopSeller.asObservable();

  selectedOrder = new BehaviorSubject<any>(null);
  getSelectedOrder = this.selectedOrder.asObservable();

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

  setSelectedTopSeller(selectedTopSeller: Subcategory) {
    this.selectedTopSeller.next(selectedTopSeller);
  }

  setSelectedOrder(selectedOrder: Subcategory) {
    this.selectedOrder.next(selectedOrder);
  }

}
