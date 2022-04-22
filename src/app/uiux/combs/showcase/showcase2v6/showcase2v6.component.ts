import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-showcase2v6',
  templateUrl: './showcase2v6.component.html',
  styleUrls: ['./showcase2v6.component.scss'],
})
export class Showcase2v6Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
