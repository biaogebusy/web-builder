import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-showcase1v1',
  templateUrl: './showcase1v1.component.html',
  styleUrls: ['./showcase1v1.component.scss']
})
export class Showcase1v1Component implements OnInit {
  @Input() content: any;
  constructor() { }

  ngOnInit(): void {
  }

}
