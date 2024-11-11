import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressGroupComponent } from './progress-group.component';

describe('ProgressGroupComponent', () => {
  let component: ProgressGroupComponent;
  let fixture: ComponentFixture<ProgressGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
