import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsEventPage } from './details-event.page';

describe('DetailsEventPage', () => {
  let component: DetailsEventPage;
  let fixture: ComponentFixture<DetailsEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsEventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
