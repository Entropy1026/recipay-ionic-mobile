import { Component, OnInit } from '@angular/core';
import { RecipayDataService } from 'src/app/client/app-data/recipay-data.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  order;

  constructor(
    private recipayData: RecipayDataService
  ) { }

  ngOnInit() {
    this.initOrderDetails();
  }

  initOrderDetails() {
    this.recipayData.getSelectedOrder.subscribe(order => {
      this.order = order;
      console.log(order);
    });
  }

}
