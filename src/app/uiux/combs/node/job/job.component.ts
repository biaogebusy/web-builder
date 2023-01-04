import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { map } from 'lodash-es';
import { RouteService } from '@core/service/route.service';
import { Params, ActivatedRoute } from '@angular/router';
import { TagsService } from '@core/service/tags.service';
import { ScreenService } from '@core/service/screen.service';
import { AmapService } from '@core/service/amap.service';
import { IMap } from '@core/interface/IAmap';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobComponent implements OnInit {
  @Input() content: any;
  nodes: IMap = {
    elements: [],
  };
  autoList: any[];
  skills: string[];
  selectedSkill: string;
  selectedTitle: string;
  loading: boolean;
  AMap: any;
  geocoder: any;
  selectedId: string;
  selected: any;

  show = false;
  constructor(
    private nodeService: NodeService,
    private amapService: AmapService,
    private tagsService: TagsService,
    private routerService: RouteService,
    private route: ActivatedRoute,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tagsService.setTitle('内推职位列表');
    if (this.screenService.isPlatformBrowser()) {
      this.loading = true;
      this.getJobsNodes();
      this.getSkill();
      this.route.queryParamMap.subscribe((res) => {
        this.paramsInit(res);
      });
      this.cd.detectChanges();
    }
  }

  paramsInit(params: Params): void {
    this.selectedId = params.params.id;
    this.cd.detectChanges();
  }

  jobParams(params = ''): any {
    return [
      'fields[node--job]=drupal_internal__nid,title,created,changed,body,deadline,number,salary,work_experience,skill,education,company',
      'include=skill,education,company,company.logo',
      'fields[node--company]=title,address,phone,welfare,logo',
      'fields[taxonomy_term--skill]=name',
      'fields[taxonomy_term--education]=name',
      'fields[file--file]=uri',
      `${params}`,
      'sort=-deadline',
      'jsonapi_include=1',
    ].join('&');
  }

  getJobsNodes(): void {
    // 以下参数没有顺序关系
    // fields[{{type}}] type 为该实体类型
    // include 为 relationships 相关资源，支持嵌套如company,company.log
    const params = this.jobParams();
    const path = this.nodeService.apiUrlConfig.nodeGetPath;
    this.nodeService.getNodes(path, 'job', params).subscribe((res) => {
      this.updateList(res.data);
    });
  }

  get nodePath(): string {
    return this.nodeService.apiUrlConfig.taxonomyGetPath;
  }

  getSkill(): void {
    const params = ['jsonapi_included=1'].join('&');

    this.nodeService
      .getNodes(this.nodePath, 'skill', params)
      .subscribe((res) => {
        this.skills = res.data.map((item: any) => {
          return {
            name: item.attributes.name,
          };
        });
        this.cd.detectChanges();
      });
  }

  onSelected(obj: any): void {
    this.selected = obj.item;
    this.selectedId = obj.item.nid;
    this.amapService.markers$.next(obj);
    const query: Params = { id: this.selectedId };
    this.routerService.updateQueryParams(query);
    this.cd.detectChanges();
  }

  onScroll(): void {
    this.moveBox(false);
  }

  moveBox(show: boolean): void {
    this.selected = show;
    this.cd.detectChanges();
  }

  onSearch(key: string): void {
    this.nodeService.searchByKey(key).subscribe((res) => {
      this.autoList = res;
      this.cd.detectChanges();
    });
  }

  get getFilterParams(): any {
    const options = [];
    if (this.selectedTitle) {
      options.push(`filter[title]=${this.selectedTitle}`);
    }
    if (this.selectedSkill && this.selectedSkill !== 'all') {
      options.push(`filter[skill.name]=${this.selectedSkill}`);
    }
    return this.jobParams(options.join('&'));
  }

  onClear(): void {
    this.selectedTitle = '';
    this.nodeService
      .getNodes(this.nodePath, 'job', this.getFilterParams)
      .subscribe((res) => {
        this.updateList(res.data);
      });
    this.cd.detectChanges();
  }

  onSkillChange(skill: string): void {
    this.selectedSkill = skill;
    this.nodeService.getNodes('job', this.getFilterParams).subscribe((res) => {
      this.updateList(res.data);
    });
    this.cd.detectChanges();
  }

  onSearchJob(title: string): void {
    this.selectedTitle = title;
    this.nodeService
      .getNodes(this.nodePath, 'job', this.getFilterParams)
      .subscribe((res) => {
        this.updateList(res.data);
      });
    this.cd.detectChanges();
  }

  updateList(lists: any): void {
    this.loading = false;
    this.nodes.elements = map(lists, (item) => {
      return {
        nid: item.id,
        title: item.title,
        number: item.number,
        salary: item.salary,
        skill: {
          elements: map(item.skill, (skill) => {
            return { label: skill.name };
          }),
        },
        deadline: item.deadline,
        work_experience: item.work_experience,
        body: item.body.value,
        params: {
          address: item.company.address.address_line1,
          title: item.company.title,
        },
        company: {
          id: item.company.id,
          logo: {
            src: item.company.logo.uri.url,
            alt: item.company.title,
            style: {
              height: '80px',
              width: '80px',
            },
          },
          title: item.company.title,
          welfare: {
            elements: map(item.company.welfare, (welfare) => {
              return { label: welfare, selected: true };
            }),
          },
          address: item.company.address.address_line1,
          phone: item.company.phone,
        },
      };
    });
    this.cd.detectChanges();
  }
}
