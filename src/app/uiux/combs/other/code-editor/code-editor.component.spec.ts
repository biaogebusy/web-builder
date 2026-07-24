import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of, Subject } from 'rxjs';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import { BuilderState } from '@core/state/BuilderState';
import { ContentService } from '@core/service/content.service';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { TagsService } from '@core/service/tags.service';
import { UserService } from '@core/service/user.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { TranslateService } from '@ngx-translate/core';
import { vi } from 'vitest';

import { CodeEditorComponent } from './code-editor.component';

describe('CodeEditorComponent', () => {
  let component: CodeEditorComponent;
  let fixture: ComponentFixture<CodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeEditorComponent],
      providers: [
        { provide: CORE_CONFIG, useValue: {} },
        { provide: USER, useValue: signal(false) },
        {
          provide: BuilderState,
          useValue: {
            revealCode$: new Subject<string>(),
            fullScreen$: new Subject<boolean>(),
          },
        },
        { provide: ContentService, useValue: { loadBuilderConfig: () => of({}) } },
        { provide: NodeService, useValue: { fetch: () => of({}) } },
        { provide: ScreenService, useValue: { isPlatformBrowser: () => true } },
        { provide: TagsService, useValue: { highlightCode: vi.fn() } },
        { provide: UserService, useValue: { checkShow: () => false } },
        { provide: UtilitiesService, useValue: { openSnackbar: vi.fn() } },
        { provide: TranslateService, useValue: { instant: (key: string) => key } },
        { provide: MatDialog, useValue: { getDialogById: () => undefined } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeEditorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('provides builder config outside a Builder route injector', () => {
    expect(component.builderConfig$).toBeTruthy();
  });
});
