import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCardListComponent } from './dynamic-card-list.component';

describe('DynamicCardListComponent', () => {
  let component: DynamicCardListComponent;
  let fixture: ComponentFixture<DynamicCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
