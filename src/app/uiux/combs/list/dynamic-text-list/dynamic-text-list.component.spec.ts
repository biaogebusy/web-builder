import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTextListComponent } from './dynamic-text-list.component';

describe('DynamicTextListComponent', () => {
  let component: DynamicTextListComponent;
  let fixture: ComponentFixture<DynamicTextListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicTextListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTextListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
