import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  OnInit,
  computed,
  effect,
  inject,
  signal,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IPage } from '@core/interface/IAppConfig';
import { IDialog } from '@core/interface/IDialog';
import type { IComponentToolbar } from '@core/interface/combs/IBuilder';
import { UtilitiesService } from '@core/service/utilities.service';
import { ContentService } from '@core/service/content.service';
import { NodeService } from '@core/service/node.service';
import { UserService } from '@core/service/user.service';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CURRENT_PAGE, USER } from '@core/token/token-providers';
import { generatePath } from '@core/util/dom-path.util';
import { getComponentSetting } from '@modules/builder/factory/getComponentSetting';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { cloneDeep, get } from 'lodash-es';
import { EMPTY, catchError, filter, finalize, switchMap, take, tap } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { DividerComponent } from '@uiux/widgets/divider/divider.component';

interface LibraryCategory {
  uuid: string;
  label: string;
  elements?: LibraryCategory[];
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-component-toolbar',
  templateUrl: './component-toolbar.component.html',
  styleUrls: ['./component-toolbar.component.scss'],
  imports: [BtnComponent, DividerComponent, MatTooltipModule, TranslateModule],
  host: {
    class: 'component-toolbar',
  },
})
export class ComponentToolbarComponent implements OnInit, AfterViewInit {
  private currentPage = inject(BUILDER_CURRENT_PAGE);

  readonly content = input.required<IComponentToolbar>();
  public index = signal(0);
  public length = signal(0);

  public bcData = signal(false);

