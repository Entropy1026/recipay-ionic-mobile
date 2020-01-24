import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubcategoryPageRoutingModule } from './subcategory-routing.module';

import { SubcategoryPage } from './subcategory.page';
import { PagesModule } from '../../../pages.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesModule,
    SubcategoryPageRoutingModule
  ],
  declarations: [SubcategoryPage]
})
export class SubcategoryPageModule {}
