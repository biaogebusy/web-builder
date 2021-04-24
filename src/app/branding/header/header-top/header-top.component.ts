import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss'],
})
export class HeaderTopComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
