import {
  getBuilderArrayByPath,
  getBuilderTargetIndex,
  insertBuilderTreeValueAfter,
  removeBuilderTreeValue,
  setBuilderTreeValue,
} from './builder-tree.util';

describe('builder tree utilities', () => {
  it('resolves root and nested paths', () => {
    const body = [{ elements: [{ type: 'text' }] }, { type: 'hero' }];

    expect(getBuilderTargetIndex('2.elements.1')).toBe(1);
    expect(getBuilderTargetIndex('3')).toBe(3);
    expect(getBuilderArrayByPath('0.elements.0', body)).toBe(body[0].elements);
    expect(getBuilderArrayByPath('1', body)).toBe(body);
  });

  it('sets a nested value while preserving the original root references', () => {
    const body = [{ elements: [{ type: 'text' }] }];

    const next = setBuilderTreeValue(body, '0.elements.0', { type: 'img' });

    expect(next).not.toBe(body);
    expect(next[0]).not.toBe(body[0]);
    expect(next[0].elements?.[0]).toEqual({ type: 'img' });
    expect(body[0].elements?.[0]).toEqual({ type: 'text' });
  });

  it('inserts nested values after the target and clones root values', () => {
    const nested = [{ elements: [{ type: 'text' }] }];
    const nestedNext = insertBuilderTreeValueAfter(nested, '0.elements.0', {
      type: 'img',
    });
    expect(nestedNext[0].elements?.map(item => item.type)).toEqual(['text', 'img']);

    const root = [{ type: 'text' }];
    const value = { type: 'card', nested: { value: 1 } };
    const rootNext = insertBuilderTreeValueAfter(root, '0', value);
    expect(rootNext[1]).toEqual(value);
    expect(rootNext[1]).not.toBe(value);
  });

  it('removes nested values and leaves an invalid target unchanged', () => {
    const body = [{ elements: [{ type: 'text' }, { type: 'img' }] }];

    const next = removeBuilderTreeValue(body, '0.elements.0');
    expect(next[0].elements?.map(item => item.type)).toEqual(['img']);

    expect(removeBuilderTreeValue(body, '0.missing.0')).toBe(body);
  });
});
