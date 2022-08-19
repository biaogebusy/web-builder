import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import type { ICommentContent } from '@core/interface/node/INode';
import { UserState } from '@core/mobx/user/UserState';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScreenService } from '@core/service/screen.service';
import { ContentState } from '@core/mobx/ContentState';
import { CORE_CONFIG } from '@core/token/core.config';
import type { ICoreConfig } from '@core/mobx/IAppConfig';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit, OnDestroy {
  @Input() content: any;
  @Input() comments: ICommentContent[];

  destroy$: Subject<boolean> = new Subject<boolean>();
  currentId: string;
  showComment = true;
  showActions = true;
  currentData: string;
  loading: boolean;
  type: 'reply' | 'update' | 'add';
  constructor(
    public userState: UserState,
    private cd: ChangeDetectorRef,
    private nodeService: NodeService,
    private utilitiesService: UtilitiesService,
    private screenService: ScreenService,
    public contentState: ContentState,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
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
        this.userState.csrfToken
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
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
    return index;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
