import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawTabComponent } from './law-tab.component';

describe('LawTabComponent', () => {
  let component: LawTabComponent;
  let fixture: ComponentFixture<LawTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
