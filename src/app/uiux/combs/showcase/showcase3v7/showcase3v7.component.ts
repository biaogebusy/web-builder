import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-showcase3v7',
  templateUrl: './showcase3v7.component.html',
  styleUrls: ['./showcase3v7.component.scss'],
})
export class Showcase3v7Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
