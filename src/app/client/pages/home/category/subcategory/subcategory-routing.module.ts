import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubcategoryPage } from './subcategory.page';

const routes: Routes = [
  {
    path: '',
    component: SubcategoryPage
  },
  {
    path: ':productId',
    loadChildren: () => import('./product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubcategoryPageRoutingModule {}
