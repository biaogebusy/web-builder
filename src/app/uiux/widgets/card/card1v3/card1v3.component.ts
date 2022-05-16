import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { IMark } from '@core/interface/IAmap';

@Component({
  selector: 'app-card1v3',
  templateUrl: './card1v3.component.html',
  styleUrls: ['./card1v3.component.scss'],
})
export class Card1v3Component implements OnInit {
  @Input() content: any;
  @Output() selected = new EventEmitter();
  selectedId: number;
  constructor() {}

  ngOnInit(): void {}

  onClick(item: any, i: number): void {
    this.selectedId = i;
    this.selected.emit({ item, index: i } as IMark);
  }
}
