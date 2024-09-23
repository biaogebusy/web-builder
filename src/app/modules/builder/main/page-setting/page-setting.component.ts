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
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
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

  dialog = inject(MatDialog);
  cd = inject(ChangeDetectorRef);
  builder = inject(BuilderState);
  util = inject(UtilitiesService);
  nodeService = inject(NodeService);
  screenService = inject(ScreenService);
  builderService = inject(BuilderService);
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
      const { data, included } = content;
      const {
        id,
        attributes: {
          changed,
          drupal_internal__nid,
          langcode,
          title,
          path,
          is_transparent,
          transparent_style,
        },
      } = data;
      const user = included.find((item: any) => item.type === 'user--user');
      const cover = included.find((item: any) => item.type === 'file--file');
      const pageGroup = included.find(
        (item: any) => item.type === 'taxonomy_term--page_group',
      );
      if (content) {
        this.fields = [
          {
            key: 'title',
            type: 'input',
            defaultValue: title.trim(),
            className: 'w-full',
            props: {
              label: '标题',
              required: true,
            },
            expressions: {
              'props.disabled': 'formState.disabled',
            },
          },
          {
            key: 'alias',
            type: 'input',
            className: 'w-full',
            defaultValue: this.builderService.getAttrAlias({
              drupal_internal__nid,
              path,
              langcode,
            }),
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
                        .updateUrlalias(
                          {
                            uuid: id,
                            langcode,
                            id: drupal_internal__nid,
                          },
                          value,
                        )
                        .pipe(takeUntilDestroyed(this.destroyRef))
                        .subscribe(() => {
                          this.loading = false;
                          this.cd.detectChanges();
                          this.util.openSnackbar(`已更新别名:${value}`);
                        });
                    });
                }
              },
            },
          },
          {
            key: 'page_group',
            type: 'mat-select',
            defaultValue: pageGroup ? pageGroup.id : '',
            props: {
              api: '/api/v2/taxonomy_term/page_group',
              label: '页面分类',
              options: [
                {
                  label: '无',
                  value: null,
                },
              ],
            },
          },
          {
            key: 'cover',
            type: 'img-picker',
            defaultValue: cover ? cover.attributes.uri.url : '',
            props: {
              valueIsUUID: true,
              updateLabel: '更新封面',
              addLabel: '设置封面',
              deleteLabel: '删除',
              fileName: cover ? cover.attributes.uri.url.split('/').pop() : '',
            },
            hooks: {
              onInit: (field: FormlyFieldConfig) => {
                field.formControl?.valueChanges
                  .pipe(takeUntilDestroyed(this.destroyRef))
                  .subscribe((cover) => {
                    if (!cover) {
                      return;
                    }
                    this.loading = true;
                    this.builderService
                      .updateAttributes(
                        { uuid: id, langcode },
                        '/api/v1/node/landing_page',
                        'node--landing_page',
                        {},
                        {
                          cover: {
                            data: {
                              type: 'media--image',
                              id: cover,
                            },
                          },
                          uid: {
                            data: {
                              type: 'user--user',
                              id: this.user.id,
                            },
                          },
                        },
                      )
                      .subscribe(() => {
                        this.loading = false;
                        this.cd.detectChanges();
                        this.util.openSnackbar(`已更新封面`);
                      });
                  });
              },
            },
          },
          {
            key: 'is_transparent',
            type: 'toggle',
            defaultValue: is_transparent,
            props: {
              label: '页头背景是否透明',
            },
          },
          {
            key: 'transparent_style',
            type: 'mat-select',
            defaultValue: transparent_style,
            props: {
              label: '透明风格',
              options: [
                {
                  label: '明亮',
                  value: 'light',
                },
                {
                  label: '暗黑',
                  value: 'dark',
                },
              ],
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return !field.parent?.model.is_transparent;
              },
            },
          },
          {
            key: 'author',
            type: 'input',
            className: 'w-full',
            defaultValue: user.attributes.display_name,
            props: {
              label: '作者',
              disabled: true,
            },
          },
          {
            key: 'changed',
            type: 'input',
            className: 'w-full',
            defaultValue: changed,
            props: {
              label: '更新时间',
              disabled: true,
            },
          },
          {
            key: 'landcode',
            type: 'input',
            className: 'w-full',
            defaultValue: langcode,
            props: {
              label: '语言',
              disabled: true,
            },
          },
          {
            key: 'id',
            type: 'input',
            className: 'w-full',
            defaultValue: drupal_internal__nid,
            props: {
              label: 'nid',
              disabled: true,
            },
          },
        ];
        this.loading = false;
        this.cd.detectChanges();
      }
    }
  }

  onUpdate(value: any): void {
    const { title, is_transparent, transparent_style } = value;
    if (!this.user) {
      this.util.openSnackbar('请先登录！', 'ok');
    }
    const { content } = this.content;
    const { data } = content;
    const {
      id,
      attributes: { langcode },
    } = data;
    this.loading = true;
    this.builderService
      .updateAttributes(
        {
          uuid: id,
          langcode,
        },
        '/api/v1/node/landing_page',
        'node--landing_page',
        {
          title,
          is_transparent,
          transparent_style,
        },
        {
          uid: {
            data: {
              type: 'user--user',
              id: this.user.id,
            },
          },
          group: {
            data: value.page_group
              ? {
                  type: 'taxonomy_term--page_group',
                  id: value.page_group,
                }
              : null,
          },
        },
      )
      .subscribe(
        (res) => {
          this.loading = false;
          this.cd.detectChanges();
          this.util.openSnackbar(`更新${value.title}成功`, 'ok');
        },
        (error) => {
          const { statusText } = error;
          this.loading = false;
          this.util.openSnackbar(statusText, 'ok');
        },
      );
  }

  onPreview(): void {
    this.dialog.open(DialogComponent, {
      width: '85vw',
      height: '85vh',
      panelClass: [
        'close-outside',
        'close-icon-white',
        'dialog-p-0',
        'page-preview-dialog',
      ],
      data: {
        disableCloseButton: true,
        inputData: {
          content: {
            type: 'iframe',
            url: `${this.model.alias}?nocache=true`,
            width: '100%',
            height: '100%',
          },
        },
      },
    });
  }
  deletePage(): void {
    this.loading = true;
    const { content } = this.content;
    const { data } = content;
    const {
      id,
      attributes: { title },
    } = data;
    const api = `/api/v1/node/landing_page`;
    this.nodeService
      .deleteEntity(api, id, this.user.csrf_token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        () => {
          this.util.openSnackbar(`删除${title}成功`, 'ok');
          this.builder.updateSuccess$.next(true);
          this.builder.closeRightDrawer$.next(true);
          this.loading = false;
          this.deleteLocalPage(id);
          this.cd.detectChanges();
        },
        (error) => {
          const {
            error: { message },
          } = error;
          this.loading = false;
          this.util.openSnackbar(message, 'ok');
        },
      );
  }

  deleteLocalPage(uuid: string): void {
    const versions = this.builder.version;
    const index = versions.findIndex((item) => item.uuid === uuid);
    this.builder.deleteLocalPage(index);
  }
}
