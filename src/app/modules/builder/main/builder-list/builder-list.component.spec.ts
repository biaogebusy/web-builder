import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { BuilderListComponent } from './builder-list.component';

describe('BuilderListComponent', () => {
  let component: BuilderListComponent;
  let fixture: ComponentFixture<BuilderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderListComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
