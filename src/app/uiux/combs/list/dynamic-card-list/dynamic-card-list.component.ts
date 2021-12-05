import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { isEmpty, omitBy, result } from 'lodash-es';
import { NodeService } from '@core/service/node.service';
import { RouteService } from '@core/service/route.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { FormService } from '@core/service/form.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-dynamic-card-list',
  templateUrl: './dynamic-card-list.component.html',
  styleUrls: ['./dynamic-card-list.component.scss'],
})
export class DynamicCardListComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  keys: string;
  page: number;
  pager: any;
  form: FormGroup;
  filterForm: any[];
  nodes: any[];
  status: any;
  loading = false;

  constructor(
    public nodeService: NodeService,
    private router: ActivatedRoute,
    public routerService: RouteService,
    private formService: FormService
  ) {
    super(nodeService, routerService);
  }

  ngOnInit(): void {
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
        this.filterForm = this.initFormValueWithUrlQuery(
          queryOpt,
          this.content.sidebar
        );
        this.initForm(this.filterForm);
      }
      this.nodeSearch(queryOpt);
    });
  }

  initForm(items: any[]): void {
    this.form = this.formService.toFormGroup(items);
    this.form.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        const params = Object.assign({ page: 0 }, value);
        this.onSelectChange(params);
      });
  }

  nodeSearch(options: any): void {
    this.loading = true;
    this.nodeSearchByParams(
      this.getParams(this.content, 'type'),
      this.form.value,
      options
    ).subscribe(
      (data) => {
        this.updateList(data, this.form.value, options);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
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
    this.pager = data.pager;
    this.nodes = data.rows.map((item: any) => {
      const link = item.url;
      const title = result(
        item,
        this.getValue(this.content, 'fields', 'title')
      );
      const subTitle = result(
        item,
        this.getValue(this.content, 'fields', 'subTitle')
      );
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
    this.updateUrl(formValues, options);
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}
