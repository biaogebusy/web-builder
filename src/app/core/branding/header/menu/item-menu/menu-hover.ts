import { delay, filter, fromEvent, map, merge, mergeMap, Observable, of, takeUntil } from 'rxjs';

/** Delay opposite pointer events while keeping sticky-menu closure immediate. */
export function menuHoverState(
  element: HTMLElement,
  stickyMenu: Observable<unknown>
): Observable<boolean> {
  const enter = fromEvent(element, 'mouseenter');
  const leave = fromEvent(element, 'mouseleave');
  return merge(
    enter.pipe(mergeMap(() => of(true).pipe(delay(100), takeUntil(leave)))),
    leave.pipe(mergeMap(() => of(false).pipe(delay(100), takeUntil(enter)))),
    stickyMenu.pipe(
      filter(sticky => !!sticky),
      map(() => false)
    )
  );
}
