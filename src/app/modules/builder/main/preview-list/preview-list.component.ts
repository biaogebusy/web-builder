import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import { ScreenService } from '@core/service/screen.service';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-preview-list',
  templateUrl: './preview-list.component.html',
  styleUrls: ['./preview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewListComponent implements OnInit {
  constructor(
    private builder: BuilderState,
    private screenService: ScreenService,
    @Inject(BUILDER_CURRENT_PAGE) public currentPage$: Observable<IPage>
  ) {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>): void {
    this.builder.onDrop(event);
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  onClickSidebar(i: number, item: any): void {
    this.screenService.scrollToAnchor(`item-${i}`);
  }
}
