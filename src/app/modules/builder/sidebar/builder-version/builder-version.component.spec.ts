import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { BuilderVersionComponent } from './builder-version.component';

describe('BuilderVersionComponent', () => {
  let component: BuilderVersionComponent;
  let fixture: ComponentFixture<BuilderVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderVersionComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderVersionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
