import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationSimpleComponent } from './pagination-simple.component';

describe('PaginationSimpleComponent', () => {
  let component: PaginationSimpleComponent;
  let fixture: ComponentFixture<PaginationSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
