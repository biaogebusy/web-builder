import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-text-center',
  templateUrl: './content-text-center.component.html',
  styleUrls: ['./content-text-center.component.scss'],
})
export class ContentTextCenterComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
