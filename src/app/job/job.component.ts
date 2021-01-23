import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NodeService } from '../service/node.service';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IJob, IChipList } from './IJob';
import * as _ from 'lodash';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  nodes: any[];
  relation: object = {};

  regions: any;
  loading: boolean;

  constructor(
    private apiService: ApiService,
    private nodeService: NodeService
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
      if (_.isArray(res.included)) {
        this.relation = _.keyBy(res.included, 'id');
      }
    });
  }

  regionFilter(event: any): void {
    // console.log(event);
    if (event === 'all') {
      this.getJobsNodes();
    }
    this.apiService.nodeFilterByRegion(event).subscribe((nodes) => {
      this.nodes = [];
    });
  }

  getWelfare(lists: string[]): IChipList[] {
    // console.log(lists)
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
