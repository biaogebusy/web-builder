import { Subject } from 'rxjs';
import { vi } from 'vitest';
import { menuHoverState } from './menu-hover';

describe('menu hover state', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('cancels entry when the pointer leaves before the delay', () => {
    const element = document.createElement('div');
    const states: boolean[] = [];
    const subscription = menuHoverState(element, new Subject()).subscribe(v => states.push(v));
    element.dispatchEvent(new Event('mouseenter'));
    vi.advanceTimersByTime(50);
    element.dispatchEvent(new Event('mouseleave'));
    vi.advanceTimersByTime(99);
    expect(states).toEqual([]);
    vi.advanceTimersByTime(1);
    expect(states).toEqual([false]);
    subscription.unsubscribe();
  });

  it('cancels delayed exit on reentry and closes immediately for sticky menus', () => {
    const element = document.createElement('div');
    const sticky = new Subject<boolean>();
    const states: boolean[] = [];
    const subscription = menuHoverState(element, sticky).subscribe(v => states.push(v));
    element.dispatchEvent(new Event('mouseenter'));
    vi.advanceTimersByTime(100);
    element.dispatchEvent(new Event('mouseleave'));
    vi.advanceTimersByTime(50);
    element.dispatchEvent(new Event('mouseenter'));
    vi.advanceTimersByTime(100);
    expect(states).toEqual([true, true]);
    sticky.next(false);
    expect(states).toEqual([true, true]);
    sticky.next(true);
    expect(states).toEqual([true, true, false]);
    subscription.unsubscribe();
  });

  it('preserves a pending entry across sticky closure, but cancels it on unsubscribe', () => {
    const element = document.createElement('div');
    const sticky = new Subject<boolean>();
    const states: boolean[] = [];
    const subscription = menuHoverState(element, sticky).subscribe(v => states.push(v));
    element.dispatchEvent(new Event('mouseenter'));
    sticky.next(true);
    vi.advanceTimersByTime(100);
    expect(states).toEqual([false, true]);
    element.dispatchEvent(new Event('mouseleave'));
    subscription.unsubscribe();
    sticky.next(true);
    vi.advanceTimersByTime(100);
    expect(states).toEqual([false, true]);
  });
});
