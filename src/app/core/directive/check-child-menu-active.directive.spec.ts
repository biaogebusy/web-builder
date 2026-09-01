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
      // querySelectorAll('a[class~=active]') selects all descendant <a>s
      // including the parent link itself.
      const { fixture } = setup();
      fixture.detectChanges();
      vi.advanceTimersByTime(0);

      const preactive = fixture.debugElement.query(By.css('.parent-preactive'));
      expect(preactive.nativeElement.classList.contains('active')).toBe(true);
    });
  });

  describe('router navigation', () => {
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
