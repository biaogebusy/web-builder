import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-showcase3v6',
  templateUrl: './showcase3v6.component.html',
  styleUrls: ['./showcase3v6.component.scss'],
})
export class Showcase3v6Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
