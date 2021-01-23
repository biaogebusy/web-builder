import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NodeService } from '../service/node.service';
import { forkJoin, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IJob, IChipList } from './IJob';
import * as _ from 'lodash';
import * as AMapLoader from '@amap/amap-jsapi-loader';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  nodes: any[];
  relation: any;
  included: any;
  positon: object = {};
  regions: any;
  loading: boolean;
  AMap: any;
  geocoder: any;
  city = '0771';

  $position = new Subject();
  show = false;
  constructor(
    private apiService: ApiService,
    private nodeService: NodeService
  ) {
    this.nodes = [];
  }

  ngOnInit(): void {
    this.getJobsNodes();
    this.$position.subscribe((state) => {
      if (state) {
        this.show = true;
      }
    });
  }

  getJobsNodes(): void {
    this.loading = true;
    // 以下参数没有顺序关系
    // fields[{{type}}] type 为该实体类型
    // include 为 relationships 相关资源，支持嵌套如company,company.log
    const params = [
      'fields[node--job]=title,created,changed,body,deadline,number,salary,work_experience,skill,education,company',
      'include=skill,education,company,company.logo',
      'fields[node--company]=title,address,phone,welfare,logo',
      'fields[taxonomy_term--skill]=name',
      'fields[taxonomy_term--education]=name',
      'fields[file--file]=uri',
    ].join('&');

    this.nodeService.getNodes('job', params).subscribe((res) => {
      this.loading = false;
      this.nodes = res.data;
      this.included = res.included;
      if (_.isArray(res.included)) {
        this.relation = _.keyBy(res.included, 'id');
        this.initMap(res.included);
      }
    });
  }

  initMap(included: any): void {
    AMapLoader.load({
      key: '33877188af64f0213ff4fa259b1c14b8',
      version: '1.4.15',
      plugins: ['AMap.Geocoder'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: {
        // 是否加载 AMapUI，缺省不加载
        version: '1.1', // AMapUI 缺省 1.1
        plugins: [], // 需要加载的 AMapUI ui插件
      },
      Loca: {
        // 是否加载 Loca， 缺省不加载
        version: '2.0', // Loca 版本，缺省 1.3.2
      },
    }).then((AMap: any) => {
      this.AMap = AMap;

      this.geocoder = new AMap.Geocoder({
        city: this.city,
      });
      this.getPosition(included);
    });
  }

  getPosition(included: any): void {
    const companys = included.filter((item: any) => {
      return item.type === 'node--company';
    });
    if (companys.length > 0) {
      companys.forEach((item: any, index: number) => {
        const address = item.attributes.address.address_line1;
        this.geocoder.getLocation(address, (status: any, result: any) => {
          if (status === 'complete' && result.info === 'OK') {
            const location = result.geocodes[0].location;
            this.relation[item.id].position = [location.lng, location.lat];
            if (companys.length === index + 1) {
              this.$position.next(true);
            }
          }
        });
      });
    }
  }

  regionFilter(event: any): void {
    if (event === 'all') {
      this.getJobsNodes();
    }
    this.apiService.nodeFilterByRegion(event).subscribe((nodes) => {
      this.nodes = [];
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
}
