import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@core/service/api.service';
import { FormService } from '@core/service/form.service';
import { NodeService } from '@core/service/node.service';
import { RouteService } from '@core/service/route.service';
import { ScreenService } from '@core/service/screen.service';
import { NEVER, of } from 'rxjs';
import { vi } from 'vitest';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  const nodeService = {
    pageUrl: '/en/search',
    getLang: vi.fn(),
    fetch: vi.fn(() => NEVER),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [
        { provide: NodeService, useValue: nodeService },
        {
          provide: ApiService,
          useValue: {
            getApiParams: () => 'page=0',
          },
        },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } },
        { provide: RouteService, useValue: {} },
        { provide: FormService, useValue: {} },
        { provide: ScreenService, useValue: { isPlatformBrowser: () => false } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('content', {
      type: 'search',
      header: {},
      api: '/api/v2/search',
      label: {},
      sidebar: [],
      template: '',
      wrapperClasses: '',
      colClasses: '',
      showSidebar: false,
    });
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the current non-default language to search requests', () => {
    nodeService.getLang.mockReturnValue({
      label: 'EN',
      langCode: 'en',
      prefix: '/en',
    });

    component.nodeSearch({ page: 0 });

    expect(nodeService.getLang).toHaveBeenCalledWith('/en/search');
    expect(nodeService.fetch).toHaveBeenCalledWith('/api/v2/search', 'page=0', 'en');
  });

  it('should keep search requests unprefixed for the default language', () => {
    nodeService.getLang.mockReturnValue({
      label: '中文',
      langCode: 'zh-hans',
      prefix: '/',
      default: true,
    });

    component.nodeSearch({ page: 0 });

    expect(nodeService.fetch).toHaveBeenCalledWith('/api/v2/search', 'page=0', undefined);
  });
});
