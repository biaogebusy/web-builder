import { Component, forwardRef, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { IDialog } from '@core/interface/IDialog';
import { NgPipesModule } from 'ngx-pipes';
import { BtnComponent } from '../btn/btn.component';
import { DynamicComponentComponent } from '../builder/dynamic-component/dynamic-component.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    NgPipesModule,
    BtnComponent,
    forwardRef(() => DynamicComponentComponent),
  ],
})
export class DialogComponent {
  public data = inject<IDialog>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef);


  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
