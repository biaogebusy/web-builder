import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { FORM_IMPORTS } from '@uiux/combs/form/form-imports';
import { IDialog } from '@core/interface/IDialog';
import { IUser } from '@core/interface/IUser';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { UserService } from '@core/service/user.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { USER } from '@core/token/token-providers';
import { appendQueryParams } from '@core/util/http-params.util';
import { isTranslationLang } from '@core/util/builder-page.util';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { buildPageSettingCommonField, buildPageSettingFields } from './page-setting-fields';
import { buildPageSettingAttributes, buildPageSettingRelationships } from './page-setting-payload';

@Component({
  selector: 'app-page-setting',
  templateUrl: './page-setting.component.html',
  styleUrl: './page-setting.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, FORM_IMPORTS],
})
export class PageSettingComponent implements OnInit {
  private user = inject(USER);

  readonly content = input<any>();
  public form = new UntypedFormGroup({});
  public model: any = {};
  public fields: FormlyFieldConfig[];
  public loading = signal<boolean>(false);
  public type: 'node--landing_page' | 'node--json';
  // Deleting a translation version removes only the current language; the source-language version deletes the node itself (all languages)
  public isTranslation = false;

  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  private screenService = inject(ScreenService);
  private builderService = inject(BuilderService);
  private destroyRef = inject(DestroyRef);
  private userService = inject(UserService);
  private translate = inject(TranslateService);

