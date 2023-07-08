import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IPaginationLinks } from '@core/interface/widgets/IPaginationLinks';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { CORE_CONFIG, MEDIA_ASSETS } from '@core/token/token-providers';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { IManageAssets } from '@core/interface/manage/IManage';

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
  constructor(
    private cd: ChangeDetectorRef,
    private utli: UtilitiesService,
    private screenService: ScreenService,
    private nodeService: NodeService,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(MEDIA_ASSETS) public mediaAssets$: Observable<IManageAssets>
  ) {}

  ngOnInit(): void {}

  getFiles(type = '', params = ''): void {
    this.nodeService
      .fetch(type, params)
      .pipe(takeUntil(this.destory$))
      .subscribe((res) => {
        console.log(res);
      });
  }

  onPageChange(link: string): void {
    this.screenService.gotoTop();
    this.loading = true;
    this.nodeService
      .getNodeByLink(link)
      .pipe(takeUntil(this.destory$))
      .subscribe((res) => {
        // this.updateList(res);
      });
  }

  onModelChange(value: any): void {
    console.log(value);
  }

  onSearch(value: any): void {
    console.log(value);
    const apiParams = new DrupalJsonApiParams();
    const { type, limit, filter, sort } = value;

    if (limit !== undefined) {
      apiParams.addPageLimit(limit);
    }

    if (filter !== undefined) {
      apiParams.addFilter('status', filter);
    }

    if (sort !== undefined) {
      const { field, direction } = sort;
      apiParams.addSort(field, direction);
    }

    // 图片库
    if (type.includes('image')) {
      apiParams.addFields('file--file', ['uri']);
      apiParams.addInclude(['field_media_image']);
    }

    // 文档库 or 视频库
    if (type.includes('document') || type.includes('video')) {
      this.utli.openSnackbar('文档库和视频库功能未完善！', 'Ok');
      return;
    }
    const params = apiParams.getQueryString({ encode: false });
    console.log(params);
    this.loading = true;
    this.getFiles(type, params);
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
