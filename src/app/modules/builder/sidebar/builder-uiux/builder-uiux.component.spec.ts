import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { BuilderUiuxComponent } from './builder-uiux.component';

describe('BuilderUiuxComponent', () => {
  let component: BuilderUiuxComponent;
  let fixture: ComponentFixture<BuilderUiuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderUiuxComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderUiuxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
