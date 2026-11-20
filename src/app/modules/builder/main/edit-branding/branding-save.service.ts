import { DestroyRef, Injectable, WritableSignal, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { IBranding } from '@core/interface/branding/IBranding';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { mergeBrandingJson } from './branding-json.util';
import {
  BRANDING_JSON_ENDPOINT,
  IBrandingNode,
  buildBrandingUpdateBody,
} from './branding-save.util';

/** Save inputs keep section construction in the owning editor. */
export interface BrandingSaveRequest<Section extends 'header' | 'footer'> {
  /** Node and content language selected by the editor. */
  node: IBrandingNode;
  /** Loaded branding whose other section must remain unchanged. */
  branding: IBranding;
  /** Branding section to replace. */
  section: Section;
  /** Build after the node check and after entering the saving state. */
  buildSection: () => NonNullable<IBranding[Section]>;
  /** Custom JSON when JSON editing is enabled. */
  customJson?: string;
}

/** Draft feedback remains owned by the component that started the save. */
export interface BrandingSaveState {
  /** Clear only after the existing writer returns a truthy result. */
  dirty: WritableSignal<boolean>;
  /** Clear only after nonempty custom JSON is accepted. */
  jsonError: WritableSignal<string>;
}

/** Provide per editor so pending writes end with that editor's lifetime. */
@Injectable()
export class BrandingSaveService {
  private readonly savingState = signal(false);
  private readonly builderService = inject(BuilderService);
  private readonly util = inject(UtilitiesService);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  /** Whether this editor is waiting for its save response. */
  readonly saving = this.savingState.asReadonly();

  /** Save one section using the existing JSON merge, writer and feedback rules. */
  save<Section extends 'header' | 'footer'>(
    request: BrandingSaveRequest<Section>,
    state: BrandingSaveState
  ): void {
    if (!request.node.uuid) {
      this.util.openSnackbar(this.translate.instant('BUILDER.EDIT_BRANDING.NOT_FOUND_NODE'));
      return;
    }

    this.savingState.set(true);
    let section = request.buildSection();
    if (request.customJson) {
      try {
        section = mergeBrandingJson(section, request.customJson);
        state.jsonError.set('');
      } catch {
        this.savingState.set(false);
        this.util.openSnackbar(
          this.translate.instant('BUILDER.EDIT_BRANDING.JSON_FORMAT_ERROR'),
          'ok'
        );
        return;
      }
    }

    this.builderService
      .updateAttributes(
        request.node,
        BRANDING_JSON_ENDPOINT,
        buildBrandingUpdateBody(request.branding, request.section, section),
        {}
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          this.savingState.set(false);
          if (res) {
            state.dirty.set(false);
            this.util.openSnackbar(
              this.translate.instant(
                request.section === 'header'
                  ? 'BUILDER.EDIT_BRANDING.HEADER_UPDATE_SUCCESS'
                  : 'BUILDER.EDIT_BRANDING.FOOTER_UPDATE_SUCCESS'
              ),
              'ok'
            );
          }
        },
        error: () => {
          this.savingState.set(false);
          this.util.openSnackbar(this.translate.instant('BUILDER.EDIT_BRANDING.UPDATE_FAIL'));
        },
      });
  }
}
