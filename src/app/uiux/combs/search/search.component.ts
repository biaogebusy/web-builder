import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  inject,
  DestroyRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { omitBy, isEmpty } from 'lodash-es';
import { NodeService } from '@core/service/node.service';
import { RouteService } from '@core/service/route.service';
import { BaseComponent } from '../../base/base.widget';
import { UntypedFormGroup } from '@angular/forms';
import { FormService } from '@core/service/form.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ScreenService } from '@core/service/screen.service';
import { Subject } from 'rxjs';
import type { ISearch } from '@core/interface/combs/ISearch';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SearchComponent extends BaseComponent implements OnInit {
  @Input() content: ISearch;
  private page: number;
  public pager: any;
  public form: UntypedFormGroup = new UntypedFormGroup({});
  public filterForm: any[];
  public nodes: any[];
  public loading = false;
  private vauleChange$: Subject<any> = new Subject<any>();

  private nodeService = inject(NodeService);
  private router = inject(ActivatedRoute);
  private routerService = inject(RouteService);
  private formService = inject(FormService);
  private screenService = inject(ScreenService);
  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.content.data) {
        this.initFilterForm({}, this.content.sidebar);
        this.cd.detectChanges();
        return;
      }
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
          this.initFilterForm(querys, this.content.sidebar);
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
    this.vauleChange$
      .pipe(debounceTime(1000), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.onSelectChange(value);
      });
  }

  onSearch(value: any): void {
    const { keys } = value;
    if (keys) {
      this.form.patchValue({ keys });
    }
    this.vauleChange$.next(value);
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
    const { api } = this.content;
    const formValue = this.form?.value || {};
    const state = this.getParamsState(formValue, options);
    const params = this.getApiParams(state);
    this.nodeService
      .fetch(api, params)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.updateList(data, formValue, options);
        this.loading = false;
        this.cd.detectChanges();
      });
  }

  updateList(data: any, formValues: any, options: any): void {
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
        body: item.body.toString(),
        user: item.user,
        type: item.type || '',
        actions: item.actions || [],
      };
    });
    this.routerService.updateQueryParams(this.getUrlQuery(formValues, options));
    this.cd.detectChanges();
  }
}
