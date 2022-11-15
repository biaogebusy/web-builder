import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
import type {
  IAdvert,
  IComment,
  IHeaderMeta,
} from '@core/interface/node/INode';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { ContentState } from '@core/state/ContentState';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertComponent implements OnInit, AfterViewInit {
  @Input() content: IAdvert;
  headerMeta: IHeaderMeta;
  uuid: string;
  comments$: Observable<IComment[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(USER) public user: IUser,
    private screenService: ScreenService,
    public nodeService: NodeService,
    private cd: ChangeDetectorRef,
    public contentState: ContentState
  ) {}

  ngOnInit(): void {
    this.headerMeta = {
      text: {
        spacer: 'md',
        title: {
          label: this.content.title,
          style: 'style-v4',
          classes: 'mat-display-1 m-bottom-0',
        },
      },
      meta: [
        {
          label: '浏览量',
          value: this.content.view,
        },
      ],
    };
  }

  ngAfterViewInit(): void {
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

  getComments(timeStamp = 1): void {
    const uuid = this.content.uuid;
    if (!this.coreConfig?.article?.comment?.enable || !uuid) {
      return;
    }
    this.comments$ = this.nodeService
      .getCustomApiComment(uuid, timeStamp, this.user.csrf_token)
      .pipe(takeUntil(this.destroy$));
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.destroy$?.next) {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
  }
}
