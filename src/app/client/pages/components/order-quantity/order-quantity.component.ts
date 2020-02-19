import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-order-quantity',
  templateUrl: './order-quantity.component.html',
  styleUrls: ['./order-quantity.component.scss'],
})
export class OrderQuantityComponent implements OnInit {
  public quantity: number = 1;
  public maxQuantity: number = 10;
  public data;
  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  dismiss() {
    this.modalController.dismiss({
      quantity: this.quantity
    });
  }

  minus() {
    if (this.quantity !== 0) {
      this.quantity = this.quantity - 1;
    }
  }

  add() {
    if (this.quantity < this.data) {
      this.quantity = this.quantity + 1;
    }
  }

}
