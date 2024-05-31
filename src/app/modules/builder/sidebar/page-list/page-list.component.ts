import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  loading = false;
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
    private builderService: BuilderService
  ) {}

  ngOnInit(): void {
    const apiParams = new DrupalJsonApiParams();

    apiParams
      .addPageLimit(10)
      .addInclude(['uid', 'revision_uid', 'group'])
      .addSort('changed', 'DESC')
      .addFilter('status', '1')
      .addCustomParam({ noCache: true });
    this.getContent(apiParams);
  }

  onModelChange(value: any): void {
    this.loading = true;
    const { title } = value;
    const apiParams = new DrupalJsonApiParams();

    apiParams
      .addPageLimit(10)
      .addInclude(['uid', 'revision_uid', 'group'])
      .addSort('changed', 'DESC')
      .addFilter('status', '1')
      .addFilter('title', title, 'CONTAINS')
      .addCustomParam({ noCache: true });

    this.getContent(apiParams);
  }

  getContent(apiParams: DrupalJsonApiParams): void {
    const params = apiParams.getQueryString();
    this.fetchPage(params);
  }

  onPageChange(link: string): void {
    const apiParams = new DrupalJsonApiParams();
    const sq = link.split('?')[1];
    const params = apiParams.initializeWithQueryString(sq).getQueryString();
    this.fetchPage(params);
  }

  fetchPage(params: string): void {
    this.content$ = this.nodeService.fetch('node/landing_page', params).pipe(
      takeUntil(this.destroy$),
      map((res) => {
        this.loading = false;
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
        href: this.nodeService.getNodePath(attributes),
      };
    });
  }

  loadPage(item: any): void {
    this.util.openSnackbar(`正在加载${item.title}`, 'ok');
    this.builder.loading$.next(true);
    this.builderService.loadPage(item.nid);
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
