import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit {
  @Input() content: any;
  @Input() relation: any;
  constructor() {}

  ngOnInit(): void {}
}
