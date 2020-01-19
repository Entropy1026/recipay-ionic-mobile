import { Component, OnInit } from '@angular/core';
import { RecipayApiService } from '../../api/recipay-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  slideOpts;
  ads;

  constructor(
    private recipayApi: RecipayApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.slideOpts = {
      autoplay: true,
    };
    this.recipayApi.getAds().subscribe((ads: any) => {
      this.ads = ads.data;
    });
  }

  onClickAd(link: string) {
    window.open(link);
  }

  onClickTopSeller() {
    this.router.navigate(['/home/top-seller']);
  }

}
