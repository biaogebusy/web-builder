import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserState } from '@core/mobx/user/UserState';
import { MatDialog } from '@angular/material/dialog';
import { UtilitiesService } from '@core/service/utilities.service';
import { ScreenState } from '../../../../mobx/screen/ScreenState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { DynamicFormComponent } from '@uiux/combs/other/dynamic-form/dynamic-form.component';
import { DialogService } from '@core/service/dialog.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit, OnDestroy {
  @Input() content: any;
  dialogRef: any;

  destroy$: Subject<boolean> = new Subject<boolean>();
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
        renderInputComponent: DynamicFormComponent,
        inputData: {
          content: dialog.content,
          actions: dialog.actions,
        },
      },
    });
    this.dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => console.log('dialog after'));
    this.dialogService.dialogState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        if (!state) {
          this.dialogRef.close();
        }
      });
  }

  get userId(): any {
    return this.userState.currentUser.current_user.uid;
  }

  get userPage(): any[] {
    return [`/user/${this.userId}`];
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
