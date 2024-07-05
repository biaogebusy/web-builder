import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
  Input,
  OnDestroy,
  inject,
  ViewChild,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ScreenService } from '@core/service/screen.service';
import { Observable, Subject } from 'rxjs';
import { CORE_CONFIG, MEDIA_ASSETS, USER } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type {
  IManageAssets,
  IManageMedia,
  IMediaAttr,
} from '@core/interface/manage/IManage';
import { ContentState } from '@core/state/ContentState';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { BuilderState } from '@core/state/BuilderState';
import { ManageService } from '@core/service/manage.service';
import { PageEvent } from '@angular/material/paginator';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { NodeService } from '@core/service/node.service';
import { IUser } from '@core/interface/IUser';
import { UtilitiesService } from '@core/service/utilities.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageMediaComponent implements OnInit, OnDestroy {
  @Input() content: IManageMedia;
  form = new UntypedFormGroup({});
  fields: FormlyFieldConfig[];
  model: any = {};
  loading = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  selectedId: string;
  files: IMediaAttr[] = [];
  cd = inject(ChangeDetectorRef);
  util = inject(UtilitiesService);
  builder = inject(BuilderState);
  contentState = inject(ContentState);
  screenService = inject(ScreenService);
  manageService = inject(ManageService);
  nodeService = inject(NodeService);

  @ViewChild('uploadDrawer', { static: false })
  uploadDrawer: MatDrawer;

  defaultField: FormlyFieldConfig[] = [
    {
      type: 'toggle',
      key: 'fromStatic',
      className: 'static-item',
      defaultValue: true,
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
    @Inject(USER) private user: IUser,
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.fields = [
        ...this.defaultField,
        ...this.coreConfig.manageMedia.sidebar.form,
      ];
      this.form.valueChanges
        .pipe(
          takeUntil(this.destroy$),
          debounceTime(1000),
          distinctUntilChanged(),
        )
        .subscribe((value) => {
          this.onSearch(value);
        });
    }
  }

  onPageChange(page: PageEvent): void {
    this.screenService.gotoTop();
    this.contentState.pageChange$.next(page);
  }

  onSearch(value: any): void {
    this.contentState.mediaAssetsFormChange$.next(value);
  }

  onDelete(uuid: string): void {
    if (uuid) {
      this.loading = true;
      this.manageService.deleteMedia(uuid).subscribe((res) => {
        this.loading = false;
        this.onSearch(this.form.value);
        this.cd.detectChanges();
      });
    }
  }

  isSelected(item: any): boolean {
    if (item.id) {
      return item.id === this.selectedId;
    } else {
      return false;
    }
  }

  onSelect(item: any): void {
    this.selectedId = item.id;
    this.builder.selectedMedia$.next({
      img: {
        src: item.src,
        alt: item.name,
        fileName: item.name,
        tag: 'img',
      },
      value: this.content,
      time: this.content.time,
    });
  }

  onUpload(): void {
    this.uploadDrawer.open();
    this.model.fromStatic = false;
  }

  dropped(files: NgxFileDropEntry[]): void {
    if (!this.user) {
      this.util.openSnackbar('请先登录', 'ok');
    }
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
              const data = e.target.result;
              this.nodeService
                .uploadImage(file.name, data, this.user.csrf_token)
                .subscribe((img: IMediaAttr) => {
                  this.files.push(img);
                  this.cd.detectChanges();
                });
            };
            reader.readAsArrayBuffer(file);
          }
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  onCopy(url: string): void {
    this.util.copy(url);
    this.util.openSnackbar('已复制图片地址', 'ok');
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}
