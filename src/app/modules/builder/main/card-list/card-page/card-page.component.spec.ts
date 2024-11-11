import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPageComponent } from './card-page.component';

describe('CardPageComponent', () => {
  let component: CardPageComponent;
  let fixture: ComponentFixture<CardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
