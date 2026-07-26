import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { BgComponent } from './bg.component';

describe('BgComponent', () => {
  let component: BgComponent;
  let fixture: ComponentFixture<BgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BgComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(BgComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
