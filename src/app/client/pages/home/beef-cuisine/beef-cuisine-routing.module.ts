import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeefCuisinePage } from './beef-cuisine.page';

const routes: Routes = [
  {
    path: '',
    component: BeefCuisinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeefCuisinePageRoutingModule {}
