import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawCaseShowcaseComponent } from './law-case-showcase.component';

describe('LawCaseShowcaseComponent', () => {
  let component: LawCaseShowcaseComponent;
  let fixture: ComponentFixture<LawCaseShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawCaseShowcaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawCaseShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
