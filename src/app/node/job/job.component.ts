import { Component, OnInit } from '@angular/core';
import { NodeService } from '../../service/node.service';
import { IChipList } from './IJob';
import { map } from 'lodash-es';
import { AMapState } from '../../mobx/amap/AMapState';
import { TitleService } from '../../service/title.service';
import { RouteService } from '../../service/route.service';
import { Params, ActivatedRoute } from '@angular/router';
import { AppState } from '../../mobx/AppState';
import { Jsona } from '@qoorp/jsona';
import { gsap } from 'gsap';
import { ICard } from '../../uiux/widgets/IWidgets';

const feature: ICard[] = [
  {
    title: 'Material UI',
    body: 'Material UI 有完善的主题颜色系统，有优秀的性能和用户体验。',
    img: {
      src: '/assets/images/badge.scene.png',
      alt: 'Material UI',
      hostClasses: 'mat-card-image display-block',
    },
  },
  {
    title: 'Flex Layout',
    body: '提供了足够丰富的布局 API，响应式适配各种设备视口尺寸。',
    img: {
      src: '/assets/images/grid-list.scene.png',
      alt: 'Flex Layout',
      hostClasses: 'mat-card-image display-block',
    },
  },
  {
    title: 'Mobx',
    body: 'Mobx 使应用的状态管理变得简单。',
    img: {
      src: '/assets/images/form-field.scene.png',
      alt: 'Mobx',
      hostClasses: 'mat-card-image display-block',
    },
  },
  {
    title: '布局',
    body: '通过拖动的方式管理你的页面布局，灵活的创建各种营销着陆页。',
    img: {
      src: '/assets/images/button.scene.png',
      alt: '布局',
      hostClasses: 'mat-card-image display-block',
    },
  },
  {
    title: '菜单',
    body: '紧凑的菜单面板，引导用户到达页面。',
    img: {
      src: '/assets/images/menu.scene.png',
      alt: '菜单',
      hostClasses: 'mat-card-image display-block',
    },
  },
];
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  nodes: any[];
  autoList: any[];
  regions: any;
  loading: boolean;
  AMap: any;
  geocoder: any;
  selectedId: string;
  selected: any;
  feature = feature;

  show = false;
  constructor(
    private nodeService: NodeService,
    public amapState: AMapState,
    private appState: AppState,
    private titleService: TitleService,
    private routerService: RouteService,
    private route: ActivatedRoute
  ) {
    this.nodes = [];
  }

  ngOnInit(): void {
    this.loading = true;
    this.titleService.setTitle('内推职位列表');
    this.getJobsNodes();
    this.route.queryParamMap.subscribe((res) => {
      this.paramsInit(res);
    });
  }

  paramsInit(params: Params): void {
    this.selectedId = params.params.id;
  }

  get jobParams(): any {
    return [
      'fields[node--job]=drupal_internal__nid,title,created,changed,body,deadline,number,salary,work_experience,skill,education,company',
      'include=skill,education,company,company.logo',
      'fields[node--company]=title,address,phone,welfare,logo',
      'fields[taxonomy_term--skill]=name',
      'fields[taxonomy_term--education]=name',
      'fields[file--file]=uri',
      'jsonapi_include=1',
    ];
  }

  getJobsNodes(): void {
    // 以下参数没有顺序关系
    // fields[{{type}}] type 为该实体类型
    // include 为 relationships 相关资源，支持嵌套如company,company.log
    const params = this.jobParams.join('&');

    this.nodeService.getNodes('job', params).subscribe((res) => {
      this.updateList(res.data);
    });
  }

  getWelfare(lists: string[]): IChipList[] {
    return lists
      .map((list) => {
        return {
          color: 'primary',
          label: list,
        };
      })
      .slice(0, 4);
  }

  onSelected(obj: any): void {
    this.selected = obj.item;
    this.selectedId = obj.item.nid;
    this.amapState.markers$.next(obj);
    this.moveBox('20px');
    const query: Params = { id: this.selectedId };
    this.routerService.updateQueryParams(query);
  }

  onScroll(event: boolean): void {
    this.moveBox('-530px');
  }

  moveBox(x: string): void {
    const t1 = gsap.timeline();
    t1.to('.job-details', {
      duration: 1.5,
      left: x,
      ease: 'power3.out',
    });
  }

  onSearch(key: string): void {
    this.nodeService.searchByKey(key).subscribe((res) => {
      this.autoList = res;
    });
  }

  onClear(): void {
    this.getJobsNodes();
  }

  onSearchJob(key: string): void {
    const params = this.jobParams.push(`filter[title]=${key}`).join('&');
    this.nodeService.getNodes('job', params).subscribe((res) => {
      this.updateList(res.data);
    });
  }

  jsonFormatter(res: any): any {
    const jsonFormatter = new Jsona();
    return jsonFormatter.deserialize(res);
  }

  updateList(lists: any): void {
    this.loading = false;
    this.nodes = map(lists, (item) => {
      return {
        nid: item.id,
        title: item.title,
        number: item.number,
        salary: item.salary,
        skill: map(item.skill, (item) => {
          return { label: item.name };
        }),
        deadline: item.deadline,
        work_experience: item.work_experience,
        body: item.body.value,
        company: {
          id: item.company.id,
          logo: {
            src: item.company.logo.uri.url,
            alt: item.company.title,
          },
          title: item.company.title,
          welfare: map(item.company.welfare, (item) => {
            return { label: item };
          }),
          address: item.company.address.address_line1,
          phone: item.company.phone,
        },
      };
    });
  }
}
