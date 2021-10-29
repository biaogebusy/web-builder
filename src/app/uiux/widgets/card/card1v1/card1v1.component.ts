import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card1v1',
  templateUrl: './card1v1.component.html',
  styleUrls: ['./card1v1.component.scss'],
})
export class Card1v1Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
