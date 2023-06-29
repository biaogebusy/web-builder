import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-preview-list',
  templateUrl: './preview-list.component.html',
  styleUrls: ['./preview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewListComponent implements OnInit {
  @Input() content: any;
  constructor(
    private builder: BuilderState,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>): void {
    this.builder.onDrop(event);
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  onClickSidebar(i: number, item: any): void {
    // TODO
    return;
    this.screenService.scrollToAnchor(`${item.type || item.content.type}-${i}`);
  }
}
