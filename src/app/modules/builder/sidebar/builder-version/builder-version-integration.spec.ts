import { DOCUMENT } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { BuilderService } from '@core/service/builder.service';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import {
  provideNgxWebstorage,
  withLocalStorage,
  withNgxWebstorageConfig,
} from 'ngx-webstorage';

import { BuilderVersionComponent } from './builder-version.component';

// 回归:从 page-list 载入页面(loadNewPage)后,历史记录面板必须立即刷新
describe('BuilderVersionComponent with real BuilderState', () => {
  let fixture: ComponentFixture<BuilderVersionComponent>;
  let state: BuilderState;

  beforeEach(async () => {
    localStorage.clear();
    localStorage.setItem(
      'ngx-webstorage:version',
      JSON.stringify([{ title: '草稿A', body: [], current: true }])
    );

    await TestBed.configureTestingModule({
      imports: [BuilderVersionComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        provideNgxWebstorage(
          withNgxWebstorageConfig({ separator: ':', caseSensitive: true }),
          withLocalStorage()
        ),
        BuilderState,
        { provide: DOCUMENT, useValue: document },
        { provide: MatDialog, useValue: { open: vi.fn(), getDialogById: vi.fn() } },
        {
          provide: ScreenService,
          useValue: { scrollToAnchor: vi.fn(), isPlatformBrowser: () => true },
        },
        { provide: UtilitiesService, useValue: { openSnackbar: vi.fn() } },
        { provide: BuilderService, useValue: { checkIsLatestPage: vi.fn() } },
      ],
    }).compileComponents();

    state = TestBed.inject(BuilderState);
    fixture = TestBed.createComponent(BuilderVersionComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('shows the freshly loaded page in the history list right away', () => {
    expect(fixture.nativeElement.textContent).toContain('草稿A');

    // 模拟 page-list 加载服务端页面: builderService.loadPage 成功后的核心副作用
    state.loadNewPage({ title: '服务端页面', body: [], nid: '42', uuid: 'u-42' });
    fixture.detectChanges();

    expect(fixture.componentInstance.version().length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('服务端页面');
    expect(fixture.nativeElement.textContent).toContain('草稿A');
  });
});
