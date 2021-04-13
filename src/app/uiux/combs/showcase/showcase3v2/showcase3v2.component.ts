import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-showcase3v2',
  templateUrl: './showcase3v2.component.html',
  styleUrls: ['./showcase3v2.component.scss']
})
export class Showcase3v2Component implements OnInit {
  @Input() content: any;
  constructor() { }

  ngOnInit(): void {
  }

}
