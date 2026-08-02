import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Subject } from 'rxjs';
import { vi } from 'vitest';
import type { IBranding } from '@core/interface/branding/IBranding';
import { BRANDING } from '@core/token/token-providers';
import { ScreenService } from '@core/service/screen.service';
import { ScreenState } from '@core/state/screen/ScreenState';
import {
  createScreenServiceMock,
  createScreenStateMock,
  provideCoreMocks,
} from '@core/testing/mocks';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let branding$: Subject<IBranding>;
  let observerInstances: MockIntersectionObserver[];

  class MockIntersectionObserver {
    callback: IntersectionObserverCallback;
    observe = vi.fn();
    disconnect = vi.fn();

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
      observerInstances.push(this);
    }
  }

  beforeEach(async () => {
    branding$ = new Subject<IBranding>();
    observerInstances = [];
    const screenService = {
      ...createScreenServiceMock(),
      isPlatformBrowser: vi.fn(() => true),
    };
    const screenState = {
      ...createScreenStateMock(),
    };
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe = vi.fn();
        disconnect = vi.fn();
      }
    );

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]),
        ...provideCoreMocks(),
        { provide: BRANDING, useValue: branding$ },
        { provide: ScreenService, useValue: screenService },
        { provide: ScreenState, useValue: screenState },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('registers the sticky observer when branding renders after view init', () => {
    fixture.detectChanges();
    TestBed.tick();

    expect(observerInstances).toHaveLength(0);

    branding$.next({ header: {} as IBranding['header'] });
    TestBed.tick();

    expect(observerInstances).toHaveLength(1);
    expect(observerInstances[0].observe).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });
});
