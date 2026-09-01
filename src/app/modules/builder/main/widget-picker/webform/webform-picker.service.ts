import { Injectable, inject } from '@angular/core';
import type { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, of } from 'rxjs';
import { finalize, map, shareReplay, tap } from 'rxjs/operators';

import type { IDynamicInputs } from '@core/interface/IAppConfig';
import type { IDynamicForm } from '@core/interface/combs/IDynamicForm';
import { ApiService } from '@core/service/api.service';

import { webformElementsToFormly } from './webform-to-formly';
import type { IWebformElements, IWebformSummary, IWebformWarning } from './webform.interface';

/** A `dynamic-form` node built from a webform, ready to be inserted into a page */
export interface IWebformInsertResult {
  content: IDynamicInputs;
  warnings: IWebformWarning[];
}

/**
 * Backs the webform group of the widget picker: lists the webforms exposed by the
 * CMS and turns the selected one into a `dynamic-form` page node.
 *
 * Builder-only. Public pages render the produced JSON through the plain
 * `dynamic-form` comb and never load this service.
 */
@Injectable({
  providedIn: 'root',
})
export class WebformPickerService {
  private api = inject(ApiService);

  /** Resolved lists per endpoint; the picker is reopened constantly in one session */
  private listCache = new Map<string, IWebformSummary[]>();
  /** In-flight list requests, dropped on error so the retry action can run again */
  private pendingList = new Map<string, Observable<IWebformSummary[]>>();

  /** Lists the webforms available in the CMS, open ones only. */
  getWebforms(): Observable<IWebformSummary[]> {
    const url = this.listUrl();
    const cached = this.listCache.get(url);
    if (cached) {
      return of(cached);
    }
    const pending = this.pendingList.get(url);
    if (pending) {
      return pending;
    }
    const request$ = this.api.http.get<IWebformSummary[]>(url).pipe(
      map(list => this.normalize(list)),
      tap(list => this.listCache.set(url, list)),
      finalize(() => this.pendingList.delete(url)),
      shareReplay(1)
    );
    this.pendingList.set(url, request$);
    return request$;
  }

  /**
   * Loads the element tree of one webform.
   * Not cached: it is read once per insert and must reflect the latest CMS state.
   */
  getFields(webformId: string): Observable<IWebformElements> {
    // No language prefix here: only /api is proxied per language, /webform_rest is not
    // (see config/proxy.config.js), and the existing submit call has the same shape.
    return this.api.http.get<IWebformElements>(
      `${this.api.apiUrl}/webform_rest/${encodeURIComponent(webformId)}/fields`,
      { params: { _format: 'json' } }
    );
  }

  /** Fetches a webform's fields and wraps them into an insertable `dynamic-form` node. */
  buildDynamicForm(
    webform: IWebformSummary,
    submitLabel: string
  ): Observable<IWebformInsertResult> {
    return this.getFields(webform.id).pipe(
      map(elements => {
        const { fields, warnings } = webformElementsToFormly(elements);
        return { content: this.buildContent(webform, fields, submitLabel), warnings };
      })
    );
  }

  private listUrl(): string {
    const { lang } = this.api.getUrlPath(this.api.pageUrl);
    return `${this.api.apiUrl}${lang}/api/v3/webform`;
  }

  private normalize(list: IWebformSummary[]): IWebformSummary[] {
    if (!Array.isArray(list)) {
      return [];
    }
    return list
      .filter(item => item?.id && item.status !== false)
      .map(item => ({ ...item, title: item.title || item.id }));
  }

  /**
   * Fields are baked into the page JSON instead of fetched at render time, so public
   * pages stay a single request and the editor can still tweak labels afterwards.
   * `form.id` is kept because `dynamic-form` submits it as `webform_id`.
   */
  private buildContent(
    webform: IWebformSummary,
    fields: FormlyFieldConfig[],
    submitLabel: string
  ): IDynamicInputs {
    const content: IDynamicForm & { type: string } = {
      type: 'dynamic-form',
      form: {
        type: 'formly',
        id: webform.id,
        fields,
      },
      action: {
        classes: 'flex justify-center mt-4',
        submit: {
          type: 'btn',
          mode: 'flat',
          color: 'primary',
          label: submitLabel,
        },
      },
    };
    return content;
  }
}
