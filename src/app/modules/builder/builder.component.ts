import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import type { IPage } from '@core/interface/IAppConfig';
import { ContentState } from '@core/state/ContentState';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent implements OnInit {
  @Input() content: IPage;
  constructor(private contentState: ContentState) {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>): void {
    this.contentState.dropComponent(event);
  }
}
