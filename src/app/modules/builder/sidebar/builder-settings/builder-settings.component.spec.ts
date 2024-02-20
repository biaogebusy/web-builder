import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderSettingsComponent } from './builder-settings.component';

describe('BuilderSettingsComponent', () => {
  let component: BuilderSettingsComponent;
  let fixture: ComponentFixture<BuilderSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilderSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
