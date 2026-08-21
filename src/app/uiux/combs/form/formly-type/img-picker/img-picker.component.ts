import {
  Component,
  DestroyRef,
  EnvironmentInjector,
  OnInit,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IDialog } from '@core/interface/IDialog';
import { ManageService } from '@core/service/manage.service';
import { BuilderState } from '@core/state/BuilderState';
import { FieldType, FormlyModule } from '@ngx-formly/core';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-img-picker',
  templateUrl: './img-picker.component.html',
  styleUrls: ['./img-picker.component.scss'],
  imports: [MatButtonModule, MatIconModule, FormlyModule, BtnComponent],
})
export class ImgPickerComponent extends FieldType implements OnInit {
  time: Date;
  dialog = inject(MatDialog);
  builder = inject(BuilderState);
  manageService = inject(ManageService);
  src: string;
  private destroyRef = inject(DestroyRef);
  // The media library dialog resolves route-level tokens (BUILDER_CONFIG / MEDIA_ASSETS)
  // through the injector MatDialog was resolved from. This component does not import
  // MatDialogModule, so in a subtree without it MatDialog is the root instance and the
  // content would be created under the root injector; pass this injector instead.
  private environmentInjector = inject(EnvironmentInjector);
  constructor() {
    super();
  }

  /** Button/card switch to the shadcn style under shadcn-themed forms (formState.uiTheme) */
  get isShadcn(): boolean {
    return this.options.formState?.uiTheme === 'shadcn';
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
      injector: this.environmentInjector,
    });
  }

  remove(): void {
    this.formControl.patchValue('');
  }
}
