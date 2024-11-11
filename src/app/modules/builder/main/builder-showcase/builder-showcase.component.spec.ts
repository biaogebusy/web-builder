import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderShowcaseComponent } from './builder-showcase.component';

describe('BuilderShowcaseComponent', () => {
  let component: BuilderShowcaseComponent;
  let fixture: ComponentFixture<BuilderShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuilderShowcaseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
