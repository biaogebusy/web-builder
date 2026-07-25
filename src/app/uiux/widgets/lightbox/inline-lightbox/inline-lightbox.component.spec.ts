import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { InlineLightboxComponent } from './inline-lightbox.component';

describe('InlineLightboxComponent', () => {
  let component: InlineLightboxComponent;
  let fixture: ComponentFixture<InlineLightboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineLightboxComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(InlineLightboxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
