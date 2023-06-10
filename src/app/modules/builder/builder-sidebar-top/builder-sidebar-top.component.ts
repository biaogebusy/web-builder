import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-builder-sidebar-top',
  templateUrl: './builder-sidebar-top.component.html',
  styleUrls: ['./builder-sidebar-top.component.scss'],
})
export class BuilderSidebarTopComponent implements OnInit {
  @Input() opened: boolean;
  @Input() drawer: any;
  constructor() {}

  ngOnInit(): void {}
}
