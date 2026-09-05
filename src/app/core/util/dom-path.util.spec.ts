import { generatePath } from '@core/util/dom-path.util';

describe('dom-path util', () => {
  const root = () => document.createElement('div');

  it('returns the direct data-path when the element is inside a component-item', () => {
    const r = root();
    r.classList.add('component-item');
    const target = document.createElement('span');
    target.setAttribute('data-path', 'title');
    r.appendChild(target);

    expect(generatePath(target)).toBe('title');
  });

  it('prepends each ancestor data-path up to the component-item', () => {
    const r = root();
    r.classList.add('component-item');

    const level1 = document.createElement('div');
    level1.setAttribute('data-path', 'items.0');
    r.appendChild(level1);

    const level2 = document.createElement('div');
    level2.setAttribute('data-path', 'sub');
    level1.appendChild(level2);

    const target = document.createElement('span');
    target.setAttribute('data-path', 'label');
    level2.appendChild(target);

    expect(generatePath(target)).toBe('items.0.sub.label');
  });

  it('skips ancestors without a data-path attribute', () => {
    const r = root();
    r.classList.add('component-item');

    const wrapper = document.createElement('div'); // no data-path
    r.appendChild(wrapper);

    const target = document.createElement('span');
    target.setAttribute('data-path', 'title');
    wrapper.appendChild(target);

    expect(generatePath(target)).toBe('title');
  });

  it('strips a trailing dot (builder layout scenario)', () => {
    const r = root();
    r.classList.add('component-item');
    const target = document.createElement('span');
    target.setAttribute('data-path', 'body.');
    r.appendChild(target);

    expect(generatePath(target)).toBe('body');
  });

  it('strips multiple trailing dots', () => {
    const r = root();
    r.classList.add('component-item');
    const target = document.createElement('span');
    target.setAttribute('data-path', 'items...');
    r.appendChild(target);

    expect(generatePath(target)).toBe('items');
  });

  it('returns empty string when there is no data-path anywhere', () => {
    const r = root();
    r.classList.add('component-item');
    const target = document.createElement('span');
    r.appendChild(target);

    expect(generatePath(target)).toBe('');
  });

  it('stops at the nearest component-item (its data-path is not prepended)', () => {
    // The while loop exits when the parent IS a component-item, so the
    // component-item's own data-path is deliberately excluded from the result.
    const outer = root();
    outer.classList.add('component-item');
    outer.setAttribute('data-path', 'should-be-ignored');

    const inner = document.createElement('div');
    inner.classList.add('component-item');
    outer.appendChild(inner);

    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-path', 'content');
    inner.appendChild(wrapper);

    const target = document.createElement('span');
    target.setAttribute('data-path', 'title');
    wrapper.appendChild(target);

    expect(generatePath(target)).toBe('content.title');
  });

  it('handles deeply nested paths with mixed data-path presence', () => {
    const r = root();
    r.classList.add('component-item');

    const a = document.createElement('div');
    a.setAttribute('data-path', 'a');
    r.appendChild(a);

    const b = document.createElement('div'); // no path
    a.appendChild(b);

    const c = document.createElement('div');
    c.setAttribute('data-path', 'c');
    b.appendChild(c);

    const target = document.createElement('span');
    target.setAttribute('data-path', 'value');
    c.appendChild(target);

    expect(generatePath(target)).toBe('a.c.value');
  });
});
