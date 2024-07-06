import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPage } from '@core/interface/IAppConfig';
import { BuilderState } from '@core/state/BuilderState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { LocalStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-builder-version',
  templateUrl: './builder-version.component.html',
  styleUrls: ['./builder-version.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderVersionComponent implements OnInit, OnDestroy {
  public version: IPage[] | undefined;

  destroy$: Subject<boolean> = new Subject<boolean>();

  dialog = inject(MatDialog);
  cd = inject(ChangeDetectorRef);
  builder = inject(BuilderState);
  storage = inject(LocalStorageService);
  constructor() {}

  ngOnInit(): void {
    this.version = this.storage.retrieve('version');
    this.storage
      .observe('version')
      .pipe(takeUntil(this.destroy$))
      .subscribe((version: IPage[]) => {
        this.version = version;
        this.cd.detectChanges();
      });
  }

  onDelete(index: number): void {
    this.builder.version.splice(index, 1);
    this.builder.version[0].current = true;
    this.builder.closeRightDrawer$.next(true);
    this.builder.saveLocalVersions();
  }

  onDeleteAll(): void {
    this.builder.clearAllVersion();
  }

  onNewPage(): void {
    this.builder.fixedShowcase = false;
    this.builder.showcase$.next(false);
    this.dialog.open(DialogComponent, {
      width: '1200px',
      data: {
        title: '新增页面',
        disableCloseButton: true,
        inputData: {
          content: {
            type: 'builder-template',
          },
        },
      },
    });
  }

  onVersion(page: IPage, index: number): void {
    this.builder.showVersionPage(page, index);
    this.builder.closeRightDrawer$.next(true);
    this.builder.fixedShowcase = false;
    this.builder.showcase$.next(false);
  }

  onClickTitle(event: MouseEvent): any {
    event.stopPropagation();
  }

  onUpdateTitle(event: any, index: number): void {
    const {
      target: { textContent },
    } = event;
    if (textContent) {
      this.builder.version[index].title = textContent;
      this.builder.saveLocalVersions();
    }
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}
