import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Inject,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '@core/interface/IUser';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { USER } from '@core/token/token-providers';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-setting',
  templateUrl: './page-setting.component.html',
  styleUrl: './page-setting.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSettingComponent implements OnInit {
  @Input() content: any;
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[];
  loading: boolean;

  cd = inject(ChangeDetectorRef);
  builder = inject(BuilderState);
  builderService = inject(BuilderService);
  screenService = inject(ScreenService);
  nodeService = inject(NodeService);
  util = inject(UtilitiesService);
  dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  user: IUser;
  constructor(@Inject(USER) public user$: Observable<IUser>) {
    this.user$.pipe(takeUntilDestroyed()).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.loading = true;
      const { content } = this.content;
      if (content) {
        this.fields = [
          {
            key: 'title',
            type: 'input',
            defaultValue: content.title.trim(),
            className: 'w-full',
            props: {
              label: '标题',
              required: true,
            },
            modelOptions: {
              updateOn: 'blur',
            },
            expressions: {
              'props.disabled': 'formState.disabled',
            },
            hooks: {
              onInit: (field: FormlyFieldConfig) => {
                if (field.formControl) {
                  field.formControl.valueChanges
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe((value) => {
                      this.loading = true;
                      this.builderService
                        .updateAttributes(
                          content,
                          '/api/v1/node/landing_page',
                          'node--landing_page',
                          {
                            title: value,
                          },
                        )
                        .subscribe((res) => {
                          this.loading = false;
                          this.cd.detectChanges();
                          this.util.openSnackbar(`更新标题${value}成功`, 'ok');
                        });
                    });
                }
              },
            },
          },
          {
            key: 'alias',
            type: 'input',
            className: 'w-full',
            defaultValue: content.url,
            props: {
              label: 'url别名',
              disabled: false,
            },
            modelOptions: {
              updateOn: 'blur',
            },
            expressions: {
              'props.disabled': 'formState.disabled',
            },
            hooks: {
              onInit: (field: FormlyFieldConfig) => {
                if (field.formControl) {
                  field.formControl.valueChanges
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe((value) => {
                      this.loading = true;
                      this.builderService
                        .updateUrlalias(content, value)
                        .pipe(takeUntilDestroyed(this.destroyRef))
                        .subscribe(() => {
                          this.loading = false;
                          this.cd.detectChanges();
                          this.util.openSnackbar(
                            `${content.title}已更新别名${value}`,
                          );
                        });
                    });
                }
              },
            },
          },
          {
            key: 'taxonomy',
            type: 'mat-select',
            props: {
              api: '/api/v2/taxonomy_term/page_group',
              label: '页面分组',
            },
          },
          {
            key: 'author',
            type: 'input',
            className: 'w-full',
            defaultValue: content.author,
            props: {
              label: '作者',
              disabled: true,
            },
          },
          {
            key: 'changed',
            type: 'input',
            className: 'w-full',
            defaultValue: content.changed,
            props: {
              label: '更新时间',
              disabled: true,
            },
          },
          {
            key: 'landcode',
            type: 'input',
            className: 'w-full',
            defaultValue: content.langcode,
            props: {
              label: '语言',
              disabled: true,
            },
          },
          {
            key: 'id',
            type: 'input',
            className: 'w-full',
            defaultValue: content.id,
            props: {
              label: 'ID',
              disabled: true,
            },
          },
        ];
        this.loading = false;
        this.cd.detectChanges();
      }
    }
  }
  deletePage(): void {
    this.loading = true;
    const { uuid, title } = this.content.content;
    const api = `/api/v1/node/landing_page`;
    this.builder.loading$.next(true);
    this.nodeService
      .deleteEntity(api, uuid, this.user.csrf_token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.util.openSnackbar(`删除${title}成功`, 'ok');
        this.builder.loading$.next(false);
        this.builder.updateSuccess$.next(true);
        this.builder.closeRightDrawer$.next(true);
        this.loading = false;
        this.dialog.closeAll();
        this.cd.detectChanges();
      });
  }
}
