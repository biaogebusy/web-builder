import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawCaseTableComponent } from './law-case-table.component';

describe('LawCaseTableComponent', () => {
  let component: LawCaseTableComponent;
  let fixture: ComponentFixture<LawCaseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawCaseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawCaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
