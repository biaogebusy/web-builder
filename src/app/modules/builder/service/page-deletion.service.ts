import { Injectable, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import type { IDialog } from '@core/interface/IDialog';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { TranslateService } from '@ngx-translate/core';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { escape } from 'lodash-es';
import { Observable, catchError, defer, finalize, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

/** The immutable page identity selected before opening a delete confirmation. */
export interface PageDeletionTarget {
  /** JSON:API resource UUID. */
  uuid: string;
  /** Drupal node ID, also used to identify local drafts. */
  nid: string | number;
  /** The selected content language, independent of the interface language. */
  langcode: string;
  /** Display title of the selected version. */
  title: string;
  /** Configuration nodes retain their existing whole-entity deletion behavior. */
  bundle?: 'landing_page' | 'json';
}

/** A successful deletion scope; false means cancellation or failure. */
export type PageDeletionResult = 'page' | 'translation' | false;

@Injectable()
export class PageDeletionService {
  private nodeService = inject(NodeService);
  private builderService = inject(BuilderService);
  private dialog = inject(MatDialog);
  private translate = inject(TranslateService);
  private util = inject(UtilitiesService);

  /** Prevents another operation while inspection, confirmation or deletion is pending. */
  readonly busy = signal(false);

  /** Re-checks the selected translation before offering an explicit deletion scope. */
  delete(target: PageDeletionTarget): Observable<PageDeletionResult> {
    const page = { ...target };
    return defer(() => {
      if (this.busy()) return of(false as const);
      this.busy.set(true);
      const bundle = page.bundle ?? 'landing_page';
      const api = `/api/v1/node/${bundle}`;
      const lang = environment.langs?.find(item => item.langCode === page.langcode)?.label
        ?? page.langcode;
      let failureKey = 'BUILDER.PAGE_SETTING.DELETE_CHECK_FAILED';
      return this.nodeService.fetch(`${api}/${page.uuid}`, {
        noCache: Date.now(),
        [`fields[node--${bundle}]`]: 'langcode,default_langcode,drupal_internal__nid',
      }, page.langcode).pipe(
        map(response => {
          const data = response?.data;
          const attributes = data?.attributes;
          if (!page.uuid || !page.nid || !page.langcode || data?.id !== page.uuid ||
            data.type !== `node--${bundle}` || attributes?.langcode !== page.langcode ||
            String(attributes.drupal_internal__nid) !== String(page.nid) ||
            (bundle === 'landing_page' && typeof attributes.default_langcode !== 'boolean')) {
            throw new Error('The selected page language could not be verified.');
          }
          return bundle === 'landing_page' && attributes.default_langcode === false
            ? 'translation' as const : 'page' as const;
        }),
        switchMap(scope => {
          const translation = scope === 'translation';
          const key = translation ? 'DELETE_TRANSLATION' : bundle === 'landing_page'
            ? 'DELETE_ALL_LANG' : 'DELETE';
          const config: IDialog = {
            title: this.translate.instant(`BUILDER.PAGE_SETTING.${key}_TITLE`, { lang }),
            noLabel: this.translate.instant('BUILDER.COMMON.CANCEL'),
            yesLabel: this.translate.instant(`BUILDER.PAGE_SETTING.${key}`, { lang }),
            inputData: { content: { type: 'text', fullWidth: true,
              body: this.translate.instant(`BUILDER.PAGE_SETTING.${key}_CONFIRM`, {
                title: escape(page.title), lang: escape(lang),
              }),
            } },
          };
          return this.dialog.open(DialogComponent, {
            width: '440px', maxWidth: 'calc(100vw - 32px)', data: config,
            panelClass: 'page-deletion-dialog',
            autoFocus: '.dialog-actions button:first-child',
          }).afterClosed().pipe(switchMap(confirmed => {
            if (!confirmed) return of(false as const);
            failureKey = translation ? 'BUILDER.PAGE_SETTING.DELETE_TRANSLATION_FAIL'
              : 'BUILDER.PAGE_SETTING.DELETE_FAIL';
            const request = translation
              ? this.builderService.deleteTranslation(page.nid, page.langcode)
              : this.nodeService.deleteEntity(api, page.uuid);
            return request.pipe(
              map(() => scope),
              tap(() => this.util.openSnackbar(this.translate.instant(
                `BUILDER.PAGE_SETTING.${key}_SUCCESS`, { title: page.title, lang }
              ), 'ok'))
            );
          }));
        }),
        catchError((error: unknown) => {
          const denied = !!error && typeof error === 'object' &&
            'status' in error && error.status === 403;
          this.util.openSnackbar(this.translate.instant(
            denied ? 'BUILDER.PAGE_SETTING.NO_PERMISSION' : failureKey,
            { title: page.title, lang }
          ));
          return of(false as const);
        }),
        finalize(() => this.busy.set(false))
      );
    });
  }
}
