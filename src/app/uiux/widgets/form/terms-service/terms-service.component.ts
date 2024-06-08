import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { TextComponent } from '@uiux/widgets/text/text.component';

@Component({
  selector: 'app-terms-service',
  templateUrl: './terms-service.component.html',
  styleUrls: ['./terms-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsServiceComponent implements OnInit {
  @Input() content: any;
  @Input() form: UntypedFormGroup;
  dialogRef: any;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openTermService(params: any): void {
    console.log(params);
    if (params) {
      this.dialogRef = this.dialog.open(DialogComponent, {
        width: '600px',
        data: {
          renderInputComponent: TextComponent,
          inputData: {
            content: {
              title: {
                label: params?.terms_title,
                style: 'style-v4',
              },
              spacer: 'none',
              body: params?.terms_content || `内容还未发布！`,
            },
          },
        },
      });
    }
  }

  get isValid(): boolean {
    return this.form.controls[this.content.key].valid;
  }
}
