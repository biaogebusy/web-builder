import { Component, OnInit } from '@angular/core';
import { UserState } from 'src/app/mobx/user/UserState';
import { MatDialog } from '@angular/material/dialog';
import { UtilitiesService } from 'src/app/service/utilities.service';
import { ScreenState } from '../../../../mobx/screen/ScreenState';
import { DialogComponent } from 'src/app/uiux/widgets/dialog/dialog.component';

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
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(() => console.log('dialog after'));
  }
}
