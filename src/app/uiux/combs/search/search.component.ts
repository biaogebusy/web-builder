import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { omitBy, isEmpty } from 'lodash-es';
import { NodeService } from 'src/app/service/node.service';
import { RouteService } from 'src/app/service/route.service';
import { BaseComponent } from '../../base/base.widget';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/service/form.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  searchEntry: any;
  page: number;
  pager: any;
  form: FormGroup;
  filterForm: any[];
  nodes: [];
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
    this.nodeSearchByParams('content', this.form.value, options).subscribe(
      (data) => {
        this.updateList(data, this.form.value, options);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  updateList(data: any, formValues: any, options: any): void {
    this.pager = data.pager;
    console.log(data);
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
        actions: [
          {
            type: 'flag',
            label: '收藏',
            icon: {
              name: 'star',
              inline: true,
            },
            params: {
              type: 'flagging--favorite',
              entity_type: 'node',
              entity_id: '1312',
              relationships: {
                flagged_entity: {
                  type: 'node--article',
                  id: 'cb31d69f-a95e-4c91-97d1-1169f82a10a5',
                },
              },
            },
          },
          {
            type: 'share',
            button: {
              icon: 'share',
              label: '分享',
            },
            params: {
              url: item.url,
            },
          },
        ],
      };
    });
    this.updateUrl(formValues, options);
  }
}
