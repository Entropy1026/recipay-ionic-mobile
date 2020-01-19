import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FishCuisinePageRoutingModule } from './fish-cuisine-routing.module';

import { FishCuisinePage } from './fish-cuisine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FishCuisinePageRoutingModule
  ],
  declarations: [FishCuisinePage]
})
export class FishCuisinePageModule {}
