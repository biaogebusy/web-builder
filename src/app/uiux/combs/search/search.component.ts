import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { omitBy, isEmpty } from 'lodash-es';
import { NodeService } from '@core/service/node.service';
import { RouteService } from '@core/service/route.service';
import { BaseComponent } from '../../base/base.widget';
import { FormGroup } from '@angular/forms';
import { FormService } from '@core/service/form.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ScreenService } from '@core/service/screen.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @Input() content: any;
  searchEntry: any;
  page: number;
  pager: any;
  form: FormGroup;
  filterForm: any[];
  nodes: [];
  loading = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public nodeService: NodeService,
    private router: ActivatedRoute,
    public routerService: RouteService,
    private formService: FormService,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.router.queryParams.subscribe((query: any) => {
        this.page = query.page || 0;
        const querys = omitBy(
          Object.assign(
            {
              page: this.page,
            },
            query
          ),
          isEmpty
        );
        if (this.content.sidebar) {
          this.filterForm = this.initFormValueWithUrlQuery(
            querys,
            this.content.sidebar
          );
          this.initForm(this.filterForm);
        }
        this.nodeSearch(querys);
      });
    } else {
      this.form = new FormGroup({});
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
        const params = Object.assign({ page: 0 }, value);
        this.onSelectChange(params);
      });
  }

  onPageChange(page: any): void {
    this.page = page;
    this.nodeSearch({ page: this.page });
  }

  onSelectChange(options: any): void {
    this.page = options.page;
    this.nodeSearch(options);
  }

  nodeSearch(options: any): void {
    this.loading = true;
    this.searchEntry = omitBy(options, isEmpty);
    const type = this.getParams(this.content, 'type') || 'content';
    const state = this.getParamsState(this.form.value, options);
    const params = this.getApiParams(state);
    this.nodeService
      .search(type, params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.updateList(data, this.form.value, options);
          this.loading = false;
          this.cd.detectChanges();
        },
        (error) => {
          this.loading = false;
          this.cd.detectChanges();
        }
      );
  }

  updateList(data: any, formValues: any, options: any): void {
    this.pager = data.pager;
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
        actions: item.actions || [],
      };
    });
    this.routerService.updateQueryParams(this.getUrlQuery(formValues, options));
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
