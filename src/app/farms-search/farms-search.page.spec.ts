import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FarmsSearchPage } from './farms-search.page';

describe('FarmsSearchPage', () => {
  let component: FarmsSearchPage;
  let fixture: ComponentFixture<FarmsSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmsSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmsSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
