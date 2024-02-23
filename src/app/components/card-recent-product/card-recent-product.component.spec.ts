import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRecentProductComponent } from './card-recent-product.component';

describe('CardRecentProductComponent', () => {
  let component: CardRecentProductComponent;
  let fixture: ComponentFixture<CardRecentProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardRecentProductComponent]
    });
    fixture = TestBed.createComponent(CardRecentProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
