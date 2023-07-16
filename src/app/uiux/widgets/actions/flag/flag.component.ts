import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  Inject,
} from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ScreenService } from '@core/service/screen.service';
import { Subject } from 'rxjs';
import type { IFlag } from '@core/interface/widgets/IFlag';
import { UtilitiesService } from '../../../../core/service/utilities.service';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig, ICoreFlag } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlagComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() content: IFlag;
  config: ICoreFlag;
  flagging = false;

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private cd: ChangeDetectorRef,
    private screenService: ScreenService,
    public nodeService: NodeService,
    private utiltiy: UtilitiesService,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(USER) private user: IUser
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.config = this.coreConfig?.actions?.flag;
      if (this.config?.enable && this.user.authenticated) {
        this.getFlagging();
      }
    }
  }

  get flaggingParams(): any {
    const params = [
      `filter[uid.id]=${this.user.id}`,
      `filter[entity_id]=${this.getDeepValue(
        this.content,
        'params.entity_id'
      )}`,
    ].join('&');
    return params;
  }

  getFlagging(): void {
    if (!environment.production) {
      return;
    }
    this.nodeService
      .getNodes(
        this.coreConfig.apiUrl.flaggingGetPath,
        this.type,
        this.flaggingParams,
        this.user.csrf_token
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res.data.length) {
          this.flagging = true;
          this.cd.detectChanges();
        }
      });
  }

  onFlag(): void {
    if (!this.user.authenticated) {
      this.utiltiy.openSnackbar('请登录，再收藏！', 'x');
      return;
    }
    if (!this.flagging) {
      const data = {
        data: {
          type: this.getParams(this.content, 'type'),
          attributes: {
            entity_type: this.getParams(this.content, 'entity_type'),
            entity_id: this.getParams(this.content, 'entity_id'),
            global: false,
          },
          relationships: {
            flagged_entity: {
              data: {
                type: this.getDeepValue(
                  this.content,
                  'params.relationships.flagged_entity.type'
                ),
                id: this.nodeId,
              },
            },
            uid: {
              data: {
                type: 'user--user',
                id: this.user.id,
              },
            },
          },
        },
      };
      this.nodeService
        .flagging(this.path, JSON.stringify(data), this.user.csrf_token)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.flagging = true;
          this.utiltiy.openSnackbar('已添加收藏！', 'x');
          this.cd.detectChanges();
        });
    } else {
      this.nodeService
        .getNodes(
          this.coreConfig.apiUrl.flaggingGetPath,
          this.type,
          this.flaggingParams
        )
        .pipe(
          switchMap((res) => {
            return this.nodeService.deleteFlagging(
              this.path,
              res.data,
              this.user.csrf_token
            );
          }),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.flagging = false;
          this.utiltiy.openSnackbar('已取消收藏！', 'x');
          this.cd.detectChanges();
        });
    }
  }

  getPath(type: string): string {
    return `/${type.replace('--', '/')}`;
  }

  get nodeId(): string {
    return this.getDeepValue(
      this.content,
      'params.relationships.flagged_entity.id'
    );
  }

  get path(): string {
    return `/api/v1${this.getPath(this.getParams(this.content, 'type'))}`;
  }

  get type(): string {
    return this.getParams(this.content, 'type').split('--')[1];
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
  }
}
