import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { BuilderTemplateComponent } from './builder-template.component';

describe('BuilderTemplateComponent', () => {
  let component: BuilderTemplateComponent;
  let fixture: ComponentFixture<BuilderTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderTemplateComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderTemplateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
