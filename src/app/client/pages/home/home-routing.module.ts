import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'top-seller',
    loadChildren: () => import('./top-seller/top-seller.module').then( m => m.TopSellerPageModule)
  },
  {
    path: 'fish-cuisine',
    loadChildren: () => import('./fish-cuisine/fish-cuisine.module').then( m => m.FishCuisinePageModule)
  },
  {
    path: 'pork-cuisine',
    loadChildren: () => import('./pork-cuisine/pork-cuisine.module').then( m => m.PorkCuisinePageModule)
  },
  {
    path: 'beef-cuisine',
    loadChildren: () => import('./beef-cuisine/beef-cuisine.module').then( m => m.BeefCuisinePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
