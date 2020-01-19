import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopSellerPage } from './top-seller.page';

const routes: Routes = [
  {
    path: '',
    component: TopSellerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopSellerPageRoutingModule {}
