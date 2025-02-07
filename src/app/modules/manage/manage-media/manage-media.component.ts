import {
  Component,
  OnInit,
  Inject,
  ChangeDetectorRef,
  Input,
  inject,
  ViewChild,
  DestroyRef,
  signal,
} from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { ScreenService } from '@core/service/screen.service';
import { Observable, from, of } from 'rxjs';
import { BUILDER_CONFIG, CORE_CONFIG, MEDIA_ASSETS } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
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
import { PageEvent } from '@angular/material/paginator';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { UtilitiesService } from '@core/service/utilities.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IBuilderConfig } from '@core/interface/IBuilder';

@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.scss'],
})
export class ManageMediaComponent implements OnInit {
  @Input() content: IManageMedia;
  form = new UntypedFormGroup({
    page: new FormControl(0),
  });
  fields = signal<FormlyFieldConfig[]>([]);
  manageMediaConfig = signal<any>({});
  model: any = {};
  loading = signal<boolean>(false);
  selectedId: string;
  deletedLists: string[] = [];
  progress = 0;
  dialog = inject(MatDialog);
  cd = inject(ChangeDetectorRef);
  builder = inject(BuilderState);
  util = inject(UtilitiesService);
  contentState = inject(ContentState);
  screenService = inject(ScreenService);
  manageService = inject(ManageService);
  private destroyRef = inject(DestroyRef);

  @ViewChild('uploadDrawer', { static: false })
  uploadDrawer: MatDrawer;

  defaultField: FormlyFieldConfig[] = [
    {
      type: 'input',
      key: 'name',
      className: 'm-bottom-sm',
      props: {
        type: 'string',
        appearance: 'fill',
        label: '请输入关键词',
      },
      modelOptions: {
        updateOn: 'blur',
      },
    },
  ];
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(BUILDER_CONFIG) public builderConfig: Observable<IBuilderConfig>,
    @Inject(MEDIA_ASSETS)
    public mediaAssets$: Observable<IManageAssets>
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.loading.set(true);
      this.builderConfig.subscribe(config => {
        this.manageMediaConfig.set(config.manageMedia);
        this.fields.set([...this.defaultField, ...config.manageMedia.sidebar.form]);
      });
      this.form.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(1000), distinctUntilChanged())
        .subscribe(value => {
          this.onSearch(value);
        });

      this.mediaAssets$.subscribe(() => {
        this.loading.set(false);
      });
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

  onDelete(uuid: string): void {
    if (uuid) {
      this.loading.set(true);
      this.manageService
        .deleteMedia(uuid)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.loading.set(false);
          this.onSearch(this.form.value);
        });
    } else {
      this.util.openSnackbar('是否忘记了配置UUID？', 'ok');
    }
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
    this.cd.detectChanges();
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
      this.util.openSnackbar('已全部删除', 'ok');
    }
  }

  bulkDelete(lists: string[]): void {
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
      value: this.content,
      time: this.content.time,
    });
  }

  onCopy(item: IManageImg): void {
    this.util.copy(item.source || item.src || '');
    this.util.openSnackbar('图片路径已复制', 'ok');
  }

  onPreview(item: IManageImg): void {
    this.dialog.open(DialogComponent, {
      panelClass: ['close-outside', 'dialog-p-0', 'close-icon-white', 'media-preview-dialog'],
      backdropClass: ['bg-neutral-800', '!opacity-80'],
      data: {
        disableCloseButton: true,
        inputData: {
          content: {
            type: 'img',
            src: item.source || item.src,
            width: 800,
            height: 600,
            classes: 'object-contain',
          },
        },
      },
    });
  }

  onUpload(): void {
    const dialog = this.dialog.open(DialogComponent, {
      width: '800px',
      id: 'upload-dialog',
      panelClass: ['close-outside', 'close-icon-white'],
      data: {
        disableCloseButton: true,
        inputData: {
          content: {
            type: 'upload-media',
          },
        },
      },
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
