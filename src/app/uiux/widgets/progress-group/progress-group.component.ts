import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-group',
  templateUrl: './progress-group.component.html',
  styleUrls: ['./progress-group.component.scss'],
})
export class ProgressGroupComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
