import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideCoreMocks } from '@core/testing/mocks';
import { ScreenState } from '@core/state/screen/ScreenState';
import { vi } from 'vitest';

import { MegaMenuComponent } from './mega-menu.component';

describe('MegaMenuComponent', () => {
  let component: MegaMenuComponent;
  let fixture: ComponentFixture<MegaMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MegaMenuComponent],
      providers: [provideRouter([]), ...provideCoreMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(MegaMenuComponent);
    fixture.componentRef.setInput('content', { child: [] });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('stops pointer and sticky-menu callbacks after destruction', () => {
    vi.useFakeTimers();
    try {
      component.initActionEvent();
      fixture.nativeElement.dispatchEvent(new Event('mouseenter'));
      vi.advanceTimersByTime(100);
      expect(component.active).toBe(true);
      fixture.nativeElement.dispatchEvent(new Event('mouseleave'));
      fixture.destroy();
      TestBed.inject(ScreenState).stickyMenu$.next(true);
      vi.advanceTimersByTime(100);
      expect(component.active).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });
});
