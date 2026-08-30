import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { NodeService } from '@core/service/node.service';
import { NodeFieldFormService } from '@core/service/node-field-form.service';
import { NodeManageComponent } from './node-manage.component';

describe('NodeManageComponent', () => {
  let component: NodeManageComponent;
  let fixture: ComponentFixture<NodeManageComponent>;

  const setup = async () => {
    await TestBed.configureTestingModule({
      imports: [NodeManageComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();
    fixture = TestBed.createComponent(NodeManageComponent);
    component = fixture.componentInstance;
    vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
  };

  it('编辑入口携带行的语言参数,默认语言不带参数', async () => {
    await setup();
    const row = {
      type: 'news',
      uuid: 'u1',
      title: 't',
      status: true,
      langcode: 'en',
      changed: '',
      path: '',
    };

    component.onEdit(row);
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith(
      ['/builder/node/edit', 'news', 'u1'],
      { queryParams: { lang: 'en' } }
    );

    // The default language needs no param: the prefix-less edit URL serves it
    component.onEdit({ ...row, langcode: 'zh-hans' });
    expect(TestBed.inject(Router).navigate).toHaveBeenLastCalledWith(
      ['/builder/node/edit', 'news', 'u1'],
      { queryParams: {} }
    );
  });

  it('列表按类型×语言合并请求,每个翻译一行', async () => {
    const fetch = vi.fn((api: string, params?: any, langCode?: string) => {
      if (api !== '/api/v1/node/news') {
        return of({ data: [] });
      }
      // The default-language bucket renders the zh-hans row; the en bucket
      // (language-prefixed) renders the en translation of the same node
      return of({
        data: [
          {
            id: 'u1',
            attributes: {
              title: langCode === 'en' ? 'News en' : '新闻',
              langcode: langCode === 'en' ? 'en' : 'zh-hans',
              changed:
                langCode === 'en'
                  ? '2026-01-02T00:00:00+00:00'
                  : '2026-01-01T00:00:00+00:00',
              path: { alias: '/news' },
            },
          },
        ],
        links: {},
      });
    });
    await TestBed.configureTestingModule({
      imports: [NodeManageComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        {
          provide: NodeService,
          useValue: { fetch, getNodePath: (attr: any) => attr?.path?.alias ?? '' },
        },
        {
          provide: NodeFieldFormService,
          useValue: { getNodeTypes: () => of([{ label: '新闻', value: 'news' }]) },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(NodeManageComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    const zhCall = fetch.mock.calls.find((call: any[]) => call[2] === undefined);
    const enCall = fetch.mock.calls.find((call: any[]) => call[2] === 'en');
    // Both buckets filter on their langcode so fallback rows never show up
    expect(zhCall?.[1]).toContain('filter[langcode]=zh-hans');
    expect(enCall?.[1]).toContain('filter[langcode]=en');
    // One row per translation: the node's zh-hans and en versions both listed
    expect(component.rows().map(row => row.langcode)).toEqual(['en', 'zh-hans']);
    expect(component.rows()[0].title).toBe('News en');
  });
});
