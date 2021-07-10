import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-object',
  templateUrl: './media-object.component.html',
  styleUrls: ['./media-object.component.scss'],
})
export class MediaObjectComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
