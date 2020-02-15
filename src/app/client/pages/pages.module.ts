import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoadingMenuComponent } from './components/loading-menu/loading-menu.component';
import { LoadingListComponent } from './components/loading-list/loading-list.component';
import { OrderQuantityComponent } from './components/order-quantity/order-quantity.component';
import { OrderRateComponent } from './components/order-rate/order-rate.component';

@NgModule({
  declarations: [LoadingListComponent, LoadingMenuComponent, OrderQuantityComponent, OrderRateComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    LoadingMenuComponent,
    LoadingListComponent,
    OrderQuantityComponent,
    OrderRateComponent
  ],
  entryComponents: [ OrderQuantityComponent , OrderRateComponent]
})
export class PagesModule { }
