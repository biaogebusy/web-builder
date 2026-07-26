import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { BgImgComponent } from './bg-img.component';

describe('BgImgComponent', () => {
  let component: BgImgComponent;
  let fixture: ComponentFixture<BgImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BgImgComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(BgImgComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
