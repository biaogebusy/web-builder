import {
  ApplicationRef,
  ComponentRef,
  DOCUMENT,
  EnvironmentInjector,
  Injectable,
  createComponent,
  inject,
  signal,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDialog } from '@core/interface/IDialog';
import { IMetaEdit } from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { ManageService } from '@core/service/manage.service';
import { NodeService } from '@core/service/node.service';
import { TranslateService } from '@ngx-translate/core';
import { getInlineImg } from '@modules/builder/factory/getInlinImg';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { InlineImageBarComponent } from './inline-image-bar/inline-image-bar.component';

/**
 * Inline image editing on the canvas: clicking an image selects it (outline
 * highlight) and floats an action bar above it (upload/replace, media library,
 * ALT, clear styles, more settings), replacing the old right drawer as the
 * primary path; the full form (width/height, radius, shadow, ratio, object-fit)
 * still falls back to the drawer via "More settings". Only one image is
 * selected globally at a time; this service must only be dynamically imported
 * via ContenteditDirective.
 */
@Injectable({
  providedIn: 'root',
})
export class InlineImageService {
  private builder = inject(BuilderState);
  private appRef = inject(ApplicationRef);
  private envInjector = inject(EnvironmentInjector);
  private doc = inject<Document>(DOCUMENT);
  private dialog = inject(MatDialog);
  private manageService = inject(ManageService);
  private nodeService = inject(NodeService);
  private translate = inject(TranslateService);

  /** Currently selected image, its src field path (produced by generatePath), and the route-level environment injector at the click site */
  private readonly active = signal<{
    img: HTMLImageElement;
    path: string;
    envInjector: EnvironmentInjector;
  } | null>(null);
  private barRef: ComponentRef<InlineImageBarComponent> | null = null;
  /** Matching token for media-library selections, same time mechanism as img-picker */
  private mediaToken: Date | null = null;

  private readonly onDocPointerDown = (event: Event): void => {
    const current = this.active();
    if (!current) {
      return;
    }
    const target = event.target as HTMLElement;
    const host = this.barRef?.location.nativeElement as HTMLElement | undefined;
    // Clicking the image itself, the action bar, or overlays (media-library dialog/tooltip) must not deselect
    if (
      current.img === target ||
      host?.contains(target) ||
      target.closest?.('.cdk-overlay-container')
    ) {
      return;
    }
    this.deselect();
  };

