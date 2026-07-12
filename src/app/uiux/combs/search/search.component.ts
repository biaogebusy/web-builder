import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
  inject,
  DestroyRef,
  input,
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { omitBy, isEmpty } from 'lodash-es';
import { NodeService } from '@core/service/node.service';
import { RouteService } from '@core/service/route.service';
import { BaseComponent } from '../../base/base.widget';
import { FormService } from '@core/service/form.service';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ScreenService } from '@core/service/screen.service';
import { Subject } from 'rxjs';
import type { ISearch } from '@core/interface/combs/ISearch';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { SearchSidebarComponent } from './search-sidebar/search-sidebar.component';
import { SearchListComponent } from './search-list/search-list.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    SearchHeaderComponent,
    SearchSidebarComponent,
    SearchListComponent,
  ],
})
export class SearchComponent extends BaseComponent implements OnInit {
  readonly content = input.required<ISearch>();
  private page: number;
  public pager: any;
  public form: UntypedFormGroup = new UntypedFormGroup({});
  public filterForm: any[];
  public nodes: any[];
  public loading = false;
  private valueChange$ = new Subject<any>();
  private searchRequest$ = new Subject<any>();

  private nodeService = inject(NodeService);
  private router = inject(ActivatedRoute);
  private routerService = inject(RouteService);
  private formService = inject(FormService);
  private screenService = inject(ScreenService);
  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.valueChange$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(
          (previous, current) => JSON.stringify(previous) === JSON.stringify(current)
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => this.onSelectChange(value));
    this.searchRequest$
      .pipe(
        tap(() => {
          this.loading = true;
        }),
        switchMap(options => {
          const { api } = this.content();
          const formValue = this.form?.value || {};
          const state = this.getParamsState(formValue, options);
          return this.nodeService.fetch(api, this.getApiParams(state)).pipe(
            tap(data => {
              this.updateList(data, formValue, options);
              this.loading = false;
              this.cd.detectChanges();
            })
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
    if (this.screenService.isPlatformBrowser()) {
      this.router.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((query: any) => {
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
        const content = this.content();
        if (content.sidebar) {
          this.initFilterForm(querys, content.sidebar);
        }
        this.form.patchValue({ ...querys });
        this.nodeSearch(querys);
      });
    } else {
      this.form = new UntypedFormGroup({});
    }
  }

  initFilterForm(querys: any, sidebar: any[]): void {
    this.filterForm = this.initFormValueWithUrlQuery(querys, sidebar);
    this.initForm(this.filterForm);
    this.cd.detectChanges();
  }

  initForm(items: any[]): void {
    this.form = this.formService.toFormGroup(items);
    this.cd.detectChanges();
  }

  onSearch(value: any): void {
    const { keys } = value;
    if (keys) {
      this.form.patchValue({ keys });
    }
    this.valueChange$.next(value);
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
    this.searchRequest$.next(options);
  }

  updateList(data: any, formValues: any, options: any): void {
    const pager = data.pager;
    this.pager = this.handlerPager(pager);
    this.nodes = data.rows;
    this.routerService.updateQueryParams(this.getUrlQuery(formValues, options));
    this.cd.detectChanges();
  }
}
