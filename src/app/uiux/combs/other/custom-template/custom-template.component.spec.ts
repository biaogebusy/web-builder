import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { CORE_CONFIG } from '@core/token/token-providers';
import { ManageService } from '@core/service/manage.service';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { TranslateService } from '@ngx-translate/core';
import { NEVER } from 'rxjs';
import { vi } from 'vitest';

import { CustomTemplateComponent } from './custom-template.component';

describe('CustomTemplateComponent', () => {
  let component: CustomTemplateComponent;
  let fixture: ComponentFixture<CustomTemplateComponent>;
  const nodeService = {
    pageUrl: '/en/example',
    getLang: vi.fn(),
    fetch: vi.fn(() => NEVER),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomTemplateComponent],
      providers: [
        { provide: NodeService, useValue: nodeService },
        { provide: ScreenService, useValue: { isPlatformBrowser: () => false } },
        { provide: UtilitiesService, useValue: {} },
        { provide: CORE_CONFIG, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: BuilderState, useValue: {} },
        { provide: ManageService, useValue: {} },
        { provide: TranslateService, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    fixture = TestBed.createComponent(CustomTemplateComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('content', {
      html: '<div></div>',
      isAPI: true,
      api: '/api/v2/xxx',
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the current non-default language to API requests', () => {
    nodeService.getLang.mockReturnValue({
      label: 'EN',
      langCode: 'en',
      prefix: '/en',
    });

    component.fetchContent('');

    expect(nodeService.getLang).toHaveBeenCalledWith('/en/example');
    expect(nodeService.fetch).toHaveBeenCalledWith('/api/v2/xxx', '', 'en');
  });

  it('should keep API requests unprefixed for the default language', () => {
    nodeService.getLang.mockReturnValue({
      label: '中文',
      langCode: 'zh-hans',
      prefix: '/',
      default: true,
    });

    component.fetchContent('');

    expect(nodeService.fetch).toHaveBeenCalledWith('/api/v2/xxx', '', undefined);
  });
});
