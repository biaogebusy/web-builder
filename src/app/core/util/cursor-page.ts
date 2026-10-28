/** A page position without retaining the records or transport state of previous pages. */
export interface CursorPage<T> {
  /** Cursor for the current request; the caller defines its initial value. */
  readonly cursor: T;
  /** Preceding request cursors in navigation order. */
  readonly previous: readonly T[];
}

/** Start a new filter window using the endpoint's initial cursor. */
export function initialCursorPage<T>(cursor: T): CursorPage<T> {
  return { cursor, previous: [] };
}

/** Advance using a supplied cursor, even when the current page has no visible records. */
export function advanceCursorPage<T>(page: CursorPage<T>, cursor: T): CursorPage<T> {
  return { cursor, previous: [...page.previous, page.cursor] };
}

/** Restore the previous request; returning the same position at the first page is a no-op. */
export function retreatCursorPage<T>(page: CursorPage<T>): CursorPage<T> {
  return page.previous.length ? {
    cursor: page.previous[page.previous.length - 1], previous: page.previous.slice(0, -1),
  } : page;
}
