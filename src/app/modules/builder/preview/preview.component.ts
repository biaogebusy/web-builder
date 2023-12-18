import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import { BuilderState } from '@core/state/BuilderState';
import { ContentState } from '@core/state/ContentState';
import { LocalStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit, OnDestroy {
  page: IPage;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private contentState: ContentState,
    private storage: LocalStorageService,
    private cd: ChangeDetectorRef,
    public builderState: BuilderState
  ) {}

  ngOnInit(): void {
    this.contentState.pageConfig$.next(this.builderState.currentPage.config);
    this.page = this.builderState.currentPage;
    this.storage
      .observe(this.builderState.versionKey)
      .pipe(takeUntil(this.destroy$))
      .subscribe((page) => {
        this.page = page.find((version: IPage) => version.current === true);
        this.cd.detectChanges();
      });
  }

  trackByFn(index: number): number {
    return index;
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}
