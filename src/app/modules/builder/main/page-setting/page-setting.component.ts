import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
  input,
  computed,
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
import { NodeFieldFormService, type INodeFormSchema } from '@core/service/node-field-form.service';
import { ScreenService } from '@core/service/screen.service';
import { UserService } from '@core/service/user.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { USER } from '@core/token/token-providers';
import { appendQueryParams } from '@core/util/http-params.util';
import { decodeMetaTags, getAttrAlias, isTranslationLang, type MetaTags } from '@core/util/builder-page.util';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { buildPageSettingCommonField, buildPageSettingFields } from './page-setting-fields';
import { buildPageSettingAttributes, buildPageSettingRelationships } from './page-setting-payload';
import { firstValueFrom } from 'rxjs';
import { buildPagePublicationAttributes, buildPagePublicationField } from './page-publication-fields';

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
  readonly updating = signal(false);
  readonly publicationLoading = signal(false);
  readonly publicationFailed = signal(false);
  readonly updateFailed = signal(false);
  readonly selectedPublicationState = signal('');
  readonly savedPublicationState = signal('');
  /** Describes what the single settings save action will do. */
  readonly updateLabel = computed(() => {
    if (this.updating()) return 'BUILDER.PAGE_SETTING.SAVING';
    const state = this.selectedPublicationState();
    if (this.publicationFailed() || state === this.savedPublicationState()) {
      return 'BUILDER.PAGE_SETTING.UPDATE';
    }
    switch (state) {
      case 'published': return 'BUILDER.PAGE_SETTING.SAVE_AND_PUBLISH';
      case 'unpublished': return 'BUILDER.PAGE_SETTING.SAVE_AND_UNPUBLISH';
      case 'draft': return 'BUILDER.PAGE_SETTING.SAVE_AS_DRAFT';
      default: return 'BUILDER.PAGE_SETTING.UPDATE';
    }
  });
  /** Publication uses the saved content, so retain and identify any local canvas edits. */
  readonly hasUnsavedCanvas = computed(() => {
    const data = this.content()?.content?.data;
    return !!data?.id && this.builder.isPageDirty({
      uuid: data.id, langcode: data.attributes.langcode,
    });
  });
  public type: 'node--landing_page' | 'node--json';
  // Deleting a translation version removes only the current language; the source-language version deletes the node itself (all languages)
  public isTranslation = false;
  // Tags stored on the node, so an update keeps the tags the SEO group does not expose
  private metaTags: MetaTags = {};
  private publicationSchema: INodeFormSchema | null = null;
  private publicationField?: FormlyFieldConfig;
  private savedAlias = '';

  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  private nodeForms = inject(NodeFieldFormService);
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
      this.metaTags = decodeMetaTags(data.attributes.meta_tags);
      this.savedAlias = getAttrAlias(data.attributes);
      if (type === 'node--landing_page') {
        this.publicationField = buildPagePublicationField(null,
          typeof data.attributes.status === 'boolean'
            ? data.attributes.status ? 'published' : 'unpublished' : '',
          key => this.translate.instant(key));
        // The shared Formly wrapper clones its fields; keep the live field for async updates.
        this.publicationField.hooks = { onInit: field => {
          this.publicationField = field;
          this.selectedPublicationState.set(field.formControl?.value ?? '');
          field.formControl?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(state => this.selectedPublicationState.set(state));
        } };
      }
      this.fields = buildPageSettingFields({
        data,
        included,
        getCommonField: (key, defaultValue) => this.getCommonField(key, defaultValue),
        onCoverInit: field => this.initCoverUpdate(field, id, langcode),
        translate: key => this.translate.instant(key),
        publicationField: this.publicationField,
      });

      this.loading.set(false);
      if (type === 'node--landing_page') this.refreshPublication();
    }
  }

  /** Refreshes status permissions without rebuilding or resetting the other form fields. */
  refreshPublication(): void {
    const field = this.publicationField;
    if (!field || this.publicationLoading()) return;
    const { data } = this.content().content;
    this.publicationLoading.set(true);
    this.publicationFailed.set(false);
    Object.assign(field.props!, { disabled: true });
    field.options?.detectChanges?.(field);
    this.nodeForms.getSchema('landing_page', data.id, data.attributes.langcode)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: schema => {
          this.publicationSchema = schema;
          this.savedPublicationState.set(schema.defaults.state);
          this.selectedPublicationState.set(schema.defaults.state);
          const currentField = this.publicationField!;
          const next = buildPagePublicationField(schema, '', key => this.translate.instant(key));
          Object.assign(currentField.props!, next.props);
          currentField.defaultValue = next.defaultValue;
          this.model.publicationState = schema.defaults.state;
          currentField.formControl?.setValue(schema.defaults.state);
          this.publicationLoading.set(false);
          currentField.options?.detectChanges?.(currentField);
        },
        error: () => {
          this.publicationSchema = null;
          this.publicationLoading.set(false);
          this.publicationFailed.set(true);
          const currentField = this.publicationField!;
          Object.assign(currentField.props!, { disabled: true });
          currentField.options?.detectChanges?.(currentField);
        },
      });
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
    if (this.loading() || this.updating() || this.publicationLoading() || this.form.invalid) return;
    const { content } = this.content();
    const { data } = content;
    const {
      id,
      attributes: { langcode, drupal_internal__nid },
    } = data;

    const schema = this.publicationSchema;
    const requestedState = value.publicationState;
    const stateChanged = !!schema && requestedState !== schema.defaults.state;
    let successMessage = 'BUILDER.PAGE_SETTING.UPDATE_SUCCESS';
    const page = { uuid: id, langcode };
    this.updating.set(true);
    this.loading.set(true);
    this.updateFailed.set(false);
    try {
      const attributes = {
        ...this.getAttributesParams(value),
        ...(type === 'node--landing_page'
          ? buildPagePublicationAttributes(schema, value.publicationState) : {}),
      };
      const alias = value.alias.trim();
      if (alias !== this.savedAlias) {
        const saved = await this.builderService.updateUrlalias(
          { nid: drupal_internal__nid, langcode }, alias
        );
        if (!saved) {
          this.util.openSnackbar(this.translate.instant('BUILDER.PAGE_SETTING.ALIAS_FAIL'));
          this.updateFailed.set(true);
          return;
        }
        this.savedAlias = alias;
      }
      const response = await firstValueFrom(this.builderService.updateAttributes(
        page, api, attributes, this.getRelationshiopParams(value)
      ));
      if (!response) {
        this.updateFailed.set(true);
        return;
      }
      if (type === 'node--landing_page') {
        const statusField = schema?.baseFieldNames.status ?? 'status';
        let published = response.data?.attributes?.[statusField];
        if (schema?.moderated) {
          // Pending revisions can have a different publication flag from the public default.
          published = undefined;
          try {
            const current = await firstValueFrom(this.nodeService.fetch(
              `/api/v1/node/landing_page/${encodeURIComponent(id)}`,
              { 'fields[node--landing_page]': statusField }, langcode
            ));
            published = current.data?.attributes?.[statusField];
          } catch {
            // The settings were saved; retain the last known flag if the follow-up read fails.
          }
        }
        this.metaTags = decodeMetaTags((attributes as Record<string, unknown>)['meta_tags']);
        this.builder.updatePageSettings(page, {
          title: response.data?.attributes?.title ?? value.title,
          meta: Object.entries(this.metaTags).map(([name, content]) => ({ name, content })),
          ...(typeof published === 'boolean' ? { published } : {}),
          ...(typeof value.is_transparent === 'boolean' ? { config: {
            headerMode: { transparent: value.is_transparent, style: value.transparent_style },
          } } : {}),
        });
        if (stateChanged) {
          if (typeof published !== 'boolean') {
            successMessage = 'BUILDER.PAGE_SETTING.SAVED_STATUS_UNCONFIRMED';
          } else if (requestedState === 'published' && published) {
            successMessage = 'BUILDER.PAGE_SETTING.PUBLISHED_SUCCESS';
          } else if (requestedState === 'unpublished' && !published) {
            successMessage = 'BUILDER.PAGE_SETTING.UNPUBLISHED_SUCCESS';
          } else if (requestedState === 'draft') {
            successMessage = published
              ? 'BUILDER.PAGE_SETTING.DRAFT_WITH_PUBLISHED_SUCCESS'
              : 'BUILDER.PAGE_SETTING.DRAFT_SUCCESS';
          } else {
            successMessage = 'BUILDER.PAGE_SETTING.STATE_SAVED_SUCCESS';
          }
        }
        if (!this.destroyRef.destroyed) this.refreshPublication();
      } else {
        this.builder.loading.set(true);
        this.builderService.loadPage({ langcode, nid: drupal_internal__nid });
      }
      this.builder.updateSuccess$.next(true);
      this.util.openSnackbar(
        this.translate.instant(successMessage, { title: value.title }), 'ok'
      );
    } catch {
      this.updateFailed.set(true);
    } finally {
      this.loading.set(false);
      this.updating.set(false);
    }
  }

  getAttributesParams(value: any): object {
    return buildPageSettingAttributes(value, this.metaTags);
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
    const { attributes } = this.content().content.data;
    const config: IDialog = {
      disableActions: true,
      inputData: {
        content: {
          type: 'iframe',
          url: appendQueryParams('/preview', {
            nid: attributes.drupal_internal__nid, lang: attributes.langcode,
          }),
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
