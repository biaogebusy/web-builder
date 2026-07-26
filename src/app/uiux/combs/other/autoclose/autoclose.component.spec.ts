import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { AutocloseComponent } from './autoclose.component';

describe('AutocloseComponent', () => {
  let component: AutocloseComponent;
  let fixture: ComponentFixture<AutocloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocloseComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocloseComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
