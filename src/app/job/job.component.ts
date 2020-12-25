import { Component, OnInit } from '@angular/core';
import { Service } from '../service/api.service';
import { map, pick } from 'lodash';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  nodes: any;
  regions: any;

  constructor(private service: Service) {}

  ngOnInit(): void {
    this.getNodes();
  }

  getNodes() {
    this.service.getNodes().subscribe((nodes) => {
      this.nodes = nodes;
      this.regions = map(this.nodes, 'region');
      console.log(nodes);
      console.log(this.regions);
    });
  }
}
