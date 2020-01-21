import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopCategoryDetailPage } from './top-category-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TopCategoryDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopCategoryDetailPageRoutingModule {}
