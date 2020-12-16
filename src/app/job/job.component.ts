import { Component, OnInit } from '@angular/core';
import { Service } from '../service/api.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  nodes: any;

  constructor(private service: Service) {}

  ngOnInit(): void {
    this.getNodes();
  }

  getNodes() {
    this.service.getNodes().subscribe((nodes) => {
      console.log(nodes);
      this.nodes = nodes;
    });
  }
}
