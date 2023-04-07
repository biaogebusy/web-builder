import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBoxComponent } from './chart-box.component';

describe('ChartBoxComponent', () => {
  let component: ChartBoxComponent;
  let fixture: ComponentFixture<ChartBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
