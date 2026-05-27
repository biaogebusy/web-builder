import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IDialog } from '@core/interface/IDialog';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

@Component({
  selector: 'app-terms-service',
  templateUrl: './terms-service.component.html',
  styleUrls: ['./terms-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, FormsModule, MatCheckboxModule, SafeHtmlPipe],
})
export class TermsServiceComponent {
  private dialog = inject(MatDialog);

  readonly content = input.required<any>();
  readonly form = input.required<UntypedFormGroup>();
  private dialogRef: any;


  openTermService(params: any): void {
    if (params) {
      const config: IDialog = {
        inputData: {
          content: {
            type: 'text',
            title: {
              label: params?.terms_title,
              style: 'style-v4',
            },
            spacer: 'none',
            body: params?.terms_content || `内容还未发布！`,
          },
        },
      };
      this.dialogRef = this.dialog.open(DialogComponent, {
        width: '600px',
        data: config,
      });
    }
  }

  get isValid(): boolean {
    return this.form().controls[this.content().key].valid;
  }
}
