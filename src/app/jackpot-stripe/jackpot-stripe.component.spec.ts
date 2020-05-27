import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JackpotStripeComponent } from './jackpot-stripe.component';

describe('JackpotStripeComponent', () => {
  let component: JackpotStripeComponent;
  let fixture: ComponentFixture<JackpotStripeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JackpotStripeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JackpotStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
