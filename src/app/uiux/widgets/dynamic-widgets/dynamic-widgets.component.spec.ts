import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicWidgetsComponent } from './dynamic-widgets.component';

describe('DynamicWidgetsComponent', () => {
  let component: DynamicWidgetsComponent;
  let fixture: ComponentFixture<DynamicWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicWidgetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
