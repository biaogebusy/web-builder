import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuilderState } from '@core/state/BuilderState';
import { FieldType } from '@ngx-formly/core';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-img-picker',
  templateUrl: './img-picker.component.html',
  styleUrls: ['./img-picker.component.scss'],
})
export class ImgPickerComponent extends FieldType implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  time: Date;
  constructor(
    private dialog: MatDialog,
    private builder: BuilderState,
  ) {
    super();
  }

  ngOnInit(): void {
    this.builder.selectedMedia$
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ img, time }) => {
        if (this.time && this.time === time) {
          const { src } = img;
          this.dialog.closeAll();
          this.field.props = {
            ...this.field.props,
            ...img,
          };
          this.formControl.patchValue(src);
        }
      });
  }

  openMedias(): void {
    this.time = new Date();
    this.dialog.open(DialogComponent, {
      width: '85vw',
      data: {
        title: '媒体库',
        disableCloseButton: true,
        inputData: {
          content: {
            type: 'manage-media',
            time: this.time,
          },
        },
      },
    });
  }

  remove(): void {
    this.formControl.patchValue('');
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
