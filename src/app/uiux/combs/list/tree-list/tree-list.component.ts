import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isEmpty, omitBy } from 'lodash-es';
import { NodeService } from '@core/service/node.service';
import { RouteService } from '@core/service/route.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { ScreenService } from '@core/service/screen.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { FormService } from '@core/service/form.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeListComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @Input() content: any;
  nodes = [];
  loading = false;
  page: number;
  pager: any;
  formState: any = {};
  form: FormGroup;
  defaultValue: any;

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public nodeService: NodeService,
    private router: ActivatedRoute,
    public routerService: RouteService,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef,
    private formService: FormService,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.content.data) {
        this.transferStoryData(this);
        this.cd.detectChanges();
        return;
      }
      this.router.queryParams
        .pipe(distinctUntilChanged())
        .subscribe((query: any) => {
          this.initForm(
            this.initFormValueWithUrlQuery(query, this.content.tree)
          );
          this.defaultValue = query;
          this.page = query.page || 0;
          const queryOpt = omitBy(
            Object.assign(
              {
                page: this.page,
              },
              query
            ),
            isEmpty
          );
          this.nodeSearch(queryOpt);
        });
    }
  }

  initForm(items: any[]): void {
    this.form = this.formService.toFormGroup(items);
    this.form.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.nodeSearch(value);
      });
  }

  nodeSearch(params: any): void {
    this.loading = true;
    this.nodeService
      .search('content', this.getApiParams(params))
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.updateList(data);
          this.routerService.updateQueryParams(
            this.getUrlQuery(this.form.value)
          );
          this.loading = false;
          this.cd.detectChanges();
        },
        () => {
          this.loading = false;
          this.cd.detectChanges();
        }
      );
    this.cd.detectChanges();
  }

  updateList(data: any): void {
    const pager = data.pager;
    this.pager = this.handlerPager(pager);
    this.nodes = data.rows.map((item: any) => {
      return {
        link: {
          label: item.title,
          href: item.url,
          target: '_blank',
        },
        created: item.created,
        body: item.body,
        user: item.user,
        type: item.type || '',
        category: item?.category,
        tags: item?.field_tags,
        actions: item.actions || [],
        img: {
          src: item?.img || this.coreConfig.defaultThumb,
          alt: item?.title,
          href: item?.url,
          target: '_blank',
          classes: 'object-fit',
        },
      };
    });
    this.cd.detectChanges();
  }

  onPageChange(page: any): void {
    this.formState = Object.assign(this.formState, { page });
    this.nodeSearch(this.formState);
  }

  onSelectChange(event: any): void {
    const option: any = {};
    option[event.key] = event.value;
    option.page = 0;
    this.formState = Object.assign(this.formState, option);
    this.nodeSearch(this.formState);
  }

  onTreeChange(option: any): void {
    this.form.patchValue(option);
  }

  trackByFn(index: number, item: any): number {
    return item.link.href;
  }

  ngOnDestroy(): void {
    if (this.destroy$?.next) {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
  }
}
