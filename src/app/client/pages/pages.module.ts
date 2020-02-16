import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoadingMenuComponent } from './components/loading-menu/loading-menu.component';
import { LoadingListComponent } from './components/loading-list/loading-list.component';
import { OrderQuantityComponent } from './components/order-quantity/order-quantity.component';
import { OrderRateComponent } from './components/order-rate/order-rate.component';
import { DisputeDialogComponent } from './components/dispute-dialog/dispute-dialog.component';

@NgModule({
  declarations: [LoadingListComponent, LoadingMenuComponent, OrderQuantityComponent, OrderRateComponent, DisputeDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    LoadingMenuComponent,
    LoadingListComponent,
    OrderQuantityComponent,
    OrderRateComponent,
    DisputeDialogComponent
  ],
  entryComponents: [ OrderQuantityComponent , OrderRateComponent , DisputeDialogComponent]
})
export class PagesModule { }
