import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PorkCuisinePage } from './pork-cuisine.page';

describe('PorkCuisinePage', () => {
  let component: PorkCuisinePage;
  let fixture: ComponentFixture<PorkCuisinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorkCuisinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PorkCuisinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
