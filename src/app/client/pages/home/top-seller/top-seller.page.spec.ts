import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopSellerPage } from './top-seller.page';

describe('TopSellerPage', () => {
  let component: TopSellerPage;
  let fixture: ComponentFixture<TopSellerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSellerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopSellerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
