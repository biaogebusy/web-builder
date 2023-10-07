import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import { BuilderState } from '@core/state/BuilderState';
import { LocalStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-preview-list',
  templateUrl: './preview-list.component.html',
  styleUrls: ['./preview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewListComponent implements OnInit, OnDestroy {
  @Input() content: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private builder: BuilderState,
    private screenService: ScreenService,
    private injector: Injector,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const storage = this.injector.get(LocalStorageService);
    storage
      .observe(this.builder.pageKey)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cd.detectChanges();
      });
  }

  drop(event: CdkDragDrop<string[]>): void {
    this.builder.onDrop(event);
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  onClickSidebar(i: number, item: any): void {
    this.screenService.scrollToAnchor(`${item.type || item.content.type}-${i}`);
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}
