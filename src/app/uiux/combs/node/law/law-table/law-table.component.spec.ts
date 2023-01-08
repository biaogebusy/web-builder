import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawTableComponent } from './law-table.component';

describe('LawTableComponent', () => {
  let component: LawTableComponent;
  let fixture: ComponentFixture<LawTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LawTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
