import { Component, Input, OnInit } from '@angular/core';
import { ICard } from '../IWidgets';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() content: ICard;
  constructor() {}

  ngOnInit(): void {}
}
