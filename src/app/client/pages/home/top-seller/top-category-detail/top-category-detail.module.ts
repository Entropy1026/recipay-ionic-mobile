import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopCategoryDetailPageRoutingModule } from './top-category-detail-routing.module';

import { TopCategoryDetailPage } from './top-category-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopCategoryDetailPageRoutingModule
  ],
  declarations: [TopCategoryDetailPage]
})
export class TopCategoryDetailPageModule {}
