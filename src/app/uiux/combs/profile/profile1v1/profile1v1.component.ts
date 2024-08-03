import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Inject,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import type { IImg } from '@core/interface/widgets/IImg';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
import type { IComment } from '@core/interface/node/INode';
import type { IProfile1v1 } from '@core/interface/combs/IProfile';
import { Observable } from 'rxjs';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { ContentState } from '@core/state/ContentState';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-1v1',
  templateUrl: './profile1v1.component.html',
  styleUrls: ['./profile1v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile1v1Component implements OnInit, AfterViewInit {
  @Input() content: IProfile1v1;
  comments: IComment[];
  avatar: IImg;
  user: IUser;

  cd = inject(ChangeDetectorRef);
  screenService = inject(ScreenService);
  nodeService = inject(NodeService);
  contentState = inject(ContentState);
  private destroyRef = inject(DestroyRef);
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(USER) public user$: Observable<IUser>,
  ) {
    this.user$.pipe(takeUntilDestroyed()).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    if (!this.content?.avatar?.src) {
      this.avatar = {
        src: this.coreConfig.defaultAvatar,
        alt: 'default avatar',
        width: 80,
        height: 80,
      };
    } else {
      this.avatar = this.content.avatar;
    }
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.contentState.commentChange$
        .pipe(takeUntilDestroyed(this.destroyRef))
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
    this.nodeService
      .getCustomApiComment(uuid, timeStamp, this.user.csrf_token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.comments = res;
        this.cd.detectChanges();
      });
  }
}
