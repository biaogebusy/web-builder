import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IDialog } from '@core/interface/IDialog';
import { IUser } from '@core/interface/IUser';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { UserService } from '@core/service/user.service';
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
  standalone: false,
})
export class PageSettingComponent implements OnInit {
  private user$ = inject<Observable<IUser>>(USER);

  @Input() content: any;
  public form = new UntypedFormGroup({});
  public model: any = {};
  public fields: FormlyFieldConfig[];
  public loading = signal<boolean>(false);
  public type: 'node--landing_page' | 'node--json';

  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  private screenService = inject(ScreenService);
  private builderService = inject(BuilderService);
  private destroyRef = inject(DestroyRef);
  private userService = inject(UserService);
  private user: IUser;

  constructor() {
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.loading.set(true);
      const { content } = this.content;
      const { data, included } = content;
      const {
        id,
        type,
        attributes: {
          changed,
          drupal_internal__nid,
          langcode,
          title,
          path,
          meta_tags,
          is_transparent,
          transparent_style,
        },
      } = data;
      this.type = type;
      const user = included.find((item: any) => item.type === 'user--user');
      this.fields = [
        this.getCommonField('title', title.trim()),
        this.getCommonField(
          'alias',
          this.builderService.getAttrAlias({
            drupal_internal__nid,
            path,
            langcode,
          })
        ),
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
        this.getCommonField('changed', changed),
        this.getCommonField('type', type),
        this.getCommonField('langcode', langcode),
        this.getCommonField('nid', drupal_internal__nid),
        this.getCommonField('description', meta_tags?.description),
      ];
      if (type === 'node--landing_page') {
        const cover = included.find((item: any) => item.type === 'file--file');
        const pageGroup = included.find((item: any) => item.type === 'taxonomy_term--page_group');
        if (content) {
          this.fields.splice(
            2,
            0,
            {
              key: 'page_group',
              type: 'mat-select',
              defaultValue: pageGroup ? pageGroup.id : '',
              props: {
                api: '/api/v2/taxonomy_term/page_group',
                nocache: true,
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
                    .subscribe(coverImg => {
                      if (!coverImg) {
                        return;
                      }
                      this.loading.set(true);
                      this.builderService
                        .updateAttributes(
                          { uuid: id, langcode },
                          '/api/v1/node/landing_page',
                          {},
                          {
                            cover: {
                              data: {
                                type: 'media--image',
                                id: coverImg,
                              },
                            },
                            uid: {
                              data: {
                                type: 'user--user',
                                id: this.user.id,
                              },
                            },
                          }
                        )
                        .pipe(takeUntilDestroyed(this.destroyRef))
                        .subscribe(res => {
                          this.loading.set(false);
                          if (res) {
                            this.util.openSnackbar(`已更新封面`);
                          }
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
            }
          );
        }
      }

      this.loading.set(false);
    }
  }

  getCommonField(key: string, defaultValue: string): FormlyFieldConfig {
    switch (key) {
      case 'title':
        return {
          key: 'title',
          type: 'input',
          defaultValue,
          className: 'w-full',
          props: {
            label: '标题',
            required: true,
          },
          expressions: {
            'props.disabled': 'formState.disabled',
          },
        };
      case 'changed':
        return {
          key: 'changed',
          type: 'input',
          className: 'w-full',
          defaultValue,
          props: {
            label: '更新时间',
            disabled: true,
          },
        };
      case 'langcode':
        return {
          key: 'landcode',
          type: 'input',
          className: 'w-full',
          defaultValue,
          props: {
            label: '语言',
            disabled: true,
          },
        };
      case 'nid':
        return {
          key: 'id',
          type: 'input',
          className: 'w-full',
          defaultValue,
          props: {
            label: 'nid',
            disabled: true,
          },
        };
      case 'type':
        return {
          key: 'type',
          type: 'input',
          className: 'w-full',
          defaultValue,
          props: {
            label: '内容类型',
            disabled: true,
          },
        };
      case 'alias':
        return {
          key: 'alias',
          type: 'input',
          className: 'w-full',
          defaultValue,
          props: {
            label: 'url别名',
            disabled: false,
          },
          expressions: {
            'props.disabled': 'formState.disabled',
          },
        };
      case 'description':
        return {
          key: 'meta_tags',
          fieldGroup: [
            {
              key: 'description',
              type: 'textarea',
              defaultValue,
              props: {
                label: '页面描述',
                rows: 2,
                disabled: true,
              },
            },
          ],
        };
      default:
        return {
          key,
          type: 'input',
          defaultValue,
          className: 'w-full',
          props: {
            label: key,
          },
        };
    }
  }

  async onUpdate(value: any): Promise<void> {
    const { type } = value;
    const nodeType = type.split('--')[1];
    const api = `/api/v1/node/${nodeType}`;
    if (!this.user) {
      this.userService.openLoginDialog();
      return;
    }
    const { content } = this.content;
    const { data } = content;
    const {
      id,
      attributes: { langcode, drupal_internal__nid, path },
    } = data;

    this.loading.set(true);
    const alias = await this.builderService.updateUrlalias(
      {
        langcode,
        id: drupal_internal__nid ?? '',
        path,
      },
      value.alias
    );
    if (!alias) {
      this.util.openSnackbar(`更新别名失败，请联系管理员！`);
    }
    this.builderService
      .updateAttributes(
        {
          uuid: id,
          langcode,
        },
        api,
        {
          ...this.getAttributesParams(value),
        },
        {
          ...this.getRelationshiopParams(value),
        }
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.loading.set(false);
        if (res) {
          this.util.openSnackbar(`更新${value.title}成功`, 'ok');
          this.builder.loading$.next(true);
          this.builderService.loadPage({ langcode, nid: drupal_internal__nid });
          this.builder.updateSuccess$.next(true);
        }
      });
  }

  getAttributesParams(value: any): object {
    const { title, is_transparent, transparent_style, type } = value;
    const common = {
      title,
    };
    if (type === 'node--landing_page') {
      return {
        ...common,
        is_transparent,
        transparent_style,
      };
    }

    if (type === 'node--json') {
      return {
        ...common,
      };
    }

    return {};
  }

  getRelationshiopParams(value: any): object {
    const { page_group, type } = value;
    if (type === 'node--landing_page') {
      return {
        uid: {
          data: {
            type: 'user--user',
            id: this.user.id,
          },
        },
        group: {
          data: page_group
            ? {
                type: 'taxonomy_term--page_group',
                id: page_group,
              }
            : null,
        },
      };
    }

    if (type === 'node--json') {
      return {
        uid: {
          data: {
            type: 'user--user',
            id: this.user.id,
          },
        },
      };
    }

    return {};
  }

  onPreview(): void {
    const config: IDialog = {
      disableActions: true,
      inputData: {
        content: {
          type: 'iframe',
          url: `${this.model.alias}?nocache=true`,
          width: '100%',
          fullWidth: true,
          classes: 'h-screen',
        },
      },
    };
    this.dialog.open(DialogComponent, {
      width: '85vw',
      height: '85vh',
      panelClass: ['close-outside', 'close-icon-white', 'dialog-p-0', 'page-preview-dialog'],
      data: config,
    });
  }
  onJson(): void {
    const {
      content: {
        data: {
          id,
          type,
          attributes: {
            drupal_internal__nid,
            langcode,
            path: { alias = '' },
          },
        },
      },
    } = this.content;
    this.builderService.loadNodeJson({
      langcode,
      nid: drupal_internal__nid,
      uuid: id,
      schemaType: alias,
    });
  }
  deletePage(value: any): void {
    if (!this.user) {
      this.userService.openLoginDialog();
      return;
    }
    const { type } = value;
    const nodeType = type.split('--')[1];
    const api = `/api/v1/node/${nodeType}`;
    this.loading.set(true);
    const { content } = this.content;
    const { data } = content;
    const {
      id,
      attributes: { title },
    } = data;
    this.nodeService
      .deleteEntity(api, id, this.user.csrf_token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.util.openSnackbar(`删除${title}成功`, 'ok');
          this.builder.updateSuccess$.next(true);
          this.builder.closeRightDrawer$.next(true);
          this.loading.set(false);
          this.deleteLocalPage(id);
        },
        error: err => {
          const { status } = err;
          switch (status) {
            case 403:
              this.util.openSnackbar(`权限不足！`);
              break;
            default:
              this.util.openSnackbar(`删除${title}失败，请联系管理员！`);
              break;
          }
          this.loading.set(false);
        },
      });
  }

  deleteLocalPage(uuid: string): void {
    const versions = this.builder.version;
    const index = versions.findIndex(item => item.uuid === uuid);
    this.builder.deleteLocalPage(index);
  }
}
