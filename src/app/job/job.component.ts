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
      nodes.map(node => {
        let obj: any;
        this.getRelationships(node.relationships).subscribe(res => {
          obj = {
            attributes: node.attributes,
            relate: res
          };
          this.nodes.push(obj);
          console.log(this.nodes)
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
}
