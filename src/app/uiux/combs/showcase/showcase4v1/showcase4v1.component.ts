import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-showcase4v1',
  templateUrl: './showcase4v1.component.html',
  styleUrls: ['./showcase4v1.component.scss'],
})
export class Showcase4v1Component implements OnInit {
  @Input() content: any;

  constructor() {}

  ngOnInit(): void {}
}
