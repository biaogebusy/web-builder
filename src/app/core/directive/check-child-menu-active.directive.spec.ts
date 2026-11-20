import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CheckChildMenuActiveDirective } from '@core/directive/check-child-menu-active.directive';

@Component({
  selector: 'app-test-menu',
  standalone: true,
  imports: [CheckChildMenuActiveDirective],
  template: `
    <ul>
      <li checkChildMenuActive class="parent">
        <a href="/a" class="link">Parent</a>
        <ul>
          <li><a href="/a/child1" class="link">Child 1</a></li>
          <li><a href="/a/child2" class="link active">Child 2</a></li>
        </ul>
      </li>
      <li checkChildMenuActive class="parent-solo">
        <a href="/b" class="link">Solo</a>
      </li>
      <li checkChildMenuActive class="parent-preactive">
        <a href="/c" class="link active">Pre-active</a>
        <ul>
          <li><a href="/c/sub" class="link">Sub</a></li>
        </ul>
      </li>
    </ul>
  `,
})
class TestMenuComponent {}

describe('CheckChildMenuActiveDirective', () => {
  const setup = () => {
    const events$ = new Subject<any>();
    const routerMock = {
      events: events$,
      navigate: vi.fn(),
      url: '/',
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerMock }],
    });

    const fixture = TestBed.createComponent(TestMenuComponent);
    return { fixture, events$ };
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  describe('initial updateClasses', () => {
    it('adds "active" class to a parent whose child link is active', () => {
      const { fixture } = setup();
      fixture.detectChanges();
      vi.advanceTimersByTime(0);

      const parent = fixture.debugElement.query(By.css('.parent'));
      expect(parent.nativeElement.classList.contains('active')).toBe(true);
    });

    it('does not add "active" when no child link is active', () => {
      const { fixture } = setup();
      fixture.detectChanges();
      vi.advanceTimersByTime(0);

      const solo = fixture.debugElement.query(By.css('.parent-solo'));
      expect(solo.nativeElement.classList.contains('active')).toBe(false);
    });

    it('removes an existing "active" class when no child has it', () => {
      const { fixture } = setup();
      const solo = fixture.debugElement.query(By.css('.parent-solo'));
      solo.nativeElement.classList.add('active');

      fixture.detectChanges();
      vi.advanceTimersByTime(0);

      expect(solo.nativeElement.classList.contains('active')).toBe(false);
    });

    it('considers the parent own <a class="active"> as a matching child', () => {
      // The parent's own anchor is also a descendant of the directive host.
      const { fixture } = setup();
      fixture.detectChanges();
      vi.advanceTimersByTime(0);

      const preactive = fixture.debugElement.query(By.css('.parent-preactive'));
      expect(preactive.nativeElement.classList.contains('active')).toBe(true);
    });
  });

  describe('pending updates', () => {
    it('cancels the initial update when its menu is destroyed before the timer runs', () => {
      const { fixture } = setup();
      fixture.autoDetectChanges();
      const parent: HTMLElement = fixture.nativeElement.querySelector('.parent');
      expect(parent.classList.contains('active')).toBe(false);

      fixture.destroy();
      vi.advanceTimersByTime(0);

      expect(parent.classList.contains('active')).toBe(false);
    });

    it('cancels queued navigation updates and ignores events after destruction', () => {
      const { fixture, events$ } = setup();
      fixture.autoDetectChanges();
      vi.advanceTimersByTime(0);
      const parent: HTMLElement = fixture.nativeElement.querySelector('.parent');
      parent.querySelector('a.active')!.classList.remove('active');
      for (let id = 1; id <= 3; id++) {
        events$.next(new NavigationEnd(id, `/page-${id}`, `/page-${id}`));
      }
      expect(parent.classList.contains('active')).toBe(true);

      fixture.destroy();
      events$.next(new NavigationEnd(4, '/after-destroy', '/after-destroy'));
      vi.advanceTimersByTime(0);

      expect(parent.classList.contains('active')).toBe(true);
    });

    it('defers rapid navigation updates until descendant links have their latest state', () => {
      const { fixture, events$ } = setup();
      fixture.autoDetectChanges();
      vi.advanceTimersByTime(0);
      const parent: HTMLElement = fixture.nativeElement.querySelector('.parent');
      const link = parent.querySelector('a.active')!;

      link.classList.remove('active');
      events$.next(new NavigationEnd(1, '/other', '/other'));
      expect(parent.classList.contains('active')).toBe(true);
      link.classList.add('active');
      events$.next(new NavigationEnd(2, '/a/child2', '/a/child2'));
      vi.advanceTimersByTime(0);
      expect(parent.classList.contains('active')).toBe(true);

      link.classList.remove('active');
      events$.next(new NavigationEnd(3, '/other', '/other'));
      expect(parent.classList.contains('active')).toBe(true);
      vi.advanceTimersByTime(0);
      expect(parent.classList.contains('active')).toBe(false);
    });
  });

  describe('router navigation', () => {
    it('does not rewrite parent classes when navigation keeps their active state', async () => {
      vi.useRealTimers();
      const { fixture, events$ } = setup();
      await fixture.whenStable();
      const parent: HTMLElement = fixture.nativeElement.querySelector('.parent');
      const solo: HTMLElement = fixture.nativeElement.querySelector('.parent-solo');
      await vi.waitFor(() => expect(parent.classList.contains('active')).toBe(true));
      vi.useFakeTimers();

      const observer = new MutationObserver(() => undefined);
      for (const element of [parent, solo]) {
        observer.observe(element, { attributes: true, attributeFilter: ['class'] });
      }
      const mutations: number[] = [];
      for (let id = 1; id <= 3; id++) {
        events$.next(new NavigationEnd(id, `/a/child2?visit=${id}`, '/a/child2'));
        vi.advanceTimersByTime(0);
        mutations.push(observer.takeRecords().length);
      }
      observer.disconnect();

      expect(parent.classList.contains('active')).toBe(true);
      expect(solo.classList.contains('active')).toBe(false);
      expect(mutations).toEqual([0, 0, 0]);
    });

    it('re-runs updateClasses after NavigationEnd events', () => {
      const { fixture, events$ } = setup();
      fixture.detectChanges();
      vi.advanceTimersByTime(0);

      const parent = fixture.debugElement.query(By.css('.parent'));
      expect(parent.nativeElement.classList.contains('active')).toBe(true);

      // Remove child active state
      const childLink = parent.nativeElement.querySelector('.active');
      childLink.classList.remove('active');

      events$.next(new NavigationEnd(1, '/new-path', '/new-path'));
      vi.advanceTimersByTime(0);

      expect(parent.nativeElement.classList.contains('active')).toBe(false);
    });

    it('ignores router events that are not NavigationEnd', () => {
      const { fixture, events$ } = setup();
      fixture.detectChanges();
      vi.advanceTimersByTime(0);

      const parent = fixture.debugElement.query(By.css('.parent'));
      expect(parent.nativeElement.classList.contains('active')).toBe(true);

      const childLink = parent.nativeElement.querySelector('.active');
      childLink.classList.remove('active');

      // Non-NavigationEnd event — updateClasses not called
      events$.next({ id: 1, url: '/x' });
      vi.advanceTimersByTime(100);

      expect(parent.nativeElement.classList.contains('active')).toBe(true);
    });
  });
});
