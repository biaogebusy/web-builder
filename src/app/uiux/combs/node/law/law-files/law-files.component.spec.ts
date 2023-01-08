import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawFilesComponent } from './law-files.component';

describe('LawFilesComponent', () => {
  let component: LawFilesComponent;
  let fixture: ComponentFixture<LawFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LawFilesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
