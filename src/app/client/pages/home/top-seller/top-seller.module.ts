import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopSellerPageRoutingModule } from './top-seller-routing.module';

import { TopSellerPage } from './top-seller.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopSellerPageRoutingModule
  ],
  declarations: [TopSellerPage]
})
export class TopSellerPageModule {}
