import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RecipayApiService } from '../../api/recipay-api.service';
import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';
import { Menu } from '../../models/menu';
import { RecipayDataService } from '../../app-data/recipay-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  menu: Menu;
  slideOpts;
  ads;

  constructor(
    private recipayApi: RecipayApiService,
    private recipayData: RecipayDataService,
    private router: Router,
    private detectRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.initAds();
    this.initMenu();
  }

  initAds() {
    this.slideOpts = {
      autoplay: true,
    };
    this.recipayApi.getAds().pipe(retry(2)).subscribe((ads: any) => {
      this.ads = ads.data;
      this.detectRef.detectChanges();
    });
  }

  initMenu() {
    this.recipayApi.getMenu().pipe(retry(2)).subscribe((menu: any) => {
      this.menu = menu.data;
      this.detectRef.detectChanges();
    });
  }

  onClickAds(link: string) {
    window.open(link);
  }

  onClickTopSeller() {
    this.router.navigate(['/home/top-seller']);
  }

  onClickMenu(index: number) {
    this.recipayData.setSelectedMenu(this.menu[index]);
    this.router.navigate(['/home/category']);
  }
}
