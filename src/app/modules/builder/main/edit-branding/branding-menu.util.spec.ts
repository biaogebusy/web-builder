import {
  appendBrandingChild,
  appendBrandingItem,
  insertBrandingChild,
  insertBrandingItem,
  moveBrandingItems,
  removeBrandingChild,
  removeBrandingItem,
  updateBrandingChild,
  updateBrandingItem,
} from './branding-menu.util';

describe('branding menu utilities', () => {
  it('moves, appends, inserts, updates, and removes root items immutably', () => {
    const items = [{ label: 'A' }, { label: 'B' }, { label: 'C' }];

    expect(moveBrandingItems(items, 0, 2).map(item => item.label)).toEqual(['B', 'C', 'A']);
    expect(appendBrandingItem(items, { label: 'D' }).map(item => item.label)).toEqual([
      'A',
      'B',
      'C',
      'D',
    ]);
    expect(insertBrandingItem(items, 1, { label: 'X' }).map(item => item.label)).toEqual([
      'A',
      'X',
      'B',
      'C',
    ]);
    expect(updateBrandingItem(items, 1, 'href', '/b')[1]).toEqual({ label: 'B', href: '/b' });
    expect(removeBrandingItem(items, 1).map(item => item.label)).toEqual(['A', 'C']);
    expect(items).toEqual([{ label: 'A' }, { label: 'B' }, { label: 'C' }]);
  });

  it('adds, inserts, updates, and removes nested children immutably', () => {
    const items = [{ label: 'A', child: [{ label: 'a' }] }, { label: 'B' }];

    const appended = appendBrandingChild(items, 1, { label: 'b' });
    expect(appended[1].child).toEqual([{ label: 'b' }]);

    const inserted = insertBrandingChild(items, 0, 1, { label: 'x' });
    expect(inserted[0].child?.map(item => item.label)).toEqual(['a', 'x']);

    const updated = updateBrandingChild(items, 0, 0, 'href', '/a');
    expect(updated[0].child?.[0]).toEqual({ label: 'a', href: '/a' });

    const removed = removeBrandingChild(inserted, 0, 0);
    expect(removed[0].child?.map(item => item.label)).toEqual(['x']);
    expect(items[0].child).toEqual([{ label: 'a' }]);
  });
});
