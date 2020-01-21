import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopCategoryDetailPage } from './top-category-detail.page';

describe('TopCategoryDetailPage', () => {
  let component: TopCategoryDetailPage;
  let fixture: ComponentFixture<TopCategoryDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopCategoryDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopCategoryDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
