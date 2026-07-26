import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { BuilderPageComponent } from './builder-page.component';

describe('BuilderPageComponent', () => {
  let component: BuilderPageComponent;
  let fixture: ComponentFixture<BuilderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderPageComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
