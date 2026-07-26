import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { LangSwitchComponent } from './lang-switch.component';

describe('LangSwitchComponent', () => {
  let component: LangSwitchComponent;
  let fixture: ComponentFixture<LangSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LangSwitchComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(LangSwitchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
