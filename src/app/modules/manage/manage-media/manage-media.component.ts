import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
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
import { PageEvent } from '@angular/material/paginator';
import { IPager } from '@core/interface/widgets/IWidgets';

@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageMediaComponent implements OnInit, OnDestroy {
  @Input() content: IManageMedia;
  form = new UntypedFormGroup({});
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
    @Inject(MEDIA_ASSETS) public mediaAssets$: Observable<IManageAssets>,
  ) {}

  ngOnInit(): void {
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
