import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawHeaderComponent } from './law-header.component';

describe('LawHeaderComponent', () => {
  let component: LawHeaderComponent;
  let fixture: ComponentFixture<LawHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
