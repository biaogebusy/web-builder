import { isPlatformServer } from '@angular/common';
import { DestroyRef, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  defer,
  finalize,
  map,
  of,
  retry,
  shareReplay,
  startWith,
  switchMap,
  tap,
  timeout,
} from 'rxjs';
import type { IBranding } from '@core/interface/branding/IBranding';
import { ContentService } from '@core/service/content.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import {
  BRANDING_ALIAS,
  IBrandingNode,
  listBrandingNodes,
  pickBrandingNode,
} from './branding-save.util';

/** The owning editor applies node identity before initializing its own forms. */
export interface BrandingEditorTarget {
  /** Store the selected node and content language without starting another read. */
  selectNode: (node: IBrandingNode) => void;
  /** Initialize section-specific forms and preview from the current read. */
  applyBranding: (branding: IBranding) => void;
}

/** Provide per editor to keep route changes, refreshes and teardown in one read scope. */
@Injectable()
export class BrandingEditorContextService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly contentService = inject(ContentService);
  private readonly nodeService = inject(NodeService);
  private readonly util = inject(UtilitiesService);
  private readonly translate = inject(TranslateService);
  private readonly isServer = isPlatformServer(inject(PLATFORM_ID));
  private readonly loadingState = signal(false);
  private readonly readyState = signal(false);
  private readonly nodesState = signal<IBrandingNode[]>([]);
  private readonly refreshRequests = new Subject<void>();
  private readonly nodes$ = listBrandingNodes(this.nodeService).pipe(
    tap({ error: () => this.reportLoadError() }),
    takeUntilDestroyed(this.destroyRef),
    shareReplay(1)
  );

  /** Includes pending node resolution so saving cannot target the previous selection. */
  readonly loading = this.loadingState.asReadonly();
  /** Saving requires a successful read and form initialization for the current selection. */
  readonly ready = this.readyState.asReadonly();
  /** Nodes used by the optional content-language switcher. */
  readonly nodes = this.nodesState.asReadonly();

  /** Connect once during initialization; observations end with the component. */
  connect(showLanguages: boolean, target: BrandingEditorTarget): void {
    const nodes$ = this.nodes$.pipe(
      tap(nodes => {
        if (showLanguages) this.nodesState.set(nodes);
      }),
      // The shared source reports each failure once and permits a later route to retry.
      catchError(() => EMPTY)
    );
    if (showLanguages) {
      nodes$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }
    this.route.queryParams
      .pipe(
        switchMap(params =>
          this.refreshRequests.pipe(
            startWith(undefined),
            switchMap(() => {
              this.readyState.set(false);
              this.loadingState.set(true);
              return this.resolveNode(params, nodes$).pipe(
                switchMap(node => {
                  if (!node) {
                    this.util.openSnackbar(
                      this.translate.instant('BUILDER.EDIT_BRANDING.MISSING_NODE')
                    );
                    return EMPTY;
                  }
                  target.selectNode(node);
                  return this.readBranding(node).pipe(
                    tap(branding => {
                      target.applyBranding(branding);
                      this.readyState.set(true);
                      this.loadingState.set(false);
                    })
                  );
                }),
                catchError(() => {
                  this.reportLoadError();
                  return EMPTY;
                }),
                finalize(() => this.loadingState.set(false))
              );
            })
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  /** Reload the current route, reusing its node list or retrying a failed list read. */
  reload(): void {
    this.refreshRequests.next();
  }

  private resolveNode(
    params: Partial<IBrandingNode>,
    nodes$: Observable<IBrandingNode[]>
  ): Observable<IBrandingNode | null> {
    const { uuid, langcode } = params;
    if (uuid) {
      return of({ uuid, langcode: langcode ?? '' });
    }
    const target = langcode || this.nodeService.getLang(this.nodeService.pageUrl)?.langCode;
    return nodes$.pipe(map(nodes => pickBrandingNode(nodes, target)));
  }

  private readBranding(node: IBrandingNode): Observable<IBranding> {
    return defer(() => {
      // Resolve the language prefix before adding the fixed alias, including the default language.
      const { lang } = this.contentService.getUrlPath(`/${node.langcode}/`);
      const request = this.contentService.loadJSON<IBranding>(`${lang}${BRANDING_ALIAS}`);
      return this.isServer ? request : request.pipe(timeout(5000), retry({ count: 1, delay: 500 }));
    }).pipe(
      map(branding => {
        // The public endpoint can return a fallback page with HTTP 200. Do not edit that response.
        if (
          !isRecord(branding) ||
          !isRecord(branding.header) ||
          !isRecord(branding.header.params) ||
          !isRecord(branding.header.search) ||
          !isOptionalArray(branding.header.mainMenu) ||
          !isOptionalArray(branding.header.actions) ||
          (branding.footer != null &&
            (!isRecord(branding.footer) ||
              (branding.footer.params != null && !isRecord(branding.footer.params)) ||
              !isOptionalArray(branding.footer.mainMenu) ||
              !isOptionalArray(branding.footer.mobileMenu) ||
              !isOptionalArray(branding.footer.fixBar)))
        ) {
          throw new Error('Branding response is not editable');
        }
        return branding;
      })
    );
  }

  private reportLoadError(): void {
    this.util.openSnackbar(this.translate.instant('BUILDER.EDIT_BRANDING.LOAD_FAIL'));
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isOptionalArray(value: unknown): boolean {
  return value == null || Array.isArray(value);
}
