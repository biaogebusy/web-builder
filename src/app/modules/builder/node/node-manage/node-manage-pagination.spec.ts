import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import type { JsonApiListResponse, JsonApiResource } from '@core/interface/node/IDrupal';
import { NodeFieldFormService } from '@core/service/node-field-form.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { TranslateService } from '@ngx-translate/core';
import { of, Subject, throwError } from 'rxjs';

import { NodeManageComponent } from './node-manage.component';

describe('NodeManageComponent merged pagination', () => {
  let component: NodeManageComponent;
  let data: Record<string, JsonApiResource[]>;
  const fetch = vi.fn<NodeService['fetch']>();
  const snackbar = vi.fn();
  const types = [{ label: 'News', value: 'news' }, { label: 'Events', value: 'event' }];

  const nodes = (type: string, lang: string, count: number, latest: number): JsonApiResource[] =>
    Array.from({ length: count }, (_, i) => ({
      id: `${type}-${lang}-${i}`,
      type: `node--${type}`,
      attributes: {
        title: `${type}-${lang}-${i}`,
        status: true,
        langcode: lang,
        changed: `2026-11-05T00:00:${String(latest - i).padStart(2, '0')}+00:00`,
        path: { alias: `/${type}-${lang}-${i}` },
      },
    }));
  const query = (params: Parameters<NodeService['fetch']>[1]) => new URLSearchParams(String(params));
  const offsets = () => fetch.mock.calls.slice(-4).map(([, params]) =>
    Number(query(params).get('page[offset]'))
  );
  const ids = () => component.rows().map(row => row.uuid);
  const readSource: NodeService['fetch'] = (api, params, lang) => {
    const source = data[`${api.split('/').at(-1)}:${lang ?? 'zh-hans'}`] ?? [];
    const offset = Number(query(params).get('page[offset]'));
    return of({
      data: source.slice(offset, offset + 20),
      links: offset + 20 < source.length ? { next: { href: '?next-page' } } : {},
    });
  };
  const complete = (request: Subject<JsonApiListResponse>, response: JsonApiListResponse) => {
    request.next(response);
    request.complete();
  };

  beforeEach(() => {
    fetch.mockReset().mockImplementation(readSource);
    snackbar.mockClear();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    data = {
      'news:zh-hans': nodes('news', 'zh-hans', 10, 59),
      'news:en': nodes('news', 'en', 8, 49),
      'event:zh-hans': nodes('event', 'zh-hans', 3, 41),
      'event:en': nodes('event', 'en', 5, 38),
    };
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NodeService,
          useValue: { fetch, getNodePath: NodeService.prototype.getNodePath },
        },
        { provide: NodeFieldFormService, useValue: { getNodeTypes: () => of(types) } },
        { provide: UtilitiesService, useValue: { openSnackbar: snackbar } },
        { provide: Router, useValue: { navigate: vi.fn() } },
        { provide: TranslateService, useValue: { instant: (key: string) => key } },
      ],
    });
    component = TestBed.runInInjectionContext(() => new NodeManageComponent());
    component.nodeTypes.set(types);
    component.langs = [
      { langCode: 'zh-hans', label: 'Chinese', default: true },
      { langCode: 'en', label: 'English' },
    ];
  });

  afterEach(() => vi.restoreAllMocks());

  it('advances only consumed sources and restores their offsets when paging back', () => {
    component.confirmUuid.set('old-confirmation');
    component.fetchList();
    expect(fetch.mock.calls.map(([api, , lang]) => [api, lang])).toEqual([
      ['/api/v1/node/news', undefined], ['/api/v1/node/news', 'en'],
      ['/api/v1/node/event', undefined], ['/api/v1/node/event', 'en'],
    ]);
    const firstPage = [
      ...data['news:zh-hans'], ...data['news:en'], ...data['event:zh-hans'].slice(0, 2),
    ].map(node => node.id);
    expect(ids()).toEqual(firstPage);
    expect(component.rows()[0]).toMatchObject({
      title: 'news-zh-hans-0', type: 'news', path: '/news-zh-hans-0',
      status: true, langcode: 'zh-hans',
    });
    expect(component.hasNext()).toBe(true);
    expect(component.confirmUuid()).toBe('');

    component.nextPage();
    expect(offsets()).toEqual([10, 8, 2, 0]);
    const secondPage = [data['event:zh-hans'][2], ...data['event:en']].map(node => node.id);
    expect(ids()).toEqual(secondPage);
    expect(component.page()).toBe(1);
    expect(component.hasNext()).toBe(false);
    expect(component.loading()).toBe(false);
    component.nextPage();
    expect(fetch).toHaveBeenCalledTimes(8);

    component.prevPage();
    expect(offsets()).toEqual([0, 0, 0, 0]);
    expect(ids()).toEqual(firstPage);
    component.prevPage();
    expect(fetch).toHaveBeenCalledTimes(12);
    component.nextPage();
    expect(offsets()).toEqual([10, 8, 2, 0]);
    expect(ids()).toEqual(secondPage);
  });

  it('starts a new filter at zero and keeps its language, publication and search parameters', () => {
    component.fetchList();
    component.nextPage();
    component.type.set('news');
    component.langcode.set('en');
    component.status.set('0');
    component.searchCtrl.setValue(' Some & title ', { emitEvent: false });
    component.onFilterChange();

    const [api, params, lang] = fetch.mock.lastCall!;
    expect(api).toBe('/api/v1/node/news');
    expect(lang).toBe('en');
    expect(Object.fromEntries(query(params))).toEqual({
      'sort': '-changed', 'page[limit]': '20', 'page[offset]': '0', 'noCache': '1',
      'filter[search][condition][path]': 'title',
      'filter[search][condition][operator]': 'CONTAINS',
      'filter[search][condition][value]': 'Some & title',
      'filter[status]': '0', 'filter[langcode]': 'en',
    });
    expect(component.page()).toBe(0);
    expect(ids()).toEqual(data['news:en'].map(node => node.id));
    component.prevPage();
    expect(fetch).toHaveBeenCalledTimes(9);
  });

  it('keeps source and row order for equal timestamps despite reversed completion order', () => {
    const requests = Array.from({ length: 4 }, () => new Subject<JsonApiListResponse>());
    requests.forEach(request => fetch.mockReturnValueOnce(request));
    component.fetchList();
    [3, 2, 1, 0].forEach(index => {
      expect(component.loading()).toBe(true);
      const rows = nodes(index < 2 ? 'news' : 'event', index % 2 ? 'en' : 'zh-hans', 2, 30);
      complete(requests[index], { data: rows.map(node => ({
        ...node, attributes: { ...node.attributes, changed: '2026-11-05T00:00:30+00:00' },
      })) });
    });
    expect(ids()).toEqual([
      'news-zh-hans-0', 'news-zh-hans-1', 'news-en-0', 'news-en-1',
      'event-zh-hans-0', 'event-zh-hans-1', 'event-en-0', 'event-en-1',
    ]);
    expect(component.loading()).toBe(false);
  });

  it('retains a failed source offset while other sources advance and retries it on the next page', () => {
    data = {
      'news:zh-hans': nodes('news', 'zh-hans', 24, 59),
      'news:en': nodes('news', 'en', 26, 29),
    };
    component.fetchList();
    fetch.mockImplementationOnce(() => throwError(() => new Error('source unavailable')));
    component.nextPage();
    expect(offsets()).toEqual([20, 0, 0, 0]);
    expect(ids()).toEqual(data['news:en'].slice(0, 20).map(node => node.id));
    expect(component.hasNext()).toBe(true);
    expect(component.loading()).toBe(false);
    expect(snackbar).not.toHaveBeenCalled();

    component.nextPage();
    expect(offsets()).toEqual([20, 20, 0, 0]);
    expect(ids()).toEqual([
      ...data['news:zh-hans'].slice(20), ...data['news:en'].slice(20),
    ].map(node => node.id));
    expect(component.hasNext()).toBe(false);
  });

  it('clears a failed list and permits a successful retry when every source fails', () => {
    component.fetchList();
    fetch.mockImplementation(() => throwError(() => new Error('offline')));
    component.fetchList();
    expect(component.rows()).toEqual([]);
    expect(component.hasNext()).toBe(false);
    expect(component.loading()).toBe(false);
    expect(snackbar).toHaveBeenCalledExactlyOnceWith('BUILDER.NODE_MANAGE.LOAD_FAILED', 'ok');

    fetch.mockImplementation(readSource);
    component.fetchList();
    expect(component.rows()).toHaveLength(20);
    expect(component.hasNext()).toBe(true);
    expect(component.loading()).toBe(false);
  });

  it.each([
    { count: 0, next: false }, { count: 0, next: true },
    { count: 1, next: true }, { count: 20, next: false },
  ])('uses the source next link for a page with $count rows (next=$next)', ({ count, next }) => {
    component.type.set('news');
    component.langcode.set('zh-hans');
    fetch.mockReturnValue(of({
      data: nodes('news', 'zh-hans', count, 59),
      links: next ? { next: { href: '?next-page' } } : {},
    }));
    component.fetchList();
    expect(component.rows()).toHaveLength(count);
    expect(component.hasNext()).toBe(next);
    expect(component.loading()).toBe(false);
    expect(snackbar).not.toHaveBeenCalled();
  });

  it.each([
    { outcome: 'success', order: 'before' }, { outcome: 'success', order: 'after' },
    { outcome: 'failure', order: 'before' }, { outcome: 'failure', order: 'after' },
  ])('ignores an older $outcome $order the current request completes', ({ outcome, order }) => {
    component.type.set('news');
    component.langcode.set('zh-hans');
    const old = new Subject<JsonApiListResponse>();
    const current = new Subject<JsonApiListResponse>();
    fetch.mockReturnValueOnce(old).mockReturnValueOnce(current);
    component.fetchList();
    component.onFilterChange();
    const finishOld = () => outcome === 'failure'
      ? old.error(new Error('old failure'))
      : complete(old, { data: nodes('old', 'zh-hans', 3, 59) });
    if (order === 'before') {
      finishOld();
      expect(component.loading()).toBe(true);
      expect(component.rows()).toEqual([]);
    }
    const currentRows = nodes('current', 'zh-hans', 20, 59);
    complete(current, { data: currentRows, links: { next: { href: '?next-page' } } });
    if (order === 'after') finishOld();
    expect(ids()).toEqual(currentRows.map(node => node.id));
    expect(component.hasNext()).toBe(true);
    expect(component.loading()).toBe(false);
    expect(snackbar).not.toHaveBeenCalled();
    component.nextPage();
    expect(query(fetch.mock.lastCall![1]).get('page[offset]')).toBe('20');
  });
});
