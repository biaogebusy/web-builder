import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  Inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  inject,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TagsService } from '@core/service/tags.service';
import { ScreenState } from '@core/state/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NodeService } from '@core/service/node.service';
import { UserService } from '@core/service/user.service';
import { NodeComponent } from '@uiux/base/node.widget';
import type { IBaseNode, IComment } from '@core/interface/node/INode';
import { ContentState } from '@core/state/ContentState';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import { PAGE_CONTENT } from '@core/token/token-providers';
import type { IArticle, ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { LoginComponent } from 'src/app/modules/user/login/login.component';
import type { IUser } from '@core/interface/IUser';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent
  extends NodeComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() content: IBaseNode;
  currentUserRule: string[];
  comments: IComment[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  dialogRef: MatDialogRef<any>;
  fontSize: number;
  fontForm: UntypedFormGroup;
  htmlBody: any;
  isReqRoles = false;
  canAccess: boolean;

  cd = inject(ChangeDetectorRef);
  dialog = inject(MatDialog);
  router = inject(Router);
  nodeService = inject(NodeService);
  screen = inject(ScreenState);
  screenService = inject(ScreenService);
  tagsService = inject(TagsService);
  userService = inject(UserService);
  contentState = inject(ContentState);
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(PAGE_CONTENT) private pageContent$: Observable<IPage>,
    @Inject(USER) public user: IUser,
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.content.title) {
      this.tagsService.setTitle(this.content.title);
    }

    this.checkAccess();

    this.userService.userSub$.subscribe(() => {
      this.cd.markForCheck();
    });
  }

  checkAccess(): void {
    if (!environment.production) {
      return;
    }
    this.pageContent$.subscribe((page) => {
      const entityId = page.config?.node?.entityId || '';
      this.nodeService
        .checkNodeAccess(this.content.params, entityId, this.user)
        .subscribe((access) => {
          this.canAccess = access.canAccess;
          this.isReqRoles = access.isReqRoles;
          this.cd.detectChanges();
        });
    });
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.tagsService.highlightCode();
    }
    if (this.coreConfig.article?.comment?.enable) {
      if (this.screenService.isPlatformBrowser()) {
        this.contentState.commentChange$
          .pipe(takeUntil(this.destroy$))
          .subscribe((state) => {
            if (state) {
              this.getComments(+new Date());
            }
          });
      }
    }
  }

  getComments(timeStamp = 1): void {
    if (!environment.production) {
      return;
    }
    this.nodeService
      .getCommentsWitchChild(this.content, this.user.csrf_token, timeStamp)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.comments = res;
        this.cd.detectChanges();
      });
  }

  openLogin(): void {
    const returnUrl = window.location.pathname;
    this.router.navigate([], {
      queryParams: { returnUrl },
    });
    this.dialogRef = this.dialog.open(LoginComponent);
    this.dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.checkAccess();
      });
  }

  get articleConfig(): IArticle {
    return this.coreConfig.article;
  }

  get loginConfig(): any {
    return this.articleConfig && this.articleConfig.login;
  }

  get fontSizeConfig(): any {
    return this.articleConfig && this.articleConfig.fontSize;
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
  }
}
