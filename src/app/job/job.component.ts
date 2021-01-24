import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NodeService } from '../service/node.service';
import { Subject } from 'rxjs';
import { IChipList } from './IJob';
import * as _ from 'lodash';
import * as AMapLoader from '@amap/amap-jsapi-loader';
import { AmapService } from '../service/amap.service';
import { AMapState } from '../mobx/amap/AMapState';
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

  show = false;
  constructor(
    private apiService: ApiService,
    private nodeService: NodeService,
    private amapService: AmapService,
    public amapState: AMapState
  ) {
    this.nodes = [];
  }

  ngOnInit(): void {
    this.getJobsNodes();
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
    this.amapService.load().subscribe((AMap: any) => {
      this.AMap = AMap;
      this.geocoder = new AMap.Geocoder({
        city: this.amapService.city,
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
              this.amapState.position$.next(true);
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

  onSelected(item: any) {
    console.log(item);
  }
}
