import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-node',
  templateUrl: './job-node.component.html',
  styleUrls: ['./job-node.component.scss'],
})
export class JobNodeComponent implements OnInit {
  @Input() content: any;
  @Input() relation: any;
  constructor() {}

  ngOnInit(): void {}
}
