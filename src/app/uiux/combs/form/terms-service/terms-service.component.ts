import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IDialog } from '@core/interface/IDialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

@Component({
    selector: 'app-terms-service',
    templateUrl: './terms-service.component.html',
    styleUrls: ['./terms-service.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TermsServiceComponent implements OnInit {
  private dialog = inject(MatDialog);

  @Input() content: any;
  @Input() form: UntypedFormGroup;
  private dialogRef: any;

  ngOnInit(): void {}

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
    return this.form.controls[this.content.key].valid;
  }
}
