import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { DefaultPageComponent } from './default-page.component';

describe('DefaultPageComponent', () => {
  let component: DefaultPageComponent;
  let fixture: ComponentFixture<DefaultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultPageComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
