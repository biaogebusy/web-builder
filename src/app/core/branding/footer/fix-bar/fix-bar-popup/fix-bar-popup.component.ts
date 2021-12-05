import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fix-bar-popup',
  templateUrl: './fix-bar-popup.component.html',
  styleUrls: ['./fix-bar-popup.component.scss'],
})
export class FixBarPopupComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
