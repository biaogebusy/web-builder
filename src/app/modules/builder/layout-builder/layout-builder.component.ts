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
import type { ILayoutBuilder } from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { ENABLE_BUILDER_TOOLBAR } from '@core/token/token-providers';
import { FormlyFieldConfig } from '@ngx-formly/core';
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
      .subscribe((data) => {
        const { index, value, uuid } = data;
        if (uuid === this.uuid) {
          const { elements } = this.content;
          elements[index].row = value;
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
    let fields: FormlyFieldConfig[] = [];
    let settings: FormlyFieldConfig[] = [
      {
        type: 'slider',
        key: 'xs',
        className: 'width-100',
        templateOptions: {
          label: '移动端',
          min: 1,
          max: 12,
          thumbLabel: true,
        },
      },
      {
        type: 'slider',
        key: 'sm',
        className: 'width-100',
        templateOptions: {
          label: '平板电脑',
          min: 1,
          max: 12,
          thumbLabel: true,
        },
      },
      {
        type: 'slider',
        key: 'md',
        className: 'width-100',
        templateOptions: {
          label: '桌面电脑',
          min: 1,
          max: 12,
          thumbLabel: true,
        },
      },
      {
        type: 'slider',
        key: 'lg',
        className: 'width-100',
        templateOptions: {
          label: '超大桌面',
          min: 1,
          max: 12,
          thumbLabel: true,
        },
      },
    ];

    fields = settings.map((field: any) => {
      return {
        ...field,
        defaultValue: layout.row[field.key],
      };
    });

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
          title: {
            label: '响应式配置',
            style: 'style-v4',
          },
          fields,
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
