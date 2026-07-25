import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { BuilderShowcaseComponent } from './builder-showcase.component';

describe('BuilderShowcaseComponent', () => {
  let component: BuilderShowcaseComponent;
  let fixture: ComponentFixture<BuilderShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderShowcaseComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderShowcaseComponent);
    fixture.componentRef.setInput('content', { title: '', card: {} });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
