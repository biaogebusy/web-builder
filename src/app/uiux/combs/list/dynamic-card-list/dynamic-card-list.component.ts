import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormGroup } from '@angular/forms';
import { isEmpty, omitBy, result } from 'lodash-es';
import { NodeService } from '@core/service/node.service';
import { RouteService } from '@core/service/route.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { FormService } from '@core/service/form.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ScreenService } from '@core/service/screen.service';
import type { IDynamicCardList } from '@core/interface/combs/IList';
import { IPager } from '@core/interface/widgets/IWidgets';

@Component({
  selector: 'app-dynamic-card-list',
  templateUrl: './dynamic-card-list.component.html',
  styleUrls: ['./dynamic-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DynamicCardListComponent extends BaseComponent implements OnInit {
  nodeService = inject(NodeService);
  private router = inject(ActivatedRoute);
  routerService = inject(RouteService);
  private formService = inject(FormService);
  private screenService = inject(ScreenService);
  private cd = inject(ChangeDetectorRef);

  @Input() content: IDynamicCardList;
  keys: string;
  page: number;
  pager: IPager;
  form: UntypedFormGroup;
  filterForm: any[];
  nodes: any[];
  status: any;
  loading = false;

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.router.queryParams.subscribe((query: any) => {
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
        if (this.content.sidebar) {
          this.filterForm = this.initFormValueWithUrlQuery(queryOpt, this.content.sidebar);
          this.initForm(this.filterForm);
        }
        this.nodeSearch(queryOpt);
      });
    }
  }

  initForm(items: any[]): void {
    this.form = this.formService.toFormGroup(items);
    this.form.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(value => {
      const params = Object.assign({ page: 0 }, value);
      this.onSelectChange(params);
    });
  }

  nodeSearch(options: any): void {
    this.loading = true;
    const state = this.getParamsState(this.form?.value, options);
    const params = this.getApiParams(state);
    this.nodeService.fetch(this.getParams(this.content, 'type'), params).subscribe(
      data => {
        this.updateList(data, this.form.value, options);
        this.loading = false;
        this.cd.detectChanges();
      },
      error => {
        this.loading = false;
        this.cd.detectChanges();
      }
    );
  }

  onSelectChange(options: any): void {
    this.page = options.page;
    this.nodeSearch(options);
  }

  onPageChange(page: any): void {
    this.page = page - 1;
    this.nodeSearch({ page: this.page });
  }

  updateList(data: any, formValues: any, options: any): void {
    this.pager = this.handlerPager(data.pager);
    this.cd.detectChanges();
    this.nodes = data.rows.map((item: any) => {
      const link = item.url;
      const title = result(item, this.getValue(this.content, 'fields', 'title'));
      const subTitle = result(item, this.getValue(this.content, 'fields', 'subTitle'));
      const body = result(item, this.getValue(this.content, 'fields', 'body'));
      return {
        link: {
          label: title,
          href: link,
        },
        subTitle,
        classes: this.content.shadow ? '' : 'card-no-shadow',
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link,
          ratios: this.content.ratios || 'media-4-3',
          img: {
            classes: 'object-fit',
            src: item.image,
            alt: title,
          },
        },
        body,
      };
    });
    this.cd.detectChanges();
    this.routerService.updateQueryParams(this.getUrlQuery(formValues, options));
  }
}
