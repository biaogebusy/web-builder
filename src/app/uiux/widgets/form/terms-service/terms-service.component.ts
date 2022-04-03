import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NodeService } from '@core/service/node.service';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { TextComponent } from '@uiux/widgets/text/text.component';

@Component({
  selector: 'app-terms-service',
  templateUrl: './terms-service.component.html',
  styleUrls: ['./terms-service.component.scss'],
})
export class TermsServiceComponent implements OnInit {
  @Input() content: any;
  @Input() form: FormGroup;
  dialogRef: any;
  constructor(private nodeService: NodeService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  openTermService(title: string): void {
    console.log(title);
    if (title) {
      const params = [`filter[title]=${title}`].join('&');
      this.nodeService.search('node/page', params).subscribe((page) => {
        console.log(page);
        this.dialogRef = this.dialog.open(DialogComponent, {
          width: '600px',
          data: {
            renderInputComponent: TextComponent,
            inputData: {
              content: {
                title: {
                  label: title,
                  style: 'style-v4',
                },
                spacer: 'none',
                body:
                  page.data[0]?.attributes?.body?.processed ||
                  `内容还未发布，请管理员到后台发布标题为：【${title}】的内容！`,
              },
            },
          },
        });
      });
    }
  }

  get isValid(): boolean {
    return this.form.controls[this.content.key].valid;
  }
}
