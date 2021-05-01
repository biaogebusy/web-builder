import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero2v1',
  templateUrl: './hero2v1.component.html',
  styleUrls: ['./hero2v1.component.scss'],
})
export class Hero2v1Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
