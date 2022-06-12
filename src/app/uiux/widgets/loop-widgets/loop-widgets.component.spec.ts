import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopWidgetsComponent } from './loop-widgets.component';

describe('LoopWidgetsComponent', () => {
  let component: LoopWidgetsComponent;
  let fixture: ComponentFixture<LoopWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoopWidgetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
