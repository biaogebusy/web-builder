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
 * 画布图片内联编辑:点击图片进入选中态(描边高亮),在图片上方浮出操作条
 * (上传替换/媒体库/ALT/清除样式/更多设置),替代旧的右侧 drawer 首选路径;
 * 完整表单(宽高/圆角/阴影/比例/填充)仍以"更多设置"回落到 drawer。
 * 全局同一时刻只有一张选中图片;本服务只应经 ContenteditDirective 动态 import
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

  /** 当前选中图片、其 src 字段路径(generatePath 产物)与点击处的路由级环境注入器 */
  private readonly active = signal<{
    img: HTMLImageElement;
    path: string;
    envInjector: EnvironmentInjector;
  } | null>(null);
  private barRef: ComponentRef<InlineImageBarComponent> | null = null;
  /** 媒体库选择的匹配令牌,同 img-picker 的 time 机制 */
  private mediaToken: Date | null = null;

  private readonly onDocPointerDown = (event: Event): void => {
    const current = this.active();
    if (!current) {
      return;
    }
    const target = event.target as HTMLElement;
    const host = this.barRef?.location.nativeElement as HTMLElement | undefined;
    // 点击图片自身、操作条、以及浮层(媒体库对话框/tooltip)不取消选中
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
    // 媒体库对话框的选择结果:令牌匹配才认领(同页可能有其他 img-picker 在监听)
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

  /** 本地上传并替换(同 tiptap 编辑器的图片插入通道) */
  uploadImage(): void {
    this.nodeService.pickAndUploadImage(url => this.replaceSrc(url));
  }

  /** 打开媒体库对话框,选择结果经 selectedMedia$ 回填 */
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
      // 本服务是 root 单例,root MatDialog 默认用根注入器创建对话框内容,
      // 解析不到路由级令牌(BUILDER_CONFIG 等);改用选中时捕获的环境注入器
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

  /** 完整图片表单(宽高/圆角/阴影/比例/填充)回落到右侧 drawer */
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

  /** src 路径(如 'img.src' 或 'src')换算到同级字段路径 */
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
