import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoadingMenuComponent } from './components/loading-menu/loading-menu.component';
import { LoadingListComponent } from './components/loading-list/loading-list.component';

@NgModule({
  declarations: [LoadingListComponent, LoadingMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    LoadingMenuComponent,
    LoadingListComponent
  ]
})
export class PagesModule { }
