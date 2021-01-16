import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NodeService } from '../service/node.service';
import { forkJoin, Observable } from 'rxjs';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  nodes: any[];
  regions: any;

  constructor(
    private apiService: ApiService,
    private nodeService: NodeService,
    private http: HttpClient
  ) {
    this.nodes = [];
  }

  ngOnInit(): void {
    this.getJobsNodes();
  }

  getJobsNodes() {
    this.nodeService.getNodes(this.apiService.jobNodeType).subscribe(nodes => {
      console.log(nodes)
      nodes.forEach(node => {
        let obj: any;
        this.getRelationships(node.relationships).subscribe(res => {
          const attr = node.attributes;
          obj = {
            title: attr.title,
            locality: attr.dependent_locality,
            deadline: attr.deadline,
            number: attr.number,
            salary: attr.salary,
            welfare: this.getWelfare(attr.welfare),
            relate: res
          };
          this.nodes.push(obj);
        });
      });
    });
  }

  getRelationships(relationships: any[]): Observable<any> {
    const obj = _.mapValues(relationships, item => {
      return this.apiService.getApi(item.links.related.href);
    });
    console.log(obj)
    return forkJoin(obj);
  }

  regionFilter(event: any) {
    console.log(event);
    if (event === 'all') {
      this.getJobsNodes();
    }
    this.apiService.nodeFilterByRegion(event).subscribe((nodes) => {
      this.nodes = [];
    });
  }

  getWelfare(lists: string[]): any[]{
    return lists.map(list => {
      return {
        color: 'primary',
        label: list
      };
    });
  }
}
