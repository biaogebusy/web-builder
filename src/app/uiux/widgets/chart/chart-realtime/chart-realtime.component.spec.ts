import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRealtimeComponent } from './chart-realtime.component';

describe('ChartRealtimeComponent', () => {
  let component: ChartRealtimeComponent;
  let fixture: ComponentFixture<ChartRealtimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartRealtimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRealtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
