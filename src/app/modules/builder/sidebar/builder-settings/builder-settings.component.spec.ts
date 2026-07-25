import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { BuilderSettingsComponent } from './builder-settings.component';

describe('BuilderSettingsComponent', () => {
  let component: BuilderSettingsComponent;
  let fixture: ComponentFixture<BuilderSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderSettingsComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderSettingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