  private builder = inject(BuilderState);
  private storage = inject(LocalStorageService);
  private util = inject(UtilitiesService);
  private ele = inject(ElementRef);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);
  private injector = inject(Injector);
  private user = inject(USER);
  private userService = inject(UserService);
  private nodeService = inject(NodeService);
  private contentService = inject(ContentService);
  private translate = inject(TranslateService);
  readonly uploading = signal(false);
  readonly canUpload = computed(() => {
    const user = this.user();
    return !!user && typeof user === 'object' &&
      this.userService.checkShow({ params: { reqRoles: ['administrator'] } }, user);
  });
  // Derived from the input, never captured once: the builder `@for` blocks track by
  // `$index`, so inserting a component reuses the toolbar instance already sitting at
  // that slot and only rebinds `content`. Caching it would keep the toolbar acting on
  // the component that got pushed down.
  public type = computed(() => {
    const content = this.content();
    return content.type || content.content?.type || '';
  });
  private component = computed<any>(() => (this.type() ? this.content() : this.content().content));
  private path = signal('');

  ngOnInit(): void {
    this.storage
      .observe(this.builder.COPYCOMPONENTKEY)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.bcData.set(data);
      });
  }

  ngAfterViewInit(): void {
    this.path.set(generatePath(this.ele.nativeElement));
    effect(
      () => {
        const page = this.currentPage();
        this.path.set(generatePath(this.ele.nativeElement));
        this.getIndex();
      },
      { injector: this.injector }
    );
  }

  getIndex(): void {
    const index = this.builder.targetIndex(this.path());
    this.index.set(index);
    const lastDotIndex = this.path().lastIndexOf('.');
    const body = (this.currentPage() as IPage | undefined)?.body;
    if (lastDotIndex !== -1) {
      // child component
      const before = this.path().slice(0, lastDotIndex);
      const targetArray = get(body, before);
      if (Array.isArray(targetArray)) {
        this.length.set(targetArray.length);
      }
    } else {
      // top parent component
      this.length.set(body?.length ?? 0);
    }
  }

  onUpdown(direction: string): void {
    this.builder.moveComponent(direction, this.path());
    this.hidePicker();
  }

  onCopy(): void {
    if (this.component()) {
      // Copy clears the source page links before capturing an independent clipboard value.
      this.removePageReferences(this.component());
      const snapshot = cloneDeep(this.component());
      this.util.copy(JSON.stringify(snapshot));
      // Clipboard's temporary textarea hides focus-only controls before focus can return.
      this.restoreCanvasFocus();
      this.util.openSnackbar(`已复制${this.component().type}JSON`, 'ok', {
        verticalPosition: 'bottom',
      });
      this.storage.store(this.builder.COPYCOMPONENTKEY, snapshot);
    }
  }

  private removePageReferences(component: Record<string, unknown>): void {
    delete component['extra'];
    delete component['relationships'];
  }

  /** Saves a snapshot of the current canvas component as a reusable library entry. */
  onUpload(): void {
    if (!this.canUpload() || this.uploading() || !this.type()) {
      return;
    }
    // Keep the dynamic-input shape and nested settings without retaining the page's block identity.
    const snapshot = cloneDeep(this.content()) as Record<string, unknown>;
    this.removePageReferences(snapshot);
    const body = JSON.stringify(snapshot);
    const form = new FormGroup({
      title: new FormControl(this.type(), {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/\S/)],
      }),
      icon: new FormControl('widgets-outline', { nonNullable: true }),
      category: new FormControl<string[]>([], {
        nonNullable: true,
        validators: Validators.required,
      }),
    });
    this.uploading.set(true);
    this.nodeService.fetch('/api/v3/node/component').pipe(
      take(1),
      catchError(() => {
        this.uploadNotice('LOAD_CATEGORIES_FAILED');
        this.restoreCanvasFocus();
        return EMPTY;
      }),
      switchMap((groups: LibraryCategory[]) => {
        // The library renders entries inside each top-level group's subcategories.
        const options = groups.flatMap(group => (group.elements || []).map(category => ({
          value: category.uuid,
          label: `${group.label} > ${category.label}`,
        })));
        if (!options.length) {
          this.uploadNotice('NO_CATEGORIES');
          this.restoreCanvasFocus();
          return EMPTY;
        }
        const fields: FormlyFieldConfig[] = [
          {
            key: 'title',
            type: 'input',
            props: {
              label: this.translate.instant('BUILDER.NODE_UIUX.FIELD_TITLE'),
              required: true,
              // Formly rebuilds control validators from the field config, so the
              // whitespace guard must live here to reject space-only titles.
              pattern: /\S/,
              maxLength: 255,
            },
            validation: {
              messages: { pattern: this.translate.instant('BUILDER.NODE_UIUX.TITLE_REQUIRED') },
            },
          },
          {
            key: 'category',
            type: 'select',
            props: {
              label: this.translate.instant('BUILDER.NODE_UIUX.FIELD_CATEGORY'),
              required: true,
              multiple: true,
              options,
            },
          },
          {
            key: 'icon',
            type: 'mat-select',
            props: {
              label: this.translate.instant('BUILDER.NODE_UIUX.FIELD_ICON'),
              type: 'icon',
              search: true,
            },
          },
        ];
        const data: IDialog = {
          title: this.translate.instant('BUILDER.NODE_UIUX.UPLOAD'),
          noLabel: this.translate.instant('BUILDER.COMMON.CANCEL'),
          yesLabel: this.translate.instant('BUILDER.NODE_UIUX.SAVE'),
          inputData: {
            content: {
              content: { type: 'formly' },
              form,
              model: form.getRawValue(),
              fields,
              fullWidth: true,
            },
          },
        };
        return this.dialog.open(DialogComponent, {
          width: '500px', data, restoreFocus: false,
        }).afterClosed().pipe(tap(() => this.restoreCanvasFocus()));
      }),
      take(1),
      filter(confirmed => confirmed === true && this.canUpload() && form.valid),
      switchMap(() => {
        const { title, icon, category } = form.getRawValue();
        return this.nodeService.addEntity('/api/v1/node/component', {
          title: title.trim(), icon, body, status: true,
        }, {
          category: {
            data: category.map(id => ({ type: 'taxonomy_term--component_type', id })),
          },
        });
      }),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.uploading.set(false)),
    ).subscribe({
      next: () => {
        this.contentService.reloadUIUX();
        this.uploadNotice('UPLOADED');
      },
      error: () => this.uploadNotice('CREATE_FAILED'),
    });
  }

  private uploadNotice(key: string): void {
    this.util.openSnackbar(
      this.translate.instant(`BUILDER.NODE_UIUX.${key}`),
      this.translate.instant('BUILDER.COMMON.OK')
    );
  }

  /**
   * Clipboard and upload can hide or replace the focused button. Restore the nearest
   * stable canvas group so nested controls remain reachable as well.
   */
  private restoreCanvasFocus(): void {
    this.ele.nativeElement.closest('app-dynamic-component[tabindex], .component-item')?.focus();
  }

  onPaste(content: any): void {
    this.builder.updatePageContentByPath(this.path(), content, 'add');
    this.hidePicker();
    this.storage.clear(this.builder.COPYCOMPONENTKEY);
  }

  onSetting(): void {
    const fields: FormlyFieldConfig[] = getComponentSetting(this.component(), this.path());
    this.hidePicker();
    this.dialog.getDialogById('code-editor-dialog')?.close();
    this.builder.showComponentSetting(this.component(), fields, this.path());
  }

  onDelete(): void {
    const config: IDialog = {
      title: '删除组件',
      titleClasses: 'text-red-500',
      noLabel: '取消',
      yesLabel: '确认删除',
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: `是否要删除<strong class="text-black-500 text-primary">${this.content().type}</strong>组件？`,
        },
      },
    };

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '340px',
      data: config,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          this.hidePicker();
          this.builder.deleteComponent(this.path());
        }
      });
  }

  hidePicker(): void {
    this.builder.closeRightDrawer$.next(true);
  }

  onEditorCode(): void {
    this.builder.editorCode({
      path: this.path(),
      content: {
        type: this.type(),
        content: this.component(),
      },
    });
  }
}
