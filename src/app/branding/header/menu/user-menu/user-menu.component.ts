import { Component, Input, OnInit } from '@angular/core';
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
  @Input() content: any;
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

  openDialog(dialog: any): void {
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: {
        component: DynamicFormComponent,
        form: {
          content: dialog.content,
          actions: dialog.actions,
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
