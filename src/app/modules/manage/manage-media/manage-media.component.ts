import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
  Input,
  inject,
  ViewChild,
  DestroyRef,
} from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { ScreenService } from '@core/service/screen.service';
import { Observable, from, of } from 'rxjs';
import { CORE_CONFIG, MEDIA_ASSETS } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type {
  IManageAssets,
  IManageImg,
  IManageMedia,
} from '@core/interface/manage/IManage';
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
import { environment } from 'src/environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageMediaComponent implements OnInit {
  @Input() content: IManageMedia;
  form = new UntypedFormGroup({
    page: new FormControl(0),
  });
  fields: FormlyFieldConfig[];
  model: any = {
    noCache: true,
  };
  loading = false;
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
      type: 'toggle',
      key: 'fromStatic',
      className: 'static-item',
      defaultValue: environment.production ? false : true,
      props: {
        label: '切换资源库',
      },
      expressions: {
        'props.label': "model.fromStatic?'静态资源':'后台媒体库'",
      },
    },
    {
      type: 'input',
      key: 'name',
      className: 'm-bottom-sm',
      props: {
        type: 'string',
        appearance: 'fill',
        label: '请输入关键词',
      },
    },
  ];
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(MEDIA_ASSETS) public mediaAssets$: Observable<IManageAssets>,
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.loading = true;
      this.fields = [
        ...this.defaultField,
        ...this.coreConfig.manageMedia.sidebar.form,
      ];
      this.form.valueChanges
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          debounceTime(1000),
          distinctUntilChanged(),
        )
        .subscribe((value) => {
          this.onSearch(value);
        });

      this.mediaAssets$.subscribe(() => {
        this.loading = false;
        this.cd.detectChanges();
      });
    }
  }

  onPageChange(page: PageEvent): void {
    this.screenService.gotoTop();
    this.loading = true;
    this.form.get('page')?.patchValue(page.pageIndex);
  }

  onSearch(value: any): void {
    this.loading = true;
    this.cd.detectChanges();
    this.contentState.mediaAssetsFormChange$.next(value);
  }

  onDelete(uuid: string): void {
    if (uuid) {
      this.loading = true;
      this.manageService
        .deleteMedia(uuid)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.loading = false;
          this.onSearch(this.form.value);
          this.cd.detectChanges();
        });
    } else {
      this.util.openSnackbar('是否忘记了配置UUID？', 'ok');
    }
  }

  onChange(checked: boolean, uuid: string): void {
    if (checked) {
      this.deletedLists = [...this.deletedLists, uuid];
    } else {
      const index = this.deletedLists.findIndex((item) => item === uuid);
      if (index >= 0) {
        this.deletedLists.splice(index, 1);
      }
    }
    this.cd.detectChanges();
  }

  handleDelete(file: string): Observable<boolean> {
    return this.manageService.deleteMedia(file).pipe(
      catchError((error) => {
        console.error(`Failed to delete file: ${file}`, error);
        return of(false);
      }),
      takeUntilDestroyed(this.destroyRef),
    );
  }

  calculateProgress(deletedCount: number, totalFiles: number): void {
    const progress = (deletedCount / totalFiles) * 100;
    this.progress = progress;
    if (progress === 100) {
      this.util.openSnackbar('已全部删除', 'ok');
    }
    this.cd.detectChanges();
  }

  bulkDelete(lists: string[]): void {
    const totalFiles = lists.length;

    from(lists)
      .pipe(
        concatMap((file) => this.handleDelete(file)), // 使用 concatMap 保证顺序执行
        scan((acc, curr) => acc + (curr === false ? 0 : 1), 0),
        tap((deletedCount) => this.calculateProgress(deletedCount, totalFiles)),
      )
      .subscribe({
        complete: () => {
          this.loading = false;
          this.deletedLists = [];
          this.onSearch(this.form.value);
          this.cd.detectChanges();
        },
        error: (err) => console.error('Error deleting files', err),
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
      panelClass: [
        'close-outside',
        'dialog-p-0',
        'close-icon-white',
        'media-preview-dialog',
      ],
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
        this.onSearch(this.form.value);
      });
  }
}
