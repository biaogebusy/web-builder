import { Component, OnInit } from '@angular/core';
import { UserState } from 'src/app/mobx/user/UserState';
import { MatDialog } from '@angular/material/dialog';
import { UtilitiesService } from 'src/app/service/utilities.service';
import { ScreenState } from '../../../../mobx/screen/ScreenState';
import { DialogComponent } from 'src/app/uiux/widgets/dialog/dialog.component';
import { DynamicFormComponent } from 'src/app/uiux/combs/other/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  constructor(
    public userState: UserState,
    public utilities: UtilitiesService,
    public screen: ScreenState,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.userState.logout();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px',
      data: {
        title: '发布问题',
        component: DynamicFormComponent,
        form: {
          content: [
            {
              type: 'input',
              controlType: 'textbox',
              key: 'title',
              label: '标题',
              placeholder: '请输入问题',
            },
            {
              type: 'textarea',
              key: 'body',
              label: '问题描述',
              placeholder: '请输入问题描述（可选）',
            },
          ],
        },
      },
    });
    dialogRef.afterClosed().subscribe(() => console.log('dialog after'));
  }
}
