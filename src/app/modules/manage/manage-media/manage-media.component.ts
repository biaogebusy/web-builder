import {
  Component,
  computed,
  ElementRef,
  OnInit,
  effect,
  inject,
  DestroyRef,
  signal,
  Injector,
  ChangeDetectionStrategy,
  input,
  viewChild,
  untracked,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScreenService } from '@core/service/screen.service';
import { Observable, Subscription, from, of } from 'rxjs';
import { isEqual } from 'lodash-es';
import { BUILDER_CONFIG, USER } from '@core/token/token-providers';
import type { IManageAssets, IManageImg, IManageMedia, MediaCapabilities } from '@core/interface/manage/IManage';
import { MediaLibraryService } from '@core/service/media-library.service';
import {
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  scan,
  tap,
} from 'rxjs/operators';
import { BuilderState } from '@core/state/BuilderState';
import { ManageService } from '@core/service/manage.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { UtilitiesService } from '@core/service/utilities.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import type { IBuilderManageMedia } from '@core/interface/IBuilder';
import { IDialog } from '@core/interface/IDialog';
import { FormlyComponent } from '@uiux/combs/form/formly/formly.component';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { LoadingComponent } from '@uiux/widgets/loading/loading.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { canSelectMedia } from '@core/util/media-selection.util';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.scss'],
  imports: [
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTooltipModule,
    FormlyComponent,
    BtnComponent,
    IconComponent,
    LoadingComponent,
    TranslateModule,
  ],
})
export class ManageMediaComponent implements OnInit {
  private builderConfig = toSignal(inject(BUILDER_CONFIG), { initialValue: undefined });
  private library = inject(MediaLibraryService);
  private user = inject(USER);
  private activeAccount = this.user();
  readonly capabilities = signal<MediaCapabilities>({ types: [], canViewAll: false });
  readonly canUpload = computed(() => this.capabilities().types.some(type => type.canUpload));
  readonly kinds = ['image', 'vector', 'document', 'audio', 'video'];
  readonly pageIndex = signal(0);
  private cursors: (string | null)[] = [null];
  private request?: Subscription;
  private capabilityRequest?: Subscription;

