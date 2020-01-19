import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeefCuisinePage } from './beef-cuisine.page';

describe('BeefCuisinePage', () => {
  let component: BeefCuisinePage;
  let fixture: ComponentFixture<BeefCuisinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeefCuisinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeefCuisinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
