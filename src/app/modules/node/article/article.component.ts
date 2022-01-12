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
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import scss from 'highlight.js/lib/languages/scss';
import { TagsService } from '@core/service/tags.service';
import { AppState } from '@core/mobx/AppState';
import { ScreenState } from '@core/mobx/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import { FormService } from '@core/service/form.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserState } from '@core/mobx/user/UserState';
import { StripTagsPipe, ShortenPipe } from 'ngx-pipes';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../../user/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StripTagsPipe, ShortenPipe],
})
export class ArticleComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() content: any;
  currentUserRule: string[];
  commentForm: FormGroup;
  detroy$: Subject<boolean> = new Subject<boolean>();
  dialogRef: MatDialogRef<any>;
  fontSize: number;
  fontForm: FormGroup;
  htmlBody: any;
  isRequestRule: boolean;
  showNotXs: boolean;

  constructor(
    public appState: AppState,
    private cd: ChangeDetectorRef,
    private formService: FormService,
    private tagsService: TagsService,
    public screen: ScreenState,
    private screenService: ScreenService,
    private userState: UserState,
    private stripTagePipe: StripTagsPipe,
    private shortenPipe: ShortenPipe,
    private dialog: MatDialog,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    if (this.screenService.isPlatformBrowser()) {
      hljs.registerLanguage('javascript', javascript);
      hljs.registerLanguage('php', php);
      hljs.registerLanguage('scss', scss);
    }
  }

  ngOnInit(): void {
    if (this.content.title) {
      this.tagsService.setTitle(this.content.title);
    }
    if (this.screenService.isPlatformBrowser()) {
      if (this.fontSizeConfig) {
        this.fontForm = this.formService.toFormGroup(this.fontSizeConfig.form);
        this.fontForm.valueChanges
          .pipe(takeUntil(this.detroy$))
          .subscribe((size) => {
            this.fontSize = Math.max(10, size.font);
          });
      }
      if (this.content.comment) {
        this.commentForm = this.formService.toFormGroup(
          this.content.comment.form
        );
        this.commentForm.valueChanges.subscribe((comment) => {
          console.log(comment);
        });
      }
    }
    if (this.content.params?.require_rule) {
      this.checkUserAuth(this.content.params.require_rule);
    } else {
      this.htmlBody = this.content.body;
    }
  }

  checkUserAuth(reqRules: string[]): void {
    if (!this.userState.anthenticated) {
      this.isRequestRule = false;
    } else {
      this.currentUserRule = this.userState.roles;
      if (this.currentUserRule.includes('administrator')) {
        this.isRequestRule = true;
      } else {
        this.isRequestRule =
          this.currentUserRule.filter((role) => reqRules.includes(role))
            .length > 0;
      }
    }
    if (this.isRequestRule) {
      this.htmlBody = this.content.body;
      return;
    }
    this.htmlBody = this.shortenPipe.transform(
      this.stripTagePipe.transform(this.content.body, 'p'),
      1000,
      '...'
    );
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.document.querySelectorAll('code').forEach((block) => {
        // then highlight each
        hljs.highlightBlock(block);
      });
      this.screen.mqAlias$().subscribe((mq) => {
        this.showNotXs = mq.includes('gt-xs');
        this.cd.detectChanges();
      });
    }
  }

  openLogin(): void {
    const returnUrl = window.location.pathname;
    this.router.navigate([], {
      queryParams: { returnUrl },
    });
    this.dialogRef = this.dialog.open(LoginComponent);
    this.dialogRef
      .afterClosed()
      .pipe(takeUntil(this.detroy$))
      .subscribe(() => {
        this.cd.detectChanges();
      });
  }

  get articleConfig(): any {
    return this.appState.config && this.appState.config.article;
  }

  get loginConfig(): any {
    return this.articleConfig && this.articleConfig.login;
  }

  get fontSizeConfig(): any {
    return this.articleConfig && this.articleConfig.fontSize;
  }

  ngOnDestroy(): void {
    this.detroy$.next(true);
    this.detroy$.complete();
  }
}