  constructor() {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.loading.set(true);
      const { content } = this.content();
      const { data, included } = content;
      const {
        id,
        type,
        attributes: { langcode },
      } = data;
      this.type = type;
      this.isTranslation = type === 'node--landing_page' && isTranslationLang(langcode);
      this.fields = buildPageSettingFields({
        data,
        included,
        getCommonField: (key, defaultValue) => this.getCommonField(key, defaultValue),
        onCoverInit: field => this.initCoverUpdate(field, id, langcode),
        translate: key => this.translate.instant(key),
      });

      this.loading.set(false);
    }
  }

  getCommonField(key: string, defaultValue: string): FormlyFieldConfig {
    return buildPageSettingCommonField(key, defaultValue, translationKey =>
      this.translate.instant(translationKey)
    );
  }

  private initCoverUpdate(field: FormlyFieldConfig, id: string, langcode: string): void {
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
                  id: (this.user() as IUser)?.id,
                },
              },
            }
          )
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(res => {
            this.loading.set(false);
            if (res) {
              this.util.openSnackbar(this.translate.instant('BUILDER.PAGE_SETTING.COVER_UPDATED'));
            }
          });
      });
  }

  async onUpdate(value: any): Promise<void> {
    const { type } = value;
    const nodeType = type.split('--')[1];
    const api = `/api/v1/node/${nodeType}`;
    if (!this.user()) {
      this.userService.openLoginDialog();
      return;
    }
    const { content } = this.content();
    const { data } = content;
    const {
      id,
      attributes: { langcode, drupal_internal__nid, path },
    } = data;

    this.loading.set(true);
    let alias = false;
    try {
      alias = await this.builderService.updateUrlalias(
        {
          langcode,
          id: drupal_internal__nid ?? '',
          path,
        },
        value.alias.trim()
      );
    } catch {
      this.loading.set(false);
      return;
    }

    if (!alias) {
      this.util.openSnackbar(this.translate.instant('BUILDER.PAGE_SETTING.ALIAS_FAIL'));
      this.loading.set(false);
      return;
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
      .subscribe({
        next: res => {
          this.loading.set(false);
          if (res) {
            this.util.openSnackbar(
              this.translate.instant('BUILDER.PAGE_SETTING.UPDATE_SUCCESS', { title: value.title }),
              'ok'
            );
            this.builder.loading.set(true);
            this.builderService.loadPage({ langcode, nid: drupal_internal__nid });
            this.builder.updateSuccess$.next(true);
          }
        },
        error: err => {
          const { status } = err;
          switch (status) {
            case 403:
              this.util.openSnackbar(this.translate.instant('BUILDER.PAGE_SETTING.NO_PERMISSION'));
              break;
            default:
              this.util.openSnackbar(
                this.translate.instant('BUILDER.PAGE_SETTING.DELETE_FAIL', { title: value.title })
              );
              break;
          }
          this.builder.loading.set(true);
        },
      });
  }

  getAttributesParams(value: any): object {
    return buildPageSettingAttributes(value);
  }

  getRelationshiopParams(value: any): object {
    const { type } = value;
    const userId =
      type === 'node--landing_page' || type === 'node--json'
        ? (this.user() as IUser)?.id
        : undefined;

    return buildPageSettingRelationships(value, userId);
  }

  onPreview(): void {
    const config: IDialog = {
      disableActions: true,
      inputData: {
        content: {
          type: 'iframe',
          url: appendQueryParams(this.model.alias, { nocache: true }),
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
    } = this.content();
    this.builderService.loadNodeJson({
      langcode,
      nid: drupal_internal__nid,
      uuid: id,
      schemaType: alias,
    });
  }
  deletePage(value: any): void {
    if (!this.user()) {
      this.userService.openLoginDialog();
      return;
    }
    const { type } = value;
    const nodeType = type.split('--')[1];
    const api = `/api/v1/node/${nodeType}`;
    const { content } = this.content();
    const { data } = content;
    const {
      id,
      attributes: { title, langcode, drupal_internal__nid },
    } = data;
    const lang = this.getLangLabel(langcode);
    const config: IDialog = this.isTranslation
      ? {
          title: this.translate.instant('BUILDER.PAGE_SETTING.DELETE_TRANSLATION_TITLE'),
          noLabel: this.translate.instant('BUILDER.COMMON.CANCEL'),
          yesLabel: this.translate.instant('BUILDER.PAGE_SETTING.DELETE_TRANSLATION'),
          inputData: {
            content: {
              type: 'text',
              fullWidth: true,
              body: this.translate.instant('BUILDER.PAGE_SETTING.DELETE_TRANSLATION_CONFIRM', {
                title,
                lang,
              }),
            },
          },
        }
      : {
          title: this.translate.instant('BUILDER.PAGE_SETTING.DELETE_TITLE'),
          noLabel: this.translate.instant('BUILDER.COMMON.CANCEL'),
          yesLabel: this.translate.instant('BUILDER.PAGE_SETTING.DELETE'),
          inputData: {
            content: {
              type: 'text',
              fullWidth: true,
              body: this.translate.instant(
                environment.multiLang
                  ? 'BUILDER.PAGE_SETTING.DELETE_ALL_LANG_CONFIRM'
                  : 'BUILDER.PAGE_SETTING.DELETE_CONFIRM',
                { title }
              ),
            },
          },
        };
    this.dialog
      .open(DialogComponent, { width: '340px', data: config })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (!result) return;
        this.loading.set(true);
        const request$ = this.isTranslation
          ? this.builderService.deleteTranslation(drupal_internal__nid, langcode)
          : this.nodeService.deleteEntity(api, id);
        request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: () => {
            this.util.openSnackbar(
              this.isTranslation
                ? this.translate.instant('BUILDER.PAGE_SETTING.DELETE_TRANSLATION_SUCCESS', {
                    title,
                    lang,
                  })
                : this.translate.instant('BUILDER.PAGE_SETTING.DELETE_SUCCESS', { title }),
              'ok'
            );
            this.loading.set(false);
            this.builder.updateSuccess$.next(true);
            this.builder.closeRightDrawer$.next(true);
            // Deleting a translation clears only that language's local draft; other languages' drafts stay
            this.deleteLocalPage(id, this.isTranslation ? langcode : undefined);
          },
          error: err => {
            const { status } = err;
            switch (status) {
              case 403:
                this.util.openSnackbar(
                  this.translate.instant('BUILDER.PAGE_SETTING.NO_PERMISSION')
                );
                break;
              default:
                this.util.openSnackbar(
                  this.isTranslation
                    ? this.translate.instant('BUILDER.PAGE_SETTING.DELETE_TRANSLATION_FAIL', {
                        title,
                        lang,
                      })
                    : this.translate.instant('BUILDER.PAGE_SETTING.DELETE_FAIL', { title })
                );
                break;
            }
            this.loading.set(false);
          },
        });
      });
  }

  deleteLocalPage(uuid: string, langcode?: string): void {
    const versions = this.builder.version();
    const index = versions.findIndex(
      item => item.uuid === uuid && (langcode === undefined || item.langcode === langcode)
    );
    this.builder.deleteLocalPage(index);
  }

  private getLangLabel(code: string): string {
    return environment.langs?.find(item => item.langCode === code)?.label ?? code;
  }
}
