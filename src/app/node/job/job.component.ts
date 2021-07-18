import { Component, OnInit } from '@angular/core';
import { NodeService } from '../../service/node.service';
import { IChipList } from './IJob';
import { map } from 'lodash-es';
import { AMapState } from '../../mobx/amap/AMapState';
import { RouteService } from '../../service/route.service';
import { Params, ActivatedRoute } from '@angular/router';
import { AppState } from '../../mobx/AppState';
import { gsap } from 'gsap';
import { ICard } from '../../uiux/widgets/IWidgets';
import { TagsService } from 'src/app/service/tags.service';

const feature = {
  title: {
    label: 'Feature',
    style: 'style-v1',
  },
  spacer: 'lg',
  elements: [
    {
      title: 'Material UI',
      body: 'Material UI 有完善的主题颜色系统，有优秀的性能和用户体验',
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        img: {
          large: '/assets/images/badge.scene.png',
          normal: '/assets/images/badge.scene.png',
        },
      },
    },
    {
      title: 'Flex Layout',
      body: '提供了足够丰富的布局 API，响应式适配各种设备视口尺寸',
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        img: {
          large: '/assets/images/grid-list.scene.png',
          normal: '/assets/images/grid-list.scene.png',
        },
      },
    },
    {
      title: '支持多种颜色主题',
      body: '可切换内建的自定义主题，可自定义符合品牌的颜色主题',
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        img: {
          large: '/assets/images/form-field.scene.png',
          normal: '/assets/images/form-field.scene.png',
        },
      },
    },
    {
      title: '布局',
      body: '通过拖动的方式管理你的页面布局，灵活的创建各种营销着陆页',
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        img: {
          large: '/assets/images/button.scene.png',
          normal: '/assets/images/button.scene.png',
        },
      },
    },
    {
      title: 'AOT + Lazy Loading',
      body: '使用AOT编译和懒加载使你的应用反应更快速',
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        img: {
          large: '/assets/images/menu.scene.png',
          normal: '/assets/images/menu.scene.png',
        },
      },
    },
  ],
};

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  nodes: any[];
  autoList: any[];
  skills: string[];
  selectedSkill: string;
  selectedTitle: string;
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
    private tagsService: TagsService,
    private routerService: RouteService,
    private route: ActivatedRoute
  ) {
    this.nodes = [];
  }

  ngOnInit(): void {
    this.loading = true;
    this.tagsService.setTitle('内推职位列表');
    this.getJobsNodes();
    this.getSkill();
    this.route.queryParamMap.subscribe((res) => {
      this.paramsInit(res);
    });
  }

  paramsInit(params: Params): void {
    this.selectedId = params.params.id;
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

  getSkill(): void {
    const params = ['jsonapi_included=1'].join('&');
    this.nodeService.getTaxonomy('skill', params).subscribe((res) => {
      this.skills = res.data.map((item: any) => {
        return {
          name: item.attributes.name,
        };
      });
    });
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
    this.nodeService.getNodes('job', this.getFilterParams).subscribe((res) => {
      this.updateList(res.data);
    });
  }

  onSkillChange(skill: string): void {
    this.selectedSkill = skill;
    this.nodeService.getNodes('job', this.getFilterParams).subscribe((res) => {
      this.updateList(res.data);
    });
  }

  onSearchJob(title: string): void {
    this.selectedTitle = title;
    this.nodeService.getNodes('job', this.getFilterParams).subscribe((res) => {
      this.updateList(res.data);
    });
  }

  updateList(lists: any): void {
    this.loading = false;
    this.nodes = map(lists, (item) => {
      return {
        nid: item.id,
        title: item.title,
        number: item.number,
        salary: item.salary,
        skill: map(item.skill, (skill) => {
          return { label: skill.name };
        }),
        deadline: item.deadline,
        work_experience: item.work_experience,
        body: item.body.value,
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
          welfare: map(item.company.welfare, (welfare) => {
            return { label: welfare };
          }),
          address: item.company.address.address_line1,
          phone: item.company.phone,
        },
      };
    });
  }
}
