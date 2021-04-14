import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCombsComponent } from './dynamic-combs.component';

describe('DynamicCombsComponent', () => {
  let component: DynamicCombsComponent;
  let fixture: ComponentFixture<DynamicCombsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicCombsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCombsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
