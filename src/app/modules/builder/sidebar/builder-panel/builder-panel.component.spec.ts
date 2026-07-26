import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { BuilderPanelComponent } from './builder-panel.component';

describe('BuilderPanelComponent', () => {
  let component: BuilderPanelComponent;
  let fixture: ComponentFixture<BuilderPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderPanelComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderPanelComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
