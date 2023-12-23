import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ScreenService } from '@core/service/screen.service';
import { Observable, Subject } from 'rxjs';
import { CORE_CONFIG, MEDIA_ASSETS } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IManageAssets } from '@core/interface/manage/IManage';
import { ContentState } from '@core/state/ContentState';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageMediaComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  loading = true;
  destory$: Subject<boolean> = new Subject<boolean>();
  selectedId: string;
  constructor(
    private screenService: ScreenService,
    private contentState: ContentState,
    private builder: BuilderState,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(MEDIA_ASSETS) public mediaAssets$: Observable<IManageAssets>
  ) {}

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
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

  isSelected(item: any): boolean {
    return item.id === this.selectedId;
  }

  onSelect(item: any): void {
    this.selectedId = item.id;
    this.builder.metaEditImaPath$.next({
      src: item.img.src,
      alt: item.img.alt,
      fileName: item.img.src.split('/').pop(),
    });
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
