import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PorkCuisinePage } from './pork-cuisine.page';

const routes: Routes = [
  {
    path: '',
    component: PorkCuisinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PorkCuisinePageRoutingModule {}
