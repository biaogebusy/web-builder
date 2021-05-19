import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() content: any;
  @Input() loading: boolean;
  p = 1;

  constructor() {}

  ngOnInit(): void {}
}
