import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import type { IBaseNode, IComment } from '@core/interface/node/INode';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScreenService } from '@core/service/screen.service';
import { ContentState } from '@core/state/ContentState';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import scss from 'highlight.js/lib/languages/scss';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() content: IBaseNode;
  @Input() comments: IComment[];

  destroy$: Subject<boolean> = new Subject<boolean>();
  currentId: string;
  showComment = true;
  showActions = true;
  currentData: string;
  loading: boolean;
  type: 'reply' | 'update' | 'add';
  constructor(
    private cd: ChangeDetectorRef,
    private nodeService: NodeService,
    private utilitiesService: UtilitiesService,
    private screenService: ScreenService,
    public contentState: ContentState,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(USER) private user: IUser,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      hljs.registerLanguage('javascript', javascript);
      hljs.registerLanguage('php', php);
      hljs.registerLanguage('scss', scss);
      hljs.registerLanguage('xml', xml);
      hljs.registerLanguage('json', json);
      this.contentState.commentChange$.subscribe((state) => {
        if (state) {
          this.showComment = true;
          this.showActions = true;
          this.currentId = '';
          this.screenService.scrollToAnchor(`q-${this.currentId}`);
          this.cd.detectChanges();
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.document.querySelectorAll('pre').forEach((block) => {
      // then highlight each
      hljs.highlightBlock(block);
    });
  }

  onUpdate(data: any): void {
    this.currentId = data.item.id;
    this.showComment = false;
    this.showActions = false;
    this.screenService.scrollToAnchor(`q-${data.item.id}`);
    this.currentData = data.item.content;
    this.type = 'update';
    this.cd.detectChanges();
  }

  onReply(data: any): void {
    this.currentId = data.item.id;
    this.showComment = true;
    this.showActions = false;
    this.screenService.scrollToAnchor(`q-${data.item.id}`);
    this.currentData = '';
    this.type = 'reply';
    this.cd.detectChanges();
  }

  onShow(item: any): boolean {
    if (item.id !== this.currentId) {
      return true;
    }
    return item.id === this.currentId && this.showComment;
  }

  onCancel(): void {
    this.showComment = true;
    this.showActions = true;
    this.currentId = '';
    this.cd.detectChanges();
  }

  onDelete(id: string): void {
    this.loading = true;
    this.nodeService
      .deleteEntity(
        `${this.coreConfig.apiUrl.commentGetPath}/${this.content.params.comment.attributes.field_name}`,
        id,
        this.user.csrf_token
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.loading = false;
          this.utilitiesService.openSnackbar('您的回答已删除！', '√');
        },
        () => {
          this.loading = false;
          this.utilitiesService.openSnackbar('Please check user state.', '√');
        }
      );
    this.cd.detectChanges();
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
