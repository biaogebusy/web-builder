import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-list-v1',
  templateUrl: './map-list-v1.component.html',
  styleUrls: ['./map-list-v1.component.scss'],
})
export class MapListV1Component implements OnInit {
  @Input() content: any;
  loading: boolean;
  constructor() {}

  ngOnInit(): void {}
}
