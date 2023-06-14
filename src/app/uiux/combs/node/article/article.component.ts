import { DOCUMENT } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  Inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TagsService } from '@core/service/tags.service';
import { ScreenState } from '@core/state/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import { FormService } from '@core/service/form.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NodeService } from '@core/service/node.service';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { UserService } from '@core/service/user.service';
import { NodeComponent } from '@uiux/base/node.widget';
import type { IBaseNode, IComment } from '@core/interface/node/INode';
import { ContentState } from '@core/state/ContentState';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import { API_URL, PAGE_CONTENT } from '@core/token/token-providers';
import type { IArticle, ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { LoginComponent } from 'src/app/modules/user/login/login.component';
import type { IUser } from '@core/interface/IUser';

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
  commentForm: FormGroup;
  comments$: Observable<IComment[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  dialogRef: MatDialogRef<any>;
  fontSize: number;
  fontForm: FormGroup;
  htmlBody: any;
  isReqRoles = false;
  canAccess: boolean;
  showNotXs: boolean;

  constructor(
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private formService: FormService,
    private router: Router,
    public nodeService: NodeService,
    public screen: ScreenState,
    private screenService: ScreenService,
    private tagsService: TagsService,
    private userService: UserService,
    public contentState: ContentState,
    @Inject(DOCUMENT) private document: Document,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(API_URL) private apiUrl: string,
    @Inject(PAGE_CONTENT) private pageContent$: Observable<IPage>,
    @Inject(USER) public user: IUser
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.content.title) {
      this.tagsService.setTitle(this.content.title);
    }
    if (this.screenService.isPlatformBrowser()) {
      this.onFontSize();
    }
    this.checkAccess();

    this.userService.userSub$.subscribe(() => {
      this.cd.markForCheck();
    });
  }

  checkAccess(): void {
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

  onFontSize(): void {
    if (this.fontSizeConfig) {
      this.fontForm = this.formService.toFormGroup(this.fontSizeConfig.form);
      this.fontForm.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((size) => {
          this.fontSize = Math.max(10, size.font);
        });
    }
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.tagsService.highlightCode();
      this.screen.mqAlias$().subscribe((mq) => {
        this.showNotXs = mq.includes('gt-xs');
        this.cd.detectChanges();
      });
    }
    if (this.coreConfig.article?.comment?.enable) {
      this.getComments();
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
    this.comments$ = this.nodeService
      .getCommentsWitchChild(this.content, this.user.csrf_token, timeStamp)
      .pipe(takeUntil(this.destroy$));
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
