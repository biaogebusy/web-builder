import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragPreviewComponent } from './drag-preview.component';

describe('DragPreviewComponent', () => {
  let component: DragPreviewComponent;
  let fixture: ComponentFixture<DragPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
