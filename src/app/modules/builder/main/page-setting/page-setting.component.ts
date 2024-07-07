import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-page-setting',
  templateUrl: './page-setting.component.html',
  styleUrl: './page-setting.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSettingComponent implements OnInit, OnDestroy {
  @Input() content: any;
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[];
  loading: boolean;

  destroy$: Subject<boolean> = new Subject<boolean>();
  cd = inject(ChangeDetectorRef);
  builder = inject(BuilderState);
  builderService = inject(BuilderService);
  screenService = inject(ScreenService);
  nodeService = inject(NodeService);
  util = inject(UtilitiesService);
  dialog = inject(MatDialog);

  constructor(@Inject(USER) private user: IUser) {}

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
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((value) => {
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
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((value) => {
                      this.builderService
                        .updateUrlalias(content, value)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => {
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
            key: 'author',
            type: 'input',
            defaultValue: content.author,
            props: {
              label: '作者',
              disabled: true,
            },
          },
          {
            key: 'changed',
            type: 'input',
            defaultValue: content.changed,
            props: {
              label: '更新时间',
              disabled: true,
            },
          },
          {
            key: 'landcode',
            type: 'input',
            defaultValue: content.langcode,
            props: {
              label: '语言',
              disabled: true,
            },
          },
          {
            key: 'id',
            type: 'input',
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
      .pipe(takeUntil(this.destroy$))
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

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}
