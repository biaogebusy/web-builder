import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spacer',
  templateUrl: './spacer.component.html',
  styleUrls: ['./spacer.component.scss'],
})
export class SpacerComponent implements OnInit {
  @Input() size: any;
  constructor() {}

  ngOnInit(): void {}
}
