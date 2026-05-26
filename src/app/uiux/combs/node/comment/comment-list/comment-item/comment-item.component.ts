import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
  forwardRef,
  ChangeDetectionStrategy,
  input
} from '@angular/core';
import type { IBaseNode, IComment } from '@core/interface/node/INode';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { ScreenService } from '@core/service/screen.service';
import { ContentState } from '@core/state/ContentState';
import { TagsService } from '@core/service/tags.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { MediaObjectComponent } from '@uiux/widgets/media/media-object/media-object.component';
import { CommentActionsComponent } from '../../comment-actions/comment-actions.component';
import { CommentFormComponent } from '../../comment-form/comment-form.component';

const COMMENT_GET_PATH = '/api/v1/comment';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
  imports: [
    SafeHtmlPipe,
    MediaObjectComponent,
    CommentActionsComponent,
    CommentFormComponent,
    forwardRef(() => CommentItemComponent),
  ],
})
export class CommentItemComponent implements OnInit, AfterViewInit {
  readonly content = input<IBaseNode>();
  readonly comments = input<IComment[]>();

  currentId: string;
  showComment = true;
  showActions = true;
  currentData: string;
  loading: boolean;
  type: 'reply' | 'update' | 'add';

  cd = inject(ChangeDetectorRef);
  nodeService = inject(NodeService);
  utilitiesService = inject(UtilitiesService);
  screenService = inject(ScreenService);
  contentState = inject(ContentState);
  tagsService = inject(TagsService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.contentState.commentChange$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(state => {
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
    if (this.screenService.isPlatformBrowser()) {
      this.tagsService.highlightCode();
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
    const content = this.content();
    if (content.params) {
      this.loading = true;
      this.nodeService
        .deleteEntity(
          `${COMMENT_GET_PATH}/${content.params.comment.attributes.field_name}`,
          id
        )
        .pipe(takeUntilDestroyed())
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
  }
}
