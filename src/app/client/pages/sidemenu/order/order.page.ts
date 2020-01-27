import { Component, OnInit } from '@angular/core';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { RecipayDataService } from 'src/app/client/app-data/recipay-data.service';
import { User } from 'src/app/client/models/user';
import { UserService } from 'src/app/client/app-data/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  user: User;
  empty = false;
  orders = [];

  constructor(
    private recipayApi: RecipayApiService,
    private recipayData: RecipayDataService,
    private userData: UserService,
  ) { }

  ngOnInit() {
    this.initOrders();
  }

  initOrders() {
    this.userData.getUser.subscribe(user => {
      this.user = user;
    });
    const params = {
      user_id: this.user.id
    };
    this.recipayApi.getOrders(params).subscribe(res => {
      if (!res.error) {
        this.orders = res.data || [];
        console.log(res);
        if (this.orders.length === 0) {
          this.empty = true;
        }
      }
    });
  }

}
