import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderVersionComponent } from './builder-version.component';

describe('BuilderVersionComponent', () => {
  let component: BuilderVersionComponent;
  let fixture: ComponentFixture<BuilderVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuilderVersionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
