import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ILayoutBuilder } from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { ENABLE_BUILDER_TOOLBAR } from '@core/token/token-providers';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-layout-builder',
  templateUrl: './layout-builder.component.html',
  styleUrls: ['./layout-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutBuilderComponent implements OnInit, OnDestroy {
  @Input() content: ILayoutBuilder;
  @Input() pageIndex: number;
  @Input() uuid: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private builder: BuilderState,
    @Inject(ENABLE_BUILDER_TOOLBAR) public enable_toolbar$: Observable<boolean>
  ) {}

  ngOnInit(): void {
    this.builder.builderLayoutSetting$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        const { index, row, uuid } = value;
        if (uuid === this.uuid) {
          const { elements } = this.content;
          elements[index].row = row;
          this.builder.updateComponent(this.pageIndex, this.content);
          this.cd.detectChanges();
        }
      });
  }

  addBlock(row: string, index: number, content: any): void {
    this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        inputData: {
          content: {
            type: 'popup-select',
            row,
            index,
            pageIndex: this.pageIndex,
            uuid: this.uuid,
            content,
          },
        },
      },
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.cd.detectChanges();
    });
  }

  onMove(de: string, i: number, index: number): void {
    const { elements } = this.content;
    if (de === 'up') {
      [elements[i].elements[index - 1], elements[i].elements[index]] = [
        elements[i].elements[index],
        elements[i].elements[index - 1],
      ];
    } else {
      [elements[i].elements[index], elements[i].elements[index + 1]] = [
        elements[i].elements[index + 1],
        elements[i].elements[index],
      ];
    }
    this.builder.updateComponent(this.pageIndex, this.content);
    this.cd.detectChanges();
  }

  onDeleteCol(i: number, index: number): void {
    const { elements } = this.content;
    elements[i].elements.splice(index, 1);
    this.builder.updateComponent(this.pageIndex, this.content);
    this.cd.detectChanges();
  }

  onDeleteRow(index: number): void {
    const { elements } = this.content;
    elements.splice(index, 1);
    this.builder.updateComponent(this.pageIndex, this.content);
    this.cd.detectChanges();
  }

  onAlign(i: number, align: string): void {
    const { elements } = this.content;
    elements[i].align = align;
    this.builder.updateComponent(this.pageIndex, this.content);
    this.cd.detectChanges();
  }

  onSettings(i: number, layout: any): void {
    this.uuid = Date.now().toString();
    this.builder.builderRightContent$.next({
      mode: 'push',
      hasBackdrop: false,
      style: {
        width: '260px',
      },
      elements: [
        {
          type: 'layout-setting',
          index: i,
          layout,
          uuid: this.uuid,
        },
      ],
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
