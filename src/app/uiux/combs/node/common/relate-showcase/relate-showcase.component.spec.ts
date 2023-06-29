import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelateShowcaseComponent } from './relate-showcase.component';

describe('RelateShowcaseComponent', () => {
  let component: RelateShowcaseComponent;
  let fixture: ComponentFixture<RelateShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelateShowcaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelateShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
