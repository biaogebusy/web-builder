import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-showcase1v3',
  templateUrl: './showcase1v3.component.html',
  styleUrls: ['./showcase1v3.component.scss'],
})
export class Showcase1v3Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
