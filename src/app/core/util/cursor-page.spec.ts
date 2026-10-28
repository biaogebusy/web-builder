import { advanceCursorPage, initialCursorPage, retreatCursorPage } from './cursor-page';

describe('cursor page transitions', () => {
  it('returns through request cursors without mutating earlier positions', () => {
    const first = initialCursorPage<string | null>(null);
    const second = advanceCursorPage(first, 'page-b');
    const third = advanceCursorPage(second, 'page-c');
    expect(retreatCursorPage(third)).toEqual(second);
    expect(retreatCursorPage(second)).toEqual(first);
    expect(retreatCursorPage(first)).toBe(first);
    expect(first.previous).toEqual([]);
    expect(second.previous).toEqual([null]);
  });

  it('preserves numeric zero and allows a new filter to reset independently of results', () => {
    const first = initialCursorPage(0);
    const next = advanceCursorPage(first, 40);
    expect(retreatCursorPage(next).cursor).toBe(0);
    expect(initialCursorPage(0)).toEqual(first);
    expect(next).toEqual({ cursor: 40, previous: [0] });
  });
});
