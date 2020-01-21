import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Menu } from '../models/menu';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class RecipayDataService {

  selectedMenu = new BehaviorSubject<Menu>(null);
  getSelectedMenu = this.selectedMenu.asObservable();

  selectedCategory = new BehaviorSubject<Category>(null);
  getselectedCategory = this.selectedCategory.asObservable();

  constructor() { }

  setSelectedMenu(menu: Menu) {
    this.selectedMenu.next(menu);
  }

  setSelectedCategory(category: Category) {
    this.selectedCategory.next(category);
  }

}
