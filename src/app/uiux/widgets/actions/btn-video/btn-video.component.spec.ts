import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { BtnVideoComponent } from './btn-video.component';

describe('BtnVideoComponent', () => {
  let component: BtnVideoComponent;
  let fixture: ComponentFixture<BtnVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnVideoComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(BtnVideoComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
