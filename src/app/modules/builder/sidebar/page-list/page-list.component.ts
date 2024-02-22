import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IPage } from '@core/interface/IAppConfig';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageListComponent implements OnInit, OnDestroy {
  content$: Observable<any[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  links: any;
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        label: '标题',
        type: 'search',
        appearance: 'outline',
      },
    },
  ];
  constructor(
    private nodeService: NodeService,
    private cd: ChangeDetectorRef,
    private builder: BuilderState,
    private util: UtilitiesService
  ) {}

  ngOnInit(): void {
    const apiParams = new DrupalJsonApiParams();
    apiParams.addCustomParam({ noCache: true });

    apiParams
      .addPageLimit(10)
      .addInclude(['uid'])
      .addSort('created', 'DESC')
      .addFilter('status', '1');
    this.getContent(apiParams);
  }

  onModelChange(value: any): void {
    console.log(value);
    const { title } = value;
    const apiParams = new DrupalJsonApiParams();
    apiParams.addCustomParam({ noCache: true });

    apiParams
      .addPageLimit(10)
      .addInclude(['uid'])
      .addSort('created', 'DESC')
      .addFilter('status', '1')
      .addFilter('title', title, 'CONTAINS');
    this.getContent(apiParams);
  }

  getContent(apiParams: DrupalJsonApiParams): void {
    const params = apiParams.getQueryString();

    this.content$ = this.nodeService.fetch('node/landing_page', params).pipe(
      takeUntil(this.destroy$),
      map((res) => {
        console.log(res);
        return this.getLists(res);
      })
    );
  }

  onPageChange(link: string): void {
    this.content$ = this.nodeService.getNodeByLink(link).pipe(
      takeUntil(this.destroy$),
      map((res: any) => {
        return this.getLists(res);
      })
    );
  }

  getLists(res: any): any[] {
    this.links = res.links;
    const { included } = res;
    this.cd.detectChanges();
    return res.data.map((item: any) => {
      const { attributes } = item;
      return {
        title: attributes.title,
        changed: attributes.changed,
        id: item.id,
        user: included.find(
          (user: any) => user.id === item.relationships.uid.data.id
        ).attributes.display_name,
        href: attributes.path.alias
          ? attributes.path.alias
          : `/node/${attributes.drupal_internal__nid}`,
      };
    });
  }

  loadPage(item: any): void {
    this.nodeService
      .fetch('landingPage', `content=${item.href}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((page: IPage) => {
        console.log(page);
        if (page.body.length) {
          this.builder.loadNewPage(page);
        } else {
          this.util.openSnackbar('当前内容为空，请添加组件', 'ok');
          this.builder.loadNewPage({
            ...page,
            body: [
              {
                type: 'layout-builder',
                spacer: 'md',
                fullWidth: false,
                bg: {
                  classes: 'bg-fill-width',
                },
                layoutAlign: 'center center',
                gap: {
                  xs: 8,
                  sm: 16,
                  md: 32,
                  lg: 48,
                },
                elements: [
                  {
                    classes: '',
                    row: {
                      xs: 12,
                      sm: 12,
                      md: 6,
                      lg: 6,
                    },
                    direction: 'column',
                    layoutAlign: 'start start',
                    elements: [],
                  },
                  {
                    classes: '',
                    row: {
                      xs: 12,
                      sm: 12,
                      md: 6,
                      lg: 6,
                    },
                    direction: 'column',
                    layoutAlign: 'start start',
                    elements: [],
                  },
                ],
              },
            ],
          });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}
