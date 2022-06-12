import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-law-header',
  templateUrl: './law-header.component.html',
  styleUrls: ['./law-header.component.scss'],
})
export class LawHeaderComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
