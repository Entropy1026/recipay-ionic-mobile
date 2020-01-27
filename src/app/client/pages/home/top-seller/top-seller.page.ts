import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { RecipayDataService } from 'src/app/client/app-data/recipay-data.service';

@Component({
  selector: 'app-top-seller',
  templateUrl: './top-seller.page.html',
  styleUrls: ['./top-seller.page.scss'],
})
export class TopSellerPage implements OnInit {

  topSeller = [];
  empty = false;

  constructor(
    private router: Router,
    private recipayApi: RecipayApiService,
    private recipayData: RecipayDataService,
  ) { }

  ngOnInit() {
    this.getSubcategory();
  }

  getSubcategory() {
    this.recipayApi.getTopSeller().subscribe(res => {
      if (!res.error) {
        this.topSeller = res.data;
        if (!this.topSeller) {
          this.empty = true;
        }
      }
    });
  }

  onClickTopSeller(index: number) {
    this.recipayData.setSelectedProduct(this.topSeller[index]);
  }

}
