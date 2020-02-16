import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisputePageRoutingModule } from './dispute-routing.module';

import { DisputePage } from './dispute.page';
import { PagesModule } from '../../pages.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisputePageRoutingModule,
    PagesModule
  ],
  declarations: [DisputePage]
})
export class DisputePageModule {}
