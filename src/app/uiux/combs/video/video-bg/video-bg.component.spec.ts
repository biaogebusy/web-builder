import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { VideoBgComponent } from './video-bg.component';

describe('VideoBgComponent', () => {
  let component: VideoBgComponent;
  let fixture: ComponentFixture<VideoBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoBgComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoBgComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
