import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IPage } from '@core/interface/IAppConfig';
import { BuilderService } from '@core/service/builder.service';
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
  loading: boolean = false;
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        placeholder: '关键词',
        type: 'search',
        appearance: 'outline',
      },
    },
  ];
  constructor(
    private nodeService: NodeService,
    private cd: ChangeDetectorRef,
    private builder: BuilderState,
    private util: UtilitiesService,
    private buiderService: BuilderService
  ) {}

  ngOnInit(): void {
    const apiParams = new DrupalJsonApiParams();
    apiParams.addCustomParam({ noCache: true });

    apiParams
      .addPageLimit(10)
      .addInclude(['uid'])
      .addSort('changed', 'DESC')
      .addFilter('status', '1');
    this.getContent(apiParams);
  }

  onModelChange(value: any): void {
    this.loading = true;
    const { title } = value;
    const apiParams = new DrupalJsonApiParams();
    apiParams.addCustomParam({ noCache: true });

    apiParams
      .addPageLimit(10)
      .addInclude(['uid'])
      .addSort('changed', 'DESC')
      .addFilter('status', '1')
      .addFilter('title', title, 'CONTAINS');
    this.getContent(apiParams);
  }

  getContent(apiParams: DrupalJsonApiParams): void {
    const params = apiParams.getQueryString();

    this.content$ = this.nodeService.fetch('node/landing_page', params).pipe(
      takeUntil(this.destroy$),
      map((res) => {
        this.loading = false;
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
        nid: attributes.drupal_internal__nid,
        user: included.find(
          (user: any) => user.id === item.relationships.revision_uid.data.id
        ).attributes.display_name,
        href: attributes.path.alias
          ? attributes.path.alias
          : `/node/${attributes.drupal_internal__nid}`,
      };
    });
  }

  loadPage(item: any): void {
    this.util.openSnackbar(`正在加载${item.title}`, 'ok');
    this.builder.loading$.next(true);
    this.buiderService.loadPage(item.nid);
  }

  onReload(): void {
    this.onModelChange({ title: '' });
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}
