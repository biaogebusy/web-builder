import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryComponent } from './lottery.component';

describe('LotteryComponent', () => {
  let component: LotteryComponent;
  let fixture: ComponentFixture<LotteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotteryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
