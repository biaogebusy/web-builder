import { DestroyRef, Injectable, inject, signal } from '@angular/core';
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
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import type { IBranding } from '@core/interface/branding/IBranding';
import { ContentService } from '@core/service/content.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { IBrandingNode, listBrandingNodes, pickBrandingNode } from './branding-save.util';

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
  private readonly loadingState = signal(false);
  private readonly nodesState = signal<IBrandingNode[]>([]);
  private readonly refreshRequests = new Subject<void>();
  private readonly nodes$ = listBrandingNodes(this.nodeService).pipe(
    tap({ error: () => this.reportLoadError() }),
    takeUntilDestroyed(this.destroyRef),
    shareReplay(1)
  );

  /** Includes pending node resolution so saving cannot target the previous selection. */
  readonly loading = this.loadingState.asReadonly();
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
                  return this.readBranding(node);
                }),
                finalize(() => this.loadingState.set(false))
              );
            })
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(branding => {
        target.applyBranding(branding);
        this.loadingState.set(false);
      });
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
      this.loadingState.set(true);
      return this.contentService.loadBranding(`/${node.langcode}/`);
    }).pipe(
      catchError(() => {
        this.reportLoadError();
        return EMPTY;
      }),
      finalize(() => this.loadingState.set(false))
    );
  }

  private reportLoadError(): void {
    this.util.openSnackbar(this.translate.instant('BUILDER.EDIT_BRANDING.LOAD_FAIL'));
  }
}
