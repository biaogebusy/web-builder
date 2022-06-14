import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
})
export class IframeComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
