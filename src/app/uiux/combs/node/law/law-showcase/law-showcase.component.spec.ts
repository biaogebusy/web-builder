import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawShowcaseComponent } from './law-showcase.component';

describe('LawCaseShowcaseComponent', () => {
  let component: LawShowcaseComponent;
  let fixture: ComponentFixture<LawShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LawShowcaseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
