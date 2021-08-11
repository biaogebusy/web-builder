import { Component, OnInit } from '@angular/core';
import { UserState } from 'src/app/mobx/user/UserState';
import { MatDialog } from '@angular/material/dialog';
import { UtilitiesService } from 'src/app/service/utilities.service';
import { ScreenState } from '../../../../mobx/screen/ScreenState';
import { DialogComponent } from 'src/app/uiux/widgets/dialog/dialog.component';
import { DynamicFormComponent } from 'src/app/uiux/combs/other/dynamic-form/dynamic-form.component';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  dialogRef: any;
  constructor(
    public userState: UserState,
    public utilities: UtilitiesService,
    public screen: ScreenState,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.userState.logout();
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: {
        component: DynamicFormComponent,
        form: {
          content: [
            {
              type: 'input',
              key: 'title',
              label: '标题',
              placeholder: '请输入问题',
              params: {
                required: true,
              },
              errorMes: '问题必填',
            },
            {
              type: 'textarea',
              key: 'body',
              label: '问题描述',
              placeholder: '请输入问题描述（可选）',
            },
          ],
          actions: [
            {
              label: '发布问题',
              color: 'primary',
              params: {
                type: 'question',
                snackMes: '您的问题已经发布！',
              },
            },
          ],
        },
      },
    });
    this.dialogRef.afterClosed().subscribe(() => console.log('dialog after'));
    this.dialogService.dialogState$.subscribe((state) => {
      if (!state) {
        this.dialogRef.close();
      }
    });
  }
}
