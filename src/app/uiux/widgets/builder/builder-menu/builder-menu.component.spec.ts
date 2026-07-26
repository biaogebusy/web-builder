import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { BuilderMenuComponent } from './builder-menu.component';

describe('BuilderMenuComponent', () => {
  let component: BuilderMenuComponent;
  let fixture: ComponentFixture<BuilderMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderMenuComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
