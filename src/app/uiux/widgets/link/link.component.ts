import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import type { ILink } from '@core/interface/widgets/ILink';
import type { IPage } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
import { RouteService } from '@core/service/route.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogService } from '@core/service/dialog.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { ContentService } from '@core/service/content.service';
import { ContentState } from '@core/state/ContentState';
import { USER } from '@core/token/token-providers';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

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

  router = inject(Router);
  routeService = inject(RouteService);
  dialogService = inject(DialogService);
  contentService = inject(ContentService);
  contentState = inject(ContentState);
  util = inject(UtilitiesService);
  constructor(
    @Inject(USER) private user: IUser,
    private dialog: MatDialog,
  ) {
    super();
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

  nav(event: any): any {
    if (this.content.dialog) {
      event.preventDefault();
      event.stopPropagation();
      this.openDialog(this.content.dialog);
      return false;
    }

    if (this.content?.rel === 'drawer') {
      this.contentState.drawerOpened$.next(true);
      this.contentState.drawerLoading$.next(true);
      this.contentService
        .loadPageContent(this.content.href)
        .subscribe((content: IPage) => {
          this.contentState.drawerLoading$.next(false);
          this.contentState.drawerContent$.next(content);
        });
      return false;
    }

    if (this.content.href && this.content.href.includes(':id')) {
      if (this.user) {
        const id = this.user.current_user.uid;
        const url = this.content.href.replace(':id', id);
        this.router.navigate([url]);
        return;
      }
    }
    if (this.router.url === '/builder') {
      // builder contenteditable link
      if (event.target && event.target.closest('.component-item')) {
        this.router.navigateByUrl(this.router.url);
      }
    }
  }

  openDialog(dialog: any): void {
    const options = {
      width: dialog?.params?.width || '800px',
    };
    const config = Object.assign(dialog?.params || {}, options);
    this.dialogRef = this.dialog.open(DialogComponent, {
      ...config,
      data: {
        inputData: dialog.data,
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
    this.dialogService.handlerIframe(this.dialog);
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