  readonly content = input.required<IManageMedia>();
  public form = new UntypedFormGroup({
    page: new FormControl(0),
    kind: new FormControl(''),
    scope: new FormControl(''),
  });
  public fields = signal<FormlyFieldConfig[]>([]);
  public manageMediaConfig = signal<Partial<IBuilderManageMedia>>({ row: 2 });
  public model: any = {};
  public loading = signal<boolean>(false);
  /** Keep loaded pages visible while the next page is being fetched. */
  readonly visibleAssets = signal<IManageAssets | undefined>(undefined);
  /** Retain numbered pagination as an explicit site configuration. */
  readonly infiniteScroll = computed(() => this.manageMediaConfig().pagination !== 'paged');
  /** Failed requests wait for an explicit retry rather than a scrolling loop. */
  readonly loadError = signal(false);
  readonly hasMore = computed(() => !!this.visibleAssets()?.nextCursor);
  private searchFilters: Record<string, unknown> = {};
  private requestedPage = 0;
  private readonly scrollViewport = viewChild<ElementRef<HTMLElement>>('scrollViewport');
  private readonly loadMoreTrigger = viewChild<ElementRef<HTMLElement>>('loadMoreTrigger');
  private selectedId = signal<string | undefined>(undefined);
  /** The single source of truth for management checkboxes and batch actions. */
  readonly selectedIds = signal<readonly string[]>([]);
  public progress = 0;
  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private screenService = inject(ScreenService);
  private manageService = inject(ManageService);
  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);
  private translate = inject(TranslateService);

  readonly uploadDrawer = viewChild<MatDrawer>('uploadDrawer');

  defaultField: FormlyFieldConfig[] = [
    {
      type: 'input',
      key: 'name',
      className: 'media-search-field',
      props: {
        type: 'search',
        label: this.translate.instant('MANAGE.MEDIA.SEARCH_LABEL'),
        placeholder: this.translate.instant('MANAGE.MEDIA.SEARCH_PLACEHOLDER'),
      },
      modelOptions: {
        updateOn: 'blur',
      },
    },
  ];

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      effect(
        () => {
          const config = this.builderConfig();
          if (config) {
            this.manageMediaConfig.set(config.manageMedia);
            this.fields.set([
              ...this.defaultField,
              ...config.manageMedia.sidebar.form.map(field => ({
                ...field,
                props: {
                  ...field.props,
                  placeholder: field.props?.placeholder || field.props?.label,
                },
              })),
            ]);
          }
        },
        { injector: this.injector }
      );
      effect(onCleanup => {
        const account = this.user();
        untracked(() => {
          this.activeAccount = account;
          this.request?.unsubscribe();
          this.capabilityRequest?.unsubscribe();
          this.visibleAssets.set(undefined);
          this.capabilities.set({ types: [], canViewAll: false });
          this.selectedIds.set([]);
          this.loading.set(false);
          if (account && typeof account !== 'boolean') {
            this.capabilityRequest = this.library.capabilities().subscribe({
              next: value => this.capabilities.set(value),
              error: () => this.loadError.set(true),
            });
            this.onSearch(this.form.value);
          }
        });
        onCleanup(() => {
          this.request?.unsubscribe();
          this.capabilityRequest?.unsubscribe();
        });
      }, { injector: this.injector });
      this.form.valueChanges
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          debounceTime(1000),
          distinctUntilChanged(isEqual)
        )
        .subscribe(value => {
          if (!isEqual(this.comparableFilters(value), this.comparableFilters(this.searchFilters))) {
            this.onSearch(value);
          }
        });

      effect(onCleanup => {
        const viewport = this.scrollViewport()?.nativeElement;
        const trigger = this.loadMoreTrigger()?.nativeElement;
        if (!viewport || !trigger || !this.infiniteScroll() || !this.hasMore() ||
          this.loading() || this.loadError() || typeof IntersectionObserver === 'undefined') {
          return;
        }
        const observer = new IntersectionObserver(entries => {
          if (entries.some(entry => entry.isIntersecting)) {
            this.loadMore();
          }
        }, { root: viewport, rootMargin: '160px 0px' });
        observer.observe(trigger);
        onCleanup(() => observer.disconnect());
      }, { injector: this.injector });
    }
  }

  /** Navigate within the media panel when numbered pagination is enabled. */
  onPageChange(page: number): void {
    this.selectedIds.set([]);
    this.resetScroll();
    this.requestPage(page);
  }

  private comparableFilters(value: Record<string, unknown>): Record<string, unknown> {
    // Formly adds empty controls after the first load. They must not reset an active selection.
    return Object.fromEntries(Object.entries<unknown>({ ...value, page: 0 })
      .filter(([, entry]) => entry !== undefined && entry !== null && entry !== ''));
  }

  /** Restart the media collection after a filter change or a media mutation. */
  onSearch(value: Record<string, unknown> = {}): void {
    this.searchFilters = { ...value, page: 0 };
    this.visibleAssets.set(undefined);
    this.cursors = [null];
    this.pageIndex.set(0);
    this.selectedIds.set([]);
    this.resetScroll();
    this.requestPage(0);
  }

  /** Commit blur-based form controls before immediately submitting the search. */
  onEnter(event: Event): void {
    event.preventDefault();
    (event.target as HTMLElement)?.blur();
    this.onSearch(this.form.value);
  }

  /** Fetch at most one additional page without replacing the visible collection. */
  loadMore(): void {
    const assets = this.visibleAssets();
    if (
      !assets || !this.infiniteScroll() || !this.hasMore() || this.loading() || this.loadError()
    ) {
      return;
    }
    this.requestPage(this.pageIndex() + 1);
  }

  /** Retry the failed page with the same submitted filters. */
  retryLoad(): void {
    if (!this.loading()) {
      this.requestPage(this.requestedPage);
    }
  }

  private requestPage(page: number): void {
    this.request?.unsubscribe();
    this.requestedPage = page;
    this.loadError.set(false);
    this.loading.set(true);
    const purpose = this.content().mode === 'manage' ? '' : this.content().purpose || 'web-image';
    this.request = this.library.list({
      ...this.searchFilters, purpose, cursor: this.cursors[page],
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: assets => {
        const previous = this.visibleAssets();
        let rows = assets.rows;
        if (this.infiniteScroll() && page > 0 && previous) {
          const merged = new Map(previous.rows.map(item => [item.uuid, item]));
          for (const item of rows) merged.set(item.uuid, item);
          rows = [...merged.values()];
        }
        this.pageIndex.set(page);
        this.cursors[page + 1] = assets.nextCursor;
        this.visibleAssets.set({ ...assets, rows });
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.loadError.set(true);
      },
    });
  }

  private resetScroll(): void {
    const viewport = this.scrollViewport()?.nativeElement;
    if (viewport) {
      viewport.scrollTop = 0;
    }
  }

  onDelete(uuid: string): void {
    if (!uuid) {
      this.util.openSnackbar(this.translate.instant('MANAGE.MEDIA.MISSING_UUID'), 'ok');
      return;
    }
    this.confirmDelete('MANAGE.MEDIA.CONFIRM_DELETE_BODY')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(confirmed => {
        if (!confirmed) {
          return;
        }
        this.loading.set(true);
        this.manageService
          .deleteMedia(uuid)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => this.onSearch(this.form.value),
            error: () => { this.loading.set(false); this.loadError.set(true); },
          });
      });
  }

  confirmDelete(bodyKey: string, params?: Record<string, unknown>): Observable<boolean> {
    const config: IDialog = {
      title: this.translate.instant('MANAGE.MEDIA.CONFIRM_DELETE_TITLE'),
      titleClasses: 'text-red-500',
      noLabel: this.translate.instant('MANAGE.MEDIA.CANCEL'),
      yesLabel: this.translate.instant('MANAGE.MEDIA.CONFIRM'),
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: this.translate.instant(bodyKey, params),
        },
      },
    };
    return this.dialog
      .open(DialogComponent, {
        width: '340px',
        data: config,
      })
      .afterClosed();
  }

  /** Update batch selection without emitting a media-picker result. */
  onChange(checked: boolean, uuid: string): void {
    if (!uuid || !this.visibleAssets()?.rows.some(item => item.uuid === uuid && item.canRemove)) return;
    this.selectedIds.update(ids => checked ? [...new Set([...ids, uuid])]
      : ids.filter(id => id !== uuid));
  }

  /** Select only media already loaded into this panel. */
  selectLoaded(): void {
    const loaded = this.visibleAssets()?.rows.filter(item => item.canRemove).map(item => item.uuid).filter(Boolean) ?? [];
    this.selectedIds.update(ids => [...new Set([...ids, ...loaded])]);
  }

  /** Return focus to the media list when the selection toolbar disappears. */
  clearSelection(): void {
    this.selectedIds.set([]);
    this.scrollViewport()?.nativeElement.focus({ preventScroll: true });
  }

  handleDelete(file: string): Observable<void | boolean> {
    return this.manageService.deleteMedia(file).pipe(
      catchError(error => {
        console.error(`Failed to delete file: ${file}`, error);
        return of(false);
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  calculateProgress(deletedCount: number, totalFiles: number): void {
    const progress = (deletedCount / totalFiles) * 100;
    this.progress = progress;
    if (progress === 100) {
      this.util.openSnackbar(this.translate.instant('MANAGE.MEDIA.ALL_DELETED'), 'ok');
    }
  }

  bulkDelete(lists: readonly string[]): void {
    const selection = lists.filter(uuid => this.visibleAssets()?.rows.some(
      item => item.uuid === uuid && item.canRemove));
    if (!selection.length) return;
    this.confirmDelete('MANAGE.MEDIA.CONFIRM_BULK_DELETE_BODY', { count: selection.length })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(confirmed => {
        if (confirmed) {
          this.runBulkDelete(selection);
        }
      });
  }

  runBulkDelete(lists: string[]): void {
    const totalFiles = lists.length;

    from(lists)
      .pipe(
        concatMap(file => this.handleDelete(file)), // concatMap guarantees sequential execution
        scan((acc, curr) => acc + (curr === false ? 0 : 1), 0),
        tap(deletedCount => this.calculateProgress(deletedCount, totalFiles)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        complete: () => {
          this.loading.set(false);
          this.selectedIds.set([]);
          this.onSearch(this.form.value);
        },
        error: err => console.error('Error deleting files', err),
      });
  }

  isSelected(item: IManageImg): boolean {
    return this.content().mode === 'manage'
      ? this.selectedIds().includes(item.uuid)
      : !!item.id && item.id === this.selectedId();
  }

  /** Checks the source format against the component opening this picker. */
  canSelect(item: IManageImg): boolean {
    return this.activeAccount === this.user() && canSelectMedia(item, this.content().purpose);
  }

  onSelect(item: IManageImg): void {
    if (!this.canSelect(item)) {
      this.util.openSnackbar(this.translate.instant('MANAGE.MEDIA.INCOMPATIBLE_SELECTION'), 'ok');
      return;
    }
    this.selectedId.set(item.id);
    this.builder.selectedMedia$.next({
      img: {
        src: item.source || item.src || '',
        alt: item.title,
        fileName: item.title,
        tag: 'img',
        uuid: item.uuid ?? '',
        ...(item.fileId ? { fileId: item.fileId } : {}),
        ...(item.bundle ? { bundle: item.bundle } : {}),
        ...(item.mimeType ? { mimeType: item.mimeType } : {}),
      },
      value: this.content(),
      time: this.content().time,
    });
  }

  onRename(item: IManageImg): void {
    if (!item.canRename) return;
    if (!item.uuid) {
      this.util.openSnackbar(this.translate.instant('MANAGE.MEDIA.MISSING_UUID'), 'ok');
      return;
    }
    const renameForm = new UntypedFormGroup({
      name: new FormControl(item.title, { nonNullable: true }),
    });
    const renameModel = { name: item.title };
    const config: IDialog = {
      title: this.translate.instant('MANAGE.MEDIA.RENAME_TITLE'),
      noLabel: this.translate.instant('MANAGE.MEDIA.CANCEL'),
      yesLabel: this.translate.instant('MANAGE.MEDIA.SAVE'),
      inputData: {
        content: {
          content: { type: 'formly' },
          form: renameForm,
          model: renameModel,
          fullWidth: true,
          fields: [
            {
              type: 'input',
              key: 'name',
              props: {
                appearance: 'fill',
                label: this.translate.instant('MANAGE.MEDIA.RENAME_LABEL'),
                description: this.translate.instant('MANAGE.MEDIA.RENAME_HINT'),
                required: true,
              },
            },
          ],
        },
      },
    };
    this.dialog
      .open(DialogComponent, {
        width: '420px',
        data: config,
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(confirmed => {
        if (!confirmed) {
          return;
        }
        const name = (renameForm.get('name')?.value ?? '').trim();
        if (!name || name === item.title) {
          return;
        }
        this.loading.set(true);
        this.manageService
          .updateMediaName(item.uuid, name)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.util.openSnackbar(this.translate.instant('MANAGE.MEDIA.RENAMED'), 'ok');
              this.onSearch(this.form.value);
            },
            error: () => {
              this.loading.set(false);
              this.util.openSnackbar(this.translate.instant('MANAGE.MEDIA.RENAME_FAILED'), 'ok');
            },
          });
      });
  }

  onCopy(item: IManageImg): void {
    this.util.copy(item.source || item.src || '');
    this.util.openSnackbar(this.translate.instant('MANAGE.MEDIA.PATH_COPIED'), 'ok');
  }

  onPreview(item: IManageImg): void {
    if (item.private || !canSelectMedia(item)) {
      void import('./media-preview.component').then(({ MediaPreviewComponent }) => {
        this.dialog.open(MediaPreviewComponent, { data: item, width: '800px' });
      });
      return;
    }
    const config: IDialog = {
      disableActions: true,
      inputData: {
        content: {
          type: 'img',
          src: item.source || item.src,
          width: 800,
          height: 600,
          classes: 'object-contain',
        },
      },
    };
    this.dialog.open(DialogComponent, {
      panelClass: ['close-outside', 'dialog-p-0', 'close-icon-white', 'media-preview-dialog'],
      backdropClass: ['bg-neutral-800', '!opacity-80'],
      data: config,
    });
  }

  onUpload(): void {
    const config: IDialog = {
      disableActions: true,
      inputData: {
        content: {
          type: 'upload-media',
        },
      },
    };
    const dialog = this.dialog.open(DialogComponent, {
      width: '800px',
      id: 'upload-dialog',
      panelClass: ['close-outside', 'close-icon-white'],
      backdropClass: 'upload-dialog-backdrop',
      data: config,
    });

    dialog
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.form.get('noCache')?.patchValue(true);
        this.onSearch(this.form.value);
      });
  }
}
