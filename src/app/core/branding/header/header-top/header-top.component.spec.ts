import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { ScreenService } from '@core/service/screen.service';
import { ScreenState } from '@core/state/screen/ScreenState';
import { HeaderTopComponent } from './header-top.component';

describe('HeaderTopComponent', () => {
  const setup = async (browser = true) => {
    const breakpoints = new Subject<string[]>();
    const mqAlias = vi.fn(() => breakpoints);
    await TestBed.configureTestingModule({
      imports: [HeaderTopComponent],
      providers: [
        { provide: ScreenState, useValue: { mqAlias$: mqAlias } },
        { provide: ScreenService, useValue: { isPlatformBrowser: () => browser } },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(HeaderTopComponent);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    return { fixture, element, breakpoints, mqAlias };
  };

  it.each([
    { aliases: ['xs'], visible: false },
    { aliases: ['sm'], visible: false },
    { aliases: ['md'], visible: true },
    { aliases: ['lg'], visible: true },
    { aliases: ['xl'], visible: true },
    { aliases: ['unknown'], visible: false },
    { aliases: [], visible: false },
    { aliases: ['sm', 'lg'], visible: true },
  ])('preserves visibility for $aliases', async ({ aliases, visible }) => {
    const { element, breakpoints } = await setup();
    breakpoints.next(aliases);
    expect(element.classList.contains('block')).toBe(visible);
    expect(element.classList.contains('hidden')).toBe(!visible);
  });

  it('switches between desktop and mobile without removing unrelated classes', async () => {
    const { element, breakpoints } = await setup();
    element.classList.add('custom-top');
    for (const [alias, display] of [['md', 'block'], ['xs', 'hidden'], ['xl', 'block']]) {
      breakpoints.next([alias]);
      expect(Array.from(element.classList).sort()).toEqual(['custom-top', display].sort());
    }
  });

  it.each([['md', 'lg', 'xl', 'md'], ['xs', 'sm', 'unknown', 'xs']])(
    'avoids class mutations when visibility stays unchanged after %s',
    async (initial, ...aliases) => {
      const { element, breakpoints } = await setup();
      breakpoints.next([initial]);
      const observer = new MutationObserver(() => undefined);
      observer.observe(element, { attributes: true, attributeFilter: ['class'] });
      const counts = aliases.map(alias => {
        breakpoints.next([alias]);
        return observer.takeRecords().length;
      });
      observer.disconnect();
      expect(counts).toEqual([0, 0, 0]);
    }
  );

  it('leaves server-rendered classes unchanged without observing breakpoints', async () => {
    const { element, breakpoints, mqAlias } = await setup(false);
    const initialClass = element.getAttribute('class');
    breakpoints.next(['md']);
    expect(mqAlias).not.toHaveBeenCalled();
    expect(element.getAttribute('class')).toBe(initialClass);
  });

  it('stops applying breakpoint changes when the component is destroyed', async () => {
    const { fixture, element, breakpoints } = await setup();
    breakpoints.next(['md']);
    fixture.destroy();
    breakpoints.next(['xs']);
    expect(element.classList.contains('block')).toBe(true);
    expect(element.classList.contains('hidden')).toBe(false);
  });
});
