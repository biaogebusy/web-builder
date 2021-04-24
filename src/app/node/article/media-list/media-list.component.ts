import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss'],
})
export class MediaListComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
