import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss'],
})
export class JobFilterComponent implements OnInit {
  @Input() content: any;

  constructor() {}

  ngOnInit(): void {}
}
