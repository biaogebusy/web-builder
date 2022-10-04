import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import type { IMediaObject } from '@core/interface/widgets/IMediaObject';
import { NodeService } from '@core/service/node.service';
import { DialogService } from '@core/service/dialog.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import type { IUser } from '@core/interface/IUser';
import { USER, CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  profile: IMediaObject;
  count: any[];
  constructor(
    private nodeService: NodeService,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService,
    @Inject(USER) public user: IUser,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig
  ) {
    super();
  }

  ngOnInit(): void {
    this.getProfile();
    this.getCount();
  }

  getProfile(): void {
    this.profile = {
      img: {
        src: this.user.picture || this.coreConfig.defaultAvatar,
        alt: this.user.current_user.name,
        style: {
          height: '37px',
          width: '37px',
          borderRadius: '50%',
        },
      },
      title: this.user.current_user.name,
      subTitle: this.user.display_name,
      align: 'center center',
    };
    this.cd.detectChanges();
  }

  getCount(): void {
    const api = this.getParams(this.content, 'api');
    if (!api) {
      this.count = this.content.count;
      this.cd.detectChanges();
    } else {
      this.getContentFormApi(api);
      this.handleDialogClosed(api);
    }
  }

  getContentFormApi(api: string): void {
    this.nodeService
      .search(api, '')
      .pipe(
        catchError(() => {
          return of({
            rows: [],
          });
        })
      )
      .subscribe((res) => {
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
      this.dialogService.dialogState$.subscribe((state) => {
        if (!state) {
          this.getContentFormApi(api);
        }
      });
    }
  }
}
