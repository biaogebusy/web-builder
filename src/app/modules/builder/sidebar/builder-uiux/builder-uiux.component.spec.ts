import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderUiuxComponent } from './builder-uiux.component';

describe('BuilderUiuxComponent', () => {
  let component: BuilderUiuxComponent;
  let fixture: ComponentFixture<BuilderUiuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuilderUiuxComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderUiuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
