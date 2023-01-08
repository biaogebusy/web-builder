import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawCardComponent } from './law-card.component';

describe('LawCardComponent', () => {
  let component: LawCardComponent;
  let fixture: ComponentFixture<LawCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
