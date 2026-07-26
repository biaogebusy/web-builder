import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { FlagComponent } from './flag.component';

describe('FlagComponent', () => {
  let component: FlagComponent;
  let fixture: ComponentFixture<FlagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(FlagComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