  private readonly onDocKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.active()) {
      this.deselect();
    }
  };

  private readonly onViewportChange = (): void => {
    const current = this.active();
    if (current) {
      this.positionBar(current.img);
    }
  };

  constructor() {
    // Media-library dialog selection: claim only on token match (other img-pickers may be listening on the same page)
    this.builder.selectedMedia$.subscribe(({ img, time }) => {
      if (this.mediaToken && time === this.mediaToken) {
        this.mediaToken = null;
        this.dialog.closeAll();
        this.replaceSrc(img.src);
      }
    });
  }

  get activeImage(): HTMLImageElement | null {
    return this.active()?.img ?? null;
  }

  select(img: HTMLImageElement, path: string, envInjector: EnvironmentInjector): void {
    if (this.active()?.img === img) {
      return;
    }
    this.deselect();
    img.classList.add('inline-img-selected');
    this.active.set({ img, path, envInjector });
    const bar = this.ensureBar();
    bar.setInput('img', img);
    this.positionBar(img);
    this.doc.addEventListener('pointerdown', this.onDocPointerDown, true);
    this.doc.addEventListener('keydown', this.onDocKeydown);
    this.doc.addEventListener('scroll', this.onViewportChange, true);
    this.doc.defaultView?.addEventListener('resize', this.onViewportChange);
  }

  deselect(): void {
    const current = this.active();
    if (!current) {
      return;
    }
    current.img.classList.remove('inline-img-selected');
    this.active.set(null);
    this.barRef?.setInput('img', null);
    this.doc.removeEventListener('pointerdown', this.onDocPointerDown, true);
    this.doc.removeEventListener('keydown', this.onDocKeydown);
    this.doc.removeEventListener('scroll', this.onViewportChange, true);
    this.doc.defaultView?.removeEventListener('resize', this.onViewportChange);
  }

  /** Upload locally and replace (same channel as the tiptap editor's image insertion) */
  uploadImage(): void {
    this.nodeService.pickAndUploadImage(url => this.replaceSrc(url));
  }

  /** Open the media-library dialog; the selection is fed back via selectedMedia$ */
  openMediaLibrary(): void {
    this.mediaToken = new Date();
    const config: IDialog = {
      disableActions: true,
      inputData: {
        content: {
          type: 'manage-media',
          time: this.mediaToken,
          fullWidth: true,
        },
      },
    };
    this.dialog.open(DialogComponent, {
      width: '85vw',
      panelClass: this.manageService.mediaDialogClass,
      id: 'inline-image-media',
      data: config,
      // This service is a root singleton, and the root MatDialog creates dialog
      // content with the root injector by default, so route-level tokens
      // (BUILDER_CONFIG etc.) would not resolve; use the injector captured at
      // selection time instead.
      injector: this.active()?.envInjector,
    });
  }

  replaceSrc(url: string): void {
    const current = this.active();
    if (!current) {
      return;
    }
    this.builder.updatePageContentByPath(this.fieldPath(current.path, 'src'), url);
  }

  setAlt(alt: string): void {
    const current = this.active();
    if (!current) {
      return;
    }
    this.builder.updatePageContentByPath(this.fieldPath(current.path, 'alt'), alt);
  }

  clearStyles(): void {
    const current = this.active();
    if (!current) {
      return;
    }
    current.img.removeAttribute('style');
    this.builder.updatePageContentByPath(this.fieldPath(current.path, 'style'), {});
  }

  /** Full image form (width/height, radius, shadow, ratio, object-fit) falls back to the right drawer */
  openFullPanel(): void {
    const current = this.active();
    if (!current) {
      return;
    }
    const { img, path } = current;
    const src = img.getAttribute('src') ?? '';
    this.deselect();
    const meta: IMetaEdit = {
      type: 'inline-editor',
      mode: 'img',
      path,
      fullWidth: true,
      ele: img,
      fields: getInlineImg(img),
      data: {
        src,
        fileName: src.split('/').pop() ?? '',
        alt: img.getAttribute('alt'),
        tag: img.tagName,
      },
    };
    this.builder.rightContent$.next({
      title: this.translate.instant('BUILDER.INLINE_EDITOR.EDIT_IMG'),
      mode: 'over',
      hasBackdrop: false,
      style: {
        'width': '284px',
        'max-width': 'calc(100vw - 50px)',
      },
      elements: [meta],
    });
  }

  /** Convert an src path (e.g. 'img.src' or 'src') to the sibling field path */
  private fieldPath(srcPath: string, field: string): string {
    const dotIndex = srcPath.lastIndexOf('.');
    return dotIndex === -1 ? field : `${srcPath.slice(0, dotIndex)}.${field}`;
  }

  private positionBar(img: HTMLImageElement): void {
    const host = this.ensureBar().location.nativeElement as HTMLElement;
    const rect = img.getBoundingClientRect();
    const win = this.doc.defaultView;
    host.style.top = `${rect.top + (win?.scrollY ?? 0)}px`;
    host.style.left = `${rect.left + (win?.scrollX ?? 0)}px`;
  }

  private ensureBar(): ComponentRef<InlineImageBarComponent> {
    if (!this.barRef) {
      this.barRef = createComponent(InlineImageBarComponent, {
        environmentInjector: this.envInjector,
      });
      this.appRef.attachView(this.barRef.hostView);
      this.doc.body.appendChild(this.barRef.location.nativeElement);
      const instance = this.barRef.instance;
      instance.upload.subscribe(() => this.uploadImage());
      instance.library.subscribe(() => this.openMediaLibrary());
      instance.altApply.subscribe(alt => this.setAlt(alt));
      instance.clearStyles.subscribe(() => this.clearStyles());
      instance.more.subscribe(() => this.openFullPanel());
      instance.closed.subscribe(() => this.deselect());
    }
    return this.barRef;
  }
}
