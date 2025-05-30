import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { IDialog } from '@core/interface/IDialog';
import { ManageService } from '@core/service/manage.service';
import { BuilderState } from '@core/state/BuilderState';
import { FieldType } from '@ngx-formly/core';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

@Component({
  selector: 'app-img-picker',
  templateUrl: './img-picker.component.html',
  styleUrls: ['./img-picker.component.scss'],
  standalone: false,
})
export class ImgPickerComponent extends FieldType implements OnInit {
  time: Date;
  dialog = inject(MatDialog);
  builder = inject(BuilderState);
  manageService = inject(ManageService);
  src: string;
  private destroyRef = inject(DestroyRef);
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.src = this.formControl.value;
    this.builder.selectedMedia$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ img, time }) => {
        if (this.time && this.time === time) {
          const { src, uuid } = img;
          this.src = src;
          this.dialog.closeAll();
          this.field.props = {
            ...this.field.props,
            ...img,
          };
          if (this.field.props.valueIsUUID) {
            this.formControl.patchValue(uuid);
          } else {
            this.formControl.patchValue(src);
          }
        }
      });
  }

  openMedias(): void {
    this.time = new Date();
    const config: IDialog = {
      disableActions: true,
      inputData: {
        content: {
          type: 'manage-media',
          time: this.time,
          fullWidth: true,
        },
      },
    };
    this.dialog.open(DialogComponent, {
      width: '85vw',
      panelClass: this.manageService.mediaDialogClass,
      id: 'img-picker',
      data: config,
    });
  }

  remove(): void {
    this.formControl.patchValue('');
  }
}
