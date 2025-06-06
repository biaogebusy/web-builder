import { ChangeDetectorRef, Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import type { IMediaObject } from '@core/interface/widgets/IMediaObject';
import { NodeService } from '@core/service/node.service';
import { DialogService } from '@core/service/dialog.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import type { IUser } from '@core/interface/IUser';
import { USER, CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IUserCard, IUserCount } from '@core/interface/widgets/ICard';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss'],
    standalone: false
})
export class UserCardComponent extends BaseComponent implements OnInit {
  user$ = inject<Observable<IUser>>(USER);
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);

  @Input() content: IUserCard;
  profile: IMediaObject;
  count: IUserCount[];
  user: IUser;

  nodeService = inject(NodeService);
  cd = inject(ChangeDetectorRef);
  dialogService = inject(DialogService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    super();
    this.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.getProfile();
      this.getCount();
    }
  }

  getProfile(): void {
    this.profile = {
      img: {
        src: this.user.picture || this.coreConfig.defaultAvatar,
        alt: this.user.current_user.name,
        style: {
          borderRadius: '50%',
        },
        height: 37,
        width: 37,
      },
      title: this.user.current_user.name,
      subTitle: this.user.display_name,
      align: 'center center',
    };
    this.cd.detectChanges();
  }

  getCount(): void {
    const api = this.getParams(this.content, 'api');
    if (this.content.count) {
      this.count = this.content.count;
      this.cd.detectChanges();
    } else if (api) {
      this.getContentFormApi(api);
      this.handleDialogClosed(api);
    }
  }

  getContentFormApi(api: string): void {
    this.nodeService
      .fetch(api, '')
      .pipe(
        catchError(() => {
          return of({
            rows: [],
          });
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(res => {
        this.count = res.rows.map((item: any) => {
          return {
            digit: {
              value: item.value,
              from: item.from || 0,
              duration: item.duration || 4,
              style: {
                color: item.color,
              },
            },
            title: item.title,
          };
        });
        this.cd.detectChanges();
      });
  }

  handleDialogClosed(api: string): void {
    if (this.dialogService.dialogState$) {
      this.dialogService.dialogState$.subscribe(state => {
        if (!state) {
          this.getContentFormApi(api);
        }
      });
    }
  }
}
