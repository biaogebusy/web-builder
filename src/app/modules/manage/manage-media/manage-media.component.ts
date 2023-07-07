import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IPaginationLinks } from '@core/interface/widgets/IPaginationLinks';
import { ManageService } from '@core/service/manage.service';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';

@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageMediaComponent implements OnInit {
  content: any;
  links: IPaginationLinks;
  form = new FormGroup({
    page: new FormControl(),
  });
  model: any = {};
  row = 4;
  loading = true;
  destory$: Subject<boolean> = new Subject<boolean>();
  filters = [
    {
      type: 'select',
      key: 'limit',
      defaultValue: 20,
      className: 'display-block m-bottom-sm',
      templateOptions: {
        label: '每页显示个数',
        options: [
          {
            label: '10',
            value: 10,
          },
          {
            label: '20',
            value: 20,
          },
          {
            label: '30',
            value: 30,
          },
          {
            label: '40',
            value: 40,
          },
          {
            label: '50',
            value: 50,
          },
        ],
      },
    },
    {
      type: 'select',
      key: 'filter',
      defaultValue: 1,
      className: 'display-block m-bottom-sm',
      templateOptions: {
        label: '发布状态',
        options: [
          {
            label: '已发布',
            value: 1,
          },
          {
            label: '未发布',
            value: 0,
          },
        ],
      },
    },
    {
      key: 'sort',
      className: 'm-bottom-sm width-100',
      fieldGroup: [
        {
          type: 'select',
          key: 'field',
          defaultValue: 'created',
          className: 'display-block m-bottom-sm',
          templateOptions: {
            label: '排序',
            options: [
              {
                label: '创建时间',
                value: 'created',
              },
              {
                label: '用户ID',
                value: 'uid',
              },
              {
                label: '发布状态',
                value: 'status',
              },
            ],
          },
        },
        {
          type: 'select',
          key: 'direction',
          defaultValue: 'DESC',
          className: 'display-block m-bottom-sm',
          templateOptions: {
            label: '排序',
            options: [
              {
                label: '最新发布的',
                value: 'DESC',
              },
              {
                label: '最旧发布的',
                value: 'ASC',
              },
            ],
          },
        },
      ],
    },
  ];
  constructor(
    private manageService: ManageService,
    private cd: ChangeDetectorRef,
    private utli: UtilitiesService,
    private screenService: ScreenService,
    private nodeService: NodeService
  ) {}

  ngOnInit(): void {
    this.getFiles('sort=-created&page[limit]=45');
  }

  getFiles(params = ''): void {
    this.manageService
      .getFiles(params)
      .pipe(takeUntil(this.destory$))
      .subscribe((res) => {
        console.log(res);
        this.updateList(res);
      });
  }

  updateList(res: any): void {
    const { data, links } = res;
    const iconPath = '/assets/icons';
    this.content = data.map((item: any) => {
      const attr = item.attributes;
      const type = this.utli.getFileType(attr.uri.url);
      const widget = {
        id: item.id,
        type: 'feature-box',
        width: '20',
        fullIcon: 'fullscreen',
        copyIcon: 'content-copy',
        ratios: 'media-4-3',
        mode: 'float',
        hoverIcon: true,
      };
      if (type === 'picture') {
        return {
          ...widget,
          img: {
            classes: 'object-fit',
            src: attr.uri.url,
            alt: attr.filename,
          },
        };
      } else {
        return {
          ...widget,
          openIcon: 'file_download',
          link: attr.uri.url,
          img: {
            classes: 'object-fill p-x-lg p-y-lg',
            src:
              type === 'pdf'
                ? `${iconPath}/file-pdf.svg`
                : type === 'excel'
                ? `${iconPath}/file-excel.svg`
                : `${iconPath}/file-word.svg`,
            alt: attr.filename,
          },
        };
      }
    });
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
    const { limit, filter, sort } = value;

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
    const params = apiParams.getQueryString();
    console.log(params);
    this.loading = true;
    this.getFiles(params);
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
