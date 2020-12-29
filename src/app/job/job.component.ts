import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { map, union } from 'lodash';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  nodes: any;
  regions: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getNodes();
  }

  getNodes() {
    this.apiService.getNodes().subscribe((nodes) => {
      this.nodes = nodes;
      this.regions = union(map(this.nodes, 'region'));
      console.log(nodes);
      console.log(this.regions);
    });
  }

  regionFilter(event: any) {
    console.log(event);
    if (event === 'all') {
      this.getNodes();
    }
    this.apiService.nodeFilterByRegion(event).subscribe((nodes) => {
      this.nodes = nodes;
    });
  }
}
