import { TestBed } from '@angular/core/testing';
import { BaseComponent } from '@uiux/base/base.widget';
import { ApiService } from '@core/service/api.service';

class TestComponent extends BaseComponent {}

describe('BaseComponent', () => {
  const setup = () => {
    const apiServiceMock = {
      getApiParams: vi.fn(() => 'api-params-result'),
      handlePager: vi.fn(() => ({ current: 1 })),
    };
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: apiServiceMock }],
    });
    // Field-level inject() in BaseComponent requires an injection context.
    const component = TestBed.runInInjectionContext(() => new TestComponent());
    return { component, apiServiceMock };
  };

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  describe('getParams', () => {
    it('returns the value for the key inside params', () => {
      const { component } = setup();
      expect(
        component.getParams({ params: { rows: 12 } }, 'rows')
      ).toBe(12);
    });

    it('returns undefined when params or the key is missing', () => {
      const { component } = setup();
      expect(component.getParams({}, 'rows')).toBeUndefined();
      expect(component.getParams(null, 'rows')).toBeUndefined();
      expect(component.getParams({ params: {} }, 'rows')).toBeUndefined();
    });
  });

  describe('getValue', () => {
    it('returns the nested value at path/key', () => {
      const { component } = setup();
      expect(component.getValue({ row: { size: 4 } }, 'row', 'size')).toBe(4);
    });

    it('returns undefined when the path is missing', () => {
      const { component } = setup();
      expect(component.getValue({}, 'row', 'size')).toBeUndefined();
    });
  });

  describe('getDeepValue', () => {
    it('resolves a deep property path via lodash result', () => {
      const { component } = setup();
      expect(
        component.getDeepValue({ a: { b: { c: 'deep' } } }, 'a.b.c')
      ).toBe('deep');
    });

    it('invokes and returns the result when the path is a method', () => {
      const { component } = setup();
      expect(
        component.getDeepValue({ a: { label: () => 'computed' } }, 'a.label')
      ).toBe('computed');
    });

    it('returns undefined for missing paths', () => {
      const { component } = setup();
      expect(component.getDeepValue({}, 'a.b.c')).toBeUndefined();
    });
  });

  describe('row', () => {
    it('returns the default flex-basis for 3 columns', () => {
      const { component } = setup();
      expect(component.row()).toBe('0 0 calc(100% / 3 - 4rem)');
    });

    it('uses the given column count and padding', () => {
      const { component } = setup();
      expect(component.row(4, '1rem')).toBe('0 0 calc(100% / 4 - 1rem)');
    });
  });

  describe('initFormValueWithUrlQuery', () => {
    it('seeds control values from matching query keys', () => {
      const { component } = setup();
      const controls = [
        { key: 'keyword', value: '' },
        { key: 'type', value: 'all' },
      ];

      const result = component.initFormValueWithUrlQuery(
        { keyword: 'drupal' },
        controls
      );

      expect(result[0].value).toBe('drupal');
      // Untouched control keeps its default value.
      expect(result[1].value).toBe('all');
    });

    it('returns controls unchanged when no query key matches', () => {
      const { component } = setup();
      const controls = [{ key: 'keyword', value: 'x' }];

      const result = component.initFormValueWithUrlQuery({ other: 1 }, controls);

      expect(result).toEqual(controls);
    });
  });

  describe('getApiParams / handlePager delegation', () => {
    it('delegates getApiParams to ApiService', () => {
      const { component, apiServiceMock } = setup();
      const state = { page: 1 };
      expect(component.getApiParams(state)).toBe('api-params-result');
      expect(apiServiceMock.getApiParams).toHaveBeenCalledWith(state);
    });

    it('delegates handlePager to ApiService', () => {
      const { component, apiServiceMock } = setup();
      expect(component.handlePager({ current: 0 }, 20)).toEqual({ current: 1 });
      expect(apiServiceMock.handlePager).toHaveBeenCalledWith({ current: 0 }, 20);
    });
  });

  describe('getFormParams', () => {
    it('keeps non-empty scalar values', () => {
      const { component } = setup();
      expect(component.getFormParams({ keyword: 'drupal', page: 2 })).toEqual({
        keyword: 'drupal',
        page: 2,
      });
    });

    it('drops empty-string values', () => {
      const { component } = setup();
      expect(component.getFormParams({ keyword: '', page: 1 })).toEqual({
        page: 1,
      });
    });

    it('joins non-empty arrays with "+"', () => {
      const { component } = setup();
      expect(component.getFormParams({ tags: ['a', 'b'] })).toEqual({
        tags: 'a+b',
      });
    });

    it('drops empty arrays', () => {
      const { component } = setup();
      expect(component.getFormParams({ tags: [], page: 1 })).toEqual({
        page: 1,
      });
    });

    it('returns an empty object for falsy state', () => {
      const { component } = setup();
      expect(component.getFormParams(null)).toEqual({});
      expect(component.getFormParams(undefined)).toEqual({});
    });
  });

  describe('getParamsState', () => {
    it('merges form values with options, options winning', () => {
      const { component } = setup();
      const merged = component.getParamsState(
        { keyword: 'x', page: 1 },
        { page: 3 }
      );
      expect(merged).toEqual({ keyword: 'x', page: 3 });
    });

    it('does not mutate the original form values', () => {
      const { component } = setup();
      const formValues = { page: 1 };
      component.getParamsState(formValues, { page: 9 });
      expect(formValues.page).toBe(1);
    });
  });

  describe('getUrlQuery', () => {
    it('combines form values and options into cleaned query params', () => {
      const { component } = setup();
      expect(
        component.getUrlQuery(
          { keyword: 'drupal', tags: ['a', 'b'], empty: '' },
          { page: 2 }
        )
      ).toEqual({ keyword: 'drupal', tags: 'a+b', page: 2 });
    });

    it('works with no options', () => {
      const { component } = setup();
      expect(component.getUrlQuery({ keyword: 'x' })).toEqual({ keyword: 'x' });
    });
  });

  describe('getScroller', () => {
    it('returns the builder-list element when present', () => {
      const { component } = setup();
      const el = document.createElement('div');
      el.id = 'builder-list';
      document.body.appendChild(el);

      try {
        expect(component.getScroller()).toBe(el);
      } finally {
        el.remove();
      }
    });

    it('falls back to window when builder-list is absent', () => {
      const { component } = setup();
      expect(component.getScroller()).toBe(window);
    });
  });
});
