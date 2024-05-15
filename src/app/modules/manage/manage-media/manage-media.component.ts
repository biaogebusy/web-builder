import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ScreenService } from '@core/service/screen.service';
import { Observable, Subject } from 'rxjs';
import { CORE_CONFIG, MEDIA_ASSETS } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type {
  IManageAssets,
  IManageMedia,
} from '@core/interface/manage/IManage';
import { ContentState } from '@core/state/ContentState';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { BuilderState } from '@core/state/BuilderState';
import { ManageService } from '@core/service/manage.service';

@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageMediaComponent implements OnInit, OnDestroy {
  @Input() content: IManageMedia;
  form = new FormGroup({});
  model: any = {};
  loading = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  selectedId: string;
  constructor(
    private screenService: ScreenService,
    private contentState: ContentState,
    private builder: BuilderState,
    private manageService: ManageService,
    private cd: ChangeDetectorRef,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(MEDIA_ASSETS) public mediaAssets$: Observable<IManageAssets>
  ) {}

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.onSearch(value);
      });
  }

  onPageChange(link: string): void {
    this.screenService.gotoTop();
    this.contentState.pageChange$.next(link);
  }

  onSearch(value: any): void {
    this.contentState.mediaAssetsFormChange$.next(value);
  }

  get flexBasisStyle(): string {
    const { manageMedia } = this.coreConfig;

    if (manageMedia && manageMedia.row) {
      return `0 0 calc(100% / ${this.coreConfig.manageMedia.row})`;
    }
    return '0 0 auto';
  }

  onDelete(id: string, type?: string): void {
    if (type) {
      this.loading = true;
      this.manageService.deleteMedia(type, id).subscribe((res) => {
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
        src: item.img.src,
        alt: item.img.alt,
        fileName: item.img.src.split('/').pop(),
        tag: 'img',
      },
      value: this.content,
    });
  }

  trackByFn(index: number, item: any): number {
    return item.id || index;
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}
