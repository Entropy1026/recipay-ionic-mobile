import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeefCuisinePageRoutingModule } from './beef-cuisine-routing.module';

import { BeefCuisinePage } from './beef-cuisine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeefCuisinePageRoutingModule
  ],
  declarations: [BeefCuisinePage]
})
export class BeefCuisinePageModule {}
