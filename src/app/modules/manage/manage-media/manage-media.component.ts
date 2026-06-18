import {
  Component,
  OnInit,
  effect,
  inject,
  DestroyRef,
  signal,
  Injector,
  ChangeDetectionStrategy,
  input,
  viewChild,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScreenService } from '@core/service/screen.service';
import { Observable, from, of } from 'rxjs';
import { BUILDER_CONFIG, MEDIA_ASSETS } from '@core/token/token-providers';
import type { IManageAssets, IManageImg, IManageMedia } from '@core/interface/manage/IManage';
import { ContentState } from '@core/state/ContentState';
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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { UtilitiesService } from '@core/service/utilities.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { IBuilderConfig } from '@core/interface/IBuilder';
import { IDialog } from '@core/interface/IDialog';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import { FormlyComponent } from '@uiux/combs/form/formly/formly.component';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { LoadingComponent } from '@uiux/widgets/loading/loading.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.scss'],
  imports: [
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTooltipModule,
    ReqRolesDirective,
    FormlyComponent,
    BtnComponent,
    IconComponent,
    LoadingComponent,
    TranslateModule,
  ],
})
export class ManageMediaComponent implements OnInit {
  private builderConfig = toSignal(inject(BUILDER_CONFIG), { initialValue: undefined });
  public mediaAssets = inject(MEDIA_ASSETS);

  readonly content = input.required<IManageMedia>();
  public form = new UntypedFormGroup({
    page: new FormControl(0),
  });
  public fields = signal<FormlyFieldConfig[]>([]);
  public manageMediaConfig = signal<any>({});
  public model: any = {};
  public loading = signal<boolean>(false);
  private selectedId: string;
  public deletedLists: string[] = [];
  public progress = 0;
  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private contentState = inject(ContentState);
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
      className: 'm-bottom-sm',
      props: {
        type: 'string',
        appearance: 'fill',
        label: this.translate.instant('MANAGE.MEDIA.SEARCH_PLACEHOLDER'),
      },
      modelOptions: {
        updateOn: 'blur',
      },
    },
  ];

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.loading.set(true);
      effect(() => {
        const config = this.builderConfig();
        if (config) {
          this.manageMediaConfig.set(config.manageMedia);
          this.fields.set([...this.defaultField, ...config.manageMedia.sidebar.form]);
        }
      }, { injector: this.injector });
      this.onSearch({});
      this.form.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(1000), distinctUntilChanged())
        .subscribe(value => {
          this.onSearch(value);
        });

      effect(() => {
        this.mediaAssets();
        this.loading.set(false);
      }, { injector: this.injector });
    }
  }

  onPageChange(page: PageEvent): void {
    this.screenService.gotoTop();
    this.loading.set(true);
    this.form.get('page')?.patchValue(page.pageIndex);
  }

  onSearch(value: any): void {
    this.loading.set(true);
    this.contentState.mediaAssetsFormChange$.next(value);
  }

  onEnter(event: Event): void {
    event.preventDefault();
    (event.target as HTMLElement)?.blur();
    this.onSearch(this.form.value);
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
          .subscribe(() => {
            this.loading.set(false);
            this.onSearch(this.form.value);
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

  onChange(checked: boolean, uuid: string): void {
    if (checked) {
      this.deletedLists = [...this.deletedLists, uuid];
    } else {
      const index = this.deletedLists.findIndex(item => item === uuid);
      if (index >= 0) {
        this.deletedLists.splice(index, 1);
      }
    }
  }

  handleDelete(file: string): Observable<boolean> {
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

  bulkDelete(lists: string[]): void {
    this.confirmDelete('MANAGE.MEDIA.CONFIRM_BULK_DELETE_BODY', { count: lists.length })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(confirmed => {
        if (confirmed) {
          this.runBulkDelete(lists);
        }
      });
  }

  runBulkDelete(lists: string[]): void {
    const totalFiles = lists.length;

    from(lists)
      .pipe(
        concatMap(file => this.handleDelete(file)), // 使用 concatMap 保证顺序执行
        scan((acc, curr) => acc + (curr === false ? 0 : 1), 0),
        tap(deletedCount => this.calculateProgress(deletedCount, totalFiles)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        complete: () => {
          this.loading.set(false);
          this.deletedLists = [];
          this.onSearch(this.form.value);
        },
        error: err => console.error('Error deleting files', err),
      });
  }

  isSelected(item: IManageImg): boolean {
    if (item.id) {
      return item.id === this.selectedId;
    } else {
      return false;
    }
  }

  onSelect(item: IManageImg): void {
    this.selectedId = item.id;
    this.builder.selectedMedia$.next({
      img: {
        src: item.source || item.src || '',
        alt: item.title,
        fileName: item.title,
        tag: 'img',
        uuid: item.uuid ?? '',
      },
      value: this.content(),
      time: this.content().time,
    });
  }

  onRename(item: IManageImg): void {
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
