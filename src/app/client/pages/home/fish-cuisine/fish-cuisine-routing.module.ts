import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FishCuisinePage } from './fish-cuisine.page';

const routes: Routes = [
  {
    path: '',
    component: FishCuisinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FishCuisinePageRoutingModule {}
