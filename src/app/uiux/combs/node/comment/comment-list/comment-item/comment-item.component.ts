import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import type { IBaseNode, IComment } from '@core/interface/node/INode';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { Observable } from 'rxjs';
import { ScreenService } from '@core/service/screen.service';
import { ContentState } from '@core/state/ContentState';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
import { TagsService } from '@core/service/tags.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
  standalone: false,
})
export class CommentItemComponent implements OnInit, AfterViewInit {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private user$ = inject<Observable<IUser>>(USER);

  @Input() content: IBaseNode;
  @Input() comments: IComment[];

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
  user: IUser;

  constructor() {
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user;
    });
  }

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
    if (this.content.params) {
      this.loading = true;
      this.nodeService
        .deleteEntity(
          `${this.coreConfig.apiUrl.commentGetPath}/${this.content.params.comment.attributes.field_name}`,
          id,
          this.user.csrf_token
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
