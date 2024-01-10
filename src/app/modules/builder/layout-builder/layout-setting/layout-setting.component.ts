import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ILayoutSetting } from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-layout-setting',
  templateUrl: './layout-setting.component.html',
  styleUrls: ['./layout-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutSettingComponent implements OnInit, OnDestroy {
  @Input() content: ILayoutSetting;
  form = new FormGroup({});
  model: any = {};
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private builder: BuilderState, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.builder.selectedMedia$
      .pipe(takeUntil(this.destroy$))
      .subscribe((img: any) => {
        const { src, fileName } = img;
        this.dialog.closeAll();
        this.builder.builderLayoutSetting$.next({
          value: {
            bg: {
              classes: 'bg-fill-width',
              img: {
                src,
                alt: fileName,
                classes: 'object-fit',
              },
            },
          },
          index: this.content.index,
          uuid: this.content.uuid,
        });
      });
  }

  onModelChange(value: any) {
    this.builder.builderLayoutSetting$.next({
      value,
      index: this.content.index,
      uuid: this.content.uuid,
    });
  }

  openMedias(): void {
    this.dialog.open(DialogComponent, {
      width: '100%',
      data: {
        title: '媒体库',
        inputData: {
          content: {
            type: 'manage-media',
          },
        },
      },
    });
  }

  showCode(): void {
    this.dialog.open(DialogComponent, {
      width: '1000px',
      data: {
        inputData: {
          content: {
            type: 'jsoneditor',
            index: this.content.index,
            isPreview: true,
            data: this.content.content,
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
