import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { ComponentToolbarComponent } from './component-toolbar.component';

describe('ComponentToolbarComponent', () => {
  let component: ComponentToolbarComponent;
  let fixture: ComponentFixture<ComponentToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentToolbarComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentToolbarComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
