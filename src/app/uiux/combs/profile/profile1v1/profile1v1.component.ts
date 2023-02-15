import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import type { IImg } from '@core/interface/widgets/IImg';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { IUser } from '@core/interface/IUser';
import { IComment } from '@core/interface/node/INode';
import { Observable, Subject } from 'rxjs';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { takeUntil } from 'rxjs/operators';
import { ContentState } from '@core/state/ContentState';

@Component({
  selector: 'app-profile-1v1',
  templateUrl: './profile1v1.component.html',
  styleUrls: ['./profile1v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile1v1Component implements OnInit, AfterViewInit {
  @Input() content: any;
  comments$: Observable<IComment[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  avatar: IImg;
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(USER) public user: IUser,
    private cd: ChangeDetectorRef,
    private screenService: ScreenService,
    public nodeService: NodeService,
    public contentState: ContentState
  ) {}

  ngOnInit(): void {
    if (!this.content?.avatar?.src) {
      this.avatar = {
        src: this.coreConfig.defaultAvatar,
        alt: 'default avatar',
      };
    } else {
      this.avatar = this.content.avatar;
    }
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
    if (!uuid) {
      return;
    }
    this.comments$ = this.nodeService.getCustomApiComment(
      uuid,
      timeStamp,
      this.user.csrf_token
    );
    this.cd.detectChanges();
  }
}
