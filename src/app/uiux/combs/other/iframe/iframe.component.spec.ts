import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PAGE_CONTENT } from '@core/token/token-providers';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { IframeComponent } from './iframe.component';

describe('IframeComponent', () => {
  let component: IframeComponent;
  let fixture: ComponentFixture<IframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IframeComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(IframeComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('IframeComponent without PAGE_CONTENT', () => {
  it('renders on routes that do not provide PAGE_CONTENT, like the builder canvas', async () => {
    await TestBed.configureTestingModule({
      imports: [IframeComponent],
      providers: [
        provideRouter([]),
        ...provideUiuxMocks().filter(p => (p as { provide?: unknown }).provide !== PAGE_CONTENT),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(IframeComponent);
    fixture.componentRef.setInput('content', { url: '/preview' });
    fixture.detectChanges();

    expect(fixture.componentInstance.url()).toBe('/preview');
  });
});
