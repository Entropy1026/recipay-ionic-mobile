import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FishCuisinePage } from './fish-cuisine.page';

describe('FishCuisinePage', () => {
  let component: FishCuisinePage;
  let fixture: ComponentFixture<FishCuisinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishCuisinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FishCuisinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
