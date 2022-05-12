import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawCaseComponent } from './law-case.component';

describe('LawCaseComponent', () => {
  let component: LawCaseComponent;
  let fixture: ComponentFixture<LawCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
