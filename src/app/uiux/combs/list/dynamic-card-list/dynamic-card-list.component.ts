import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isEmpty, omitBy, result } from 'lodash-es';
import { NodeService } from 'src/app/service/node.service';
import { RouteService } from 'src/app/service/route.service';
import { BaseComponent } from 'src/app/uiux/base/base.widget';

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
  formValues: {};
  filterForm: any[];
  nodes: any[];
  status: any;
  loading = false;

  constructor(
    public nodeService: NodeService,
    private router: ActivatedRoute,
    public routerService: RouteService
  ) {
    super(nodeService, routerService);
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe((query: any) => {
      this.keys = query.keys || '';
      this.page = query.page || 0;
      const queryOpt = omitBy(
        Object.assign(
          {
            keys: this.keys,
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
      }
      this.nodeSearch(queryOpt);
    });
  }

  nodeSearch(options: any): void {
    this.loading = true;
    this.nodeSearchByParams(
      this.getParams(this.content, 'type'),
      this.formValues,
      options
    ).subscribe(
      (data) => {
        this.updateList(data, this.formValues, options);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  onSelectChange(options: any): void {
    this.keys = options.keys;
    this.page = options.page;
    this.formValues = options;
    this.nodeSearch(options);
  }

  onPageChange(page: any): void {
    this.page = page - 1;
    this.nodeSearch({ page: this.page });
  }

  updateList(data: any, formValues: any, options: any): void {
    console.log(data);

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
}
