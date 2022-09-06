import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { ILink } from '@core/interface/widgets/ILink';
import { RouteService } from '@core/service/route.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { LoopWidgetsComponent } from '@uiux/widgets/loop-widgets/loop-widgets.component';
import { DialogService } from '@core/service/dialog.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { UserState } from '@core/mobx/user/UserState';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent extends BaseComponent implements OnInit {
  @Input() content: ILink;
  classes: any;
  href: string;
  dialogRef: MatDialogRef<any>;
  constructor(
    public routeService: RouteService,
    private util: UtilitiesService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    public userState: UserState
  ) {
    super(userState);
  }

  ngOnInit(): void {
    if (!this.content) {
      return;
    }
    this.getClasses();
  }

  isAbsolute(href: string): boolean {
    return this.routeService.isAbsolute(href);
  }

  nav(event: MouseEvent): any {
    if (this.content.dialog) {
      event.preventDefault();
      event.stopPropagation();
      this.openDialog(this.content.dialog);
      return false;
    }
  }

  openDialog(dialog: any): void {
    const options = {
      width: dialog.width || '800px',
    };
    const config = Object.assign(this.content.dialog?.params || {}, options);
    this.dialogRef = this.dialog.open(DialogComponent, {
      ...config,
      data: {
        renderInputComponent: LoopWidgetsComponent,
        inputData: {
          content: dialog.data,
        },
      },
    });
    if (dialog?.afterClosed) {
      this.dialogRef.afterClosed().subscribe(() => {
        const after = dialog.afterClosed;
        if (after?.success) {
          this.util.openSnackbar(after?.success?.label, 'Ok');
        }
        if (after?.emit) {
          this.dialogService.closeDialog();
        }
      });
    }
    this.handlerIframe();
  }

  handlerIframe(): void {
    window.addEventListener(
      'message',
      (event) => {
        const origin = event.origin;
        if (origin !== window.location.origin) {
          return;
        }
        if (event.data === 'closeDialog') {
          this.dialog.closeAll();
        }
      },
      false
    );
  }

  getClasses(): void {
    const obj: any = {};
    if (this.content.classes) {
      obj[this.content.classes] = true;
    }
    if (this.content.href) {
      const type = this.util.getFileType(this.content.href);
      obj[type] = type || false;
    }
    this.classes = obj;
  }
}
