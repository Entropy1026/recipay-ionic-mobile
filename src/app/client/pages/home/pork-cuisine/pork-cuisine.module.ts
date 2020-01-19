import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PorkCuisinePageRoutingModule } from './pork-cuisine-routing.module';

import { PorkCuisinePage } from './pork-cuisine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PorkCuisinePageRoutingModule
  ],
  declarations: [PorkCuisinePage]
})
export class PorkCuisinePageModule {}
