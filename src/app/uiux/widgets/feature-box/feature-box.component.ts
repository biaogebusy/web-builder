import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature-box',
  templateUrl: './feature-box.component.html',
  styleUrls: ['./feature-box.component.scss'],
})
export class FeatureBoxComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
