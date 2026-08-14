import { Component, forwardRef, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
    // 表单对话框（inputData.content.form 约定）：表单无效时显示校验错误并阻止关闭，
    // 避免必填项为空却被静默确认
    const form: unknown = this.data.inputData?.content?.form;
    if (form instanceof FormGroup && form.invalid) {
      form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(true);
  }
}
