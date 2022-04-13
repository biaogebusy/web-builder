import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawCaseFilesComponent } from './law-case-files.component';

describe('LawCaseFilesComponent', () => {
  let component: LawCaseFilesComponent;
  let fixture: ComponentFixture<LawCaseFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawCaseFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawCaseFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
