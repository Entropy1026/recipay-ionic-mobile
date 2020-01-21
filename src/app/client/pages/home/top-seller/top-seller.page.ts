import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';

@Component({
  selector: 'app-top-seller',
  templateUrl: './top-seller.page.html',
  styleUrls: ['./top-seller.page.scss'],
})
export class TopSellerPage implements OnInit {

  constructor(
    private router: Router,
    private recipayApi: RecipayApiService
  ) { }

  ngOnInit() {
    this.getSubcategory();
  }

  // onClickCategory() {
  //   this.router.navigate(['/']);
  // }

  getSubcategory() {
    const params = {
      category: 'fish'
    };
    this.recipayApi.getSubcategory(params).subscribe(data => {
      console.log(data);
    });
  }

}
