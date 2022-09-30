import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { UserState } from '@core/mobx/user/UserState';
import { MatDialog } from '@angular/material/dialog';
import { UtilitiesService } from '@core/service/utilities.service';
import { ScreenState } from '@core/mobx/screen/ScreenState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { DynamicFormComponent } from '@uiux/combs/other/dynamic-form/dynamic-form.component';
import { DialogService } from '@core/service/dialog.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IEnvironment } from '@core/interface/IEnvironment';
import { USER } from '@core/token/token-providers';
import { IUser } from '@core/interface/IUser';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent implements OnInit, OnDestroy {
  @Input() content: any[];
  dialogRef: any;
  env: IEnvironment;

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public userState: UserState,
    public utilities: UtilitiesService,
    public screen: ScreenState,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private cd: ChangeDetectorRef,
    @Inject(USER) public user: IUser
  ) {}

  ngOnInit(): void {
    this.env = environment;
    this.userState.userSub$.subscribe((user) => {
      this.cd.markForCheck();
    });
  }

  logout(): void {
    this.userState.logout(this.user.logout_token);
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

  get userPage(): any[] {
    if (environment?.drupalProxy) {
      return ['/my'];
    }
    return [`/me`];
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
