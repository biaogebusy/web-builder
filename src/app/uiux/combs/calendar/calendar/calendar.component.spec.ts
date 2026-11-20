import { TestBed } from '@angular/core/testing';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { vi } from 'vitest';
import { ScreenService } from '@core/service/screen.service';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { CalendarComponent } from './calendar.component';

const api = {
  view: { type: 'listMonth' },
  getDate: vi.fn(() => new Date('2026-11-01T00:00:00Z')),
  changeView: vi.fn(), updateSize: vi.fn(), gotoDate: vi.fn(),
};

describe('CalendarComponent responsive layout', () => {
  let resized: (entries: { contentRect: { width: number } }[]) => void;
  const observe = vi.fn();
  const disconnect = vi.fn();
  const frames = new Map<number, FrameRequestCallback>();
  let sequence = 0;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(FullCalendarComponent.prototype, 'getApi')
      .mockReturnValue(api as unknown as ReturnType<FullCalendarComponent['getApi']>);
    frames.clear();
    api.view.type = 'listMonth';
    vi.stubGlobal('ResizeObserver', class {
      constructor(callback: typeof resized) { resized = callback; }
      observe = observe;
      disconnect = disconnect;
    });
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      frames.set(++sequence, callback);
      return sequence;
    });
    vi.stubGlobal('cancelAnimationFrame', (id: number) => frames.delete(id));
    TestBed.configureTestingModule({
      imports: [CalendarComponent], providers: [...provideUiuxMocks(),
        { provide: ScreenService, useValue: { isPlatformBrowser: () => true } }],
    });
  });
  afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

  function resize(width: number) {
    resized([{ contentRect: { width } }]);
    for (const [id, callback] of frames) { frames.delete(id); callback(0); }
  }

  it('preserves supplied options unless responsive mode is enabled', async () => {
    const fixture = TestBed.createComponent(CalendarComponent);
    const options = { initialView: 'dayGridMonth', plugins: [dayGridPlugin], editable: true };
    fixture.componentRef.setInput('options', options);
    await fixture.whenStable();
    expect(fixture.componentInstance.calendarOptions()).toBe(options);
    expect(observe).not.toHaveBeenCalled();
  });

  it('uses container width, keeps the browsed date and releases pending resize work', async () => {
    const fixture = TestBed.createComponent(CalendarComponent);
    fixture.componentRef.setInput('responsive', true);
    fixture.componentRef.setInput('options', { initialDate: '2026-10-21', timeZone: 'UTC' });
    await fixture.whenStable();
    expect(observe).toHaveBeenCalledWith(fixture.nativeElement);
    resize(320);
    expect(api.changeView).not.toHaveBeenCalled();
    resize(1000);
    expect(api.changeView).toHaveBeenCalledWith('dayGridMonth', api.getDate());
    api.view.type = 'dayGridMonth';
    resize(639);
    expect(api.changeView).toHaveBeenLastCalledWith('listMonth', api.getDate());
    fixture.componentRef.setInput('options', { initialDate: '2027-02-01', timeZone: 'UTC' });
    await fixture.whenStable();
    expect(api.gotoDate).toHaveBeenLastCalledWith('2027-02-01');
    resized([{ contentRect: { width: 800 } }]);
    expect(frames.size).toBe(1);
    const pendingFrame = [...frames.keys()][0];
    fixture.destroy();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(frames.has(pendingFrame)).toBe(false);
  });
});
