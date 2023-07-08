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

@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageMediaComponent implements OnInit {
  links: IPaginationLinks;
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
    @Inject(MEDIA_ASSETS) public mediaAssets$: Observable<any[]>
  ) {}

  ngOnInit(): void {
    // this.getFiles('/api/v1/file/file', 'sort=-created&page[limit]=45');
  }

  getFiles(type = '', params = ''): void {
    this.nodeService
      .fetch(type, params)
      .pipe(takeUntil(this.destory$))
      .subscribe((res) => {
        console.log(res);
        this.updateList(res);
      });
  }

  updateList(res: any): void {
    const { data, links } = res;
    const iconPath = '/assets/icons';
    // this.content = data.map((item: any) => {
    //   const attr = item.attributes;
    //   const type = this.utli.getFileType(attr.uri.url);
    //   const widget = {
    //     id: item.id,
    //     type: 'feature-box',
    //     width: '20',
    //     fullIcon: 'fullscreen',
    //     copyIcon: 'content-copy',
    //     ratios: 'media-4-3',
    //     mode: 'float',
    //     hoverIcon: true,
    //   };
    //   if (type === 'picture') {
    //     return {
    //       ...widget,
    //       img: {
    //         classes: 'object-fit',
    //         src: attr.uri.url,
    //         alt: attr.filename,
    //       },
    //     };
    //   } else {
    //     return {
    //       ...widget,
    //       openIcon: 'file_download',
    //       link: attr.uri.url,
    //       img: {
    //         classes: 'object-fill p-x-lg p-y-lg',
    //         src:
    //           type === 'pdf'
    //             ? `${iconPath}/file-pdf.svg`
    //             : type === 'excel'
    //             ? `${iconPath}/file-excel.svg`
    //             : `${iconPath}/file-word.svg`,
    //         alt: attr.filename,
    //       },
    //     };
    //   }
    // });
    this.links = links;
    this.loading = false;
    this.cd.detectChanges();
  }

  onPageChange(link: string): void {
    this.screenService.gotoTop();
    this.loading = true;
    this.nodeService
      .getNodeByLink(link)
      .pipe(takeUntil(this.destory$))
      .subscribe((res) => {
        this.updateList(res);
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
