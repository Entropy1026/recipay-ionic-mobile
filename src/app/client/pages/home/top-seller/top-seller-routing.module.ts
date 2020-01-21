import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopSellerPage } from './top-seller.page';

const routes: Routes = [
  {
    path: '',
    component: TopSellerPage
  },
  {
    path: ':categoryId',
    loadChildren: () => import('./top-category-detail/top-category-detail.module').then( m => m.TopCategoryDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopSellerPageRoutingModule { }
