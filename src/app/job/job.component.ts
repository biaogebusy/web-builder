import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NodeService } from '../service/node.service';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IJob, IChipList } from './IJob';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  nodes: any[];
  regions: any;
  loading: boolean;

  constructor(
    private apiService: ApiService,
    private nodeService: NodeService,
  ) {
    this.nodes = [];
  }

  ngOnInit(): void {
    this.getJobsNodes();
  }

  getJobsNodes(): void {
    this.loading = true;
    this.nodeService
      .getNodes(this.apiService.jobNodeType)
      .subscribe((nodes) => {
        this.loading = false;
        nodes.forEach((node) => {
          let obj: IJob;
          this.nodeService
            .getRelationships(node.relationships)
            .subscribe((res) => {
              // console.log(res);
              const attr = node.attributes;
              obj = {
                title: attr.title,
                locality: attr.dependent_locality,
                deadline: attr.deadline,
                number: attr.number,
                salary: attr.salary,
                relate: res,
              };
              this.nodes.push(obj);
            });
        });
      });
  }

  regionFilter(event: any): void {
    console.log(event);
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
