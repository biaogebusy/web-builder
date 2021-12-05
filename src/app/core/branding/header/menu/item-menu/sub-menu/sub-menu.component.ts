import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
})
export class SubMenuComponent implements OnInit {
  @Input() content: any;
  @ViewChild('childMenu', { static: true }) public childMenu: any;
  constructor() {}

  ngOnInit(): void {}
}
