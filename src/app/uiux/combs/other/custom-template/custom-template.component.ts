import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  inject,
  signal,
} from '@angular/core';
import type { ICustomTemplate, ICustomTemplateDialog } from '@core/interface/IBuilder';
import DOMPurify from 'dompurify';
import { NodeService } from '@core/service/node.service';
import Mustache from 'mustache';
import { IPager } from '@core/interface/widgets/IWidgets';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ScreenService } from '@core/service/screen.service';
import { catchError, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UtilitiesService } from '@core/service/utilities.service';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { CORE_CONFIG } from '@core/token/token-providers';
import { IDialog } from '@core/interface/IDialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
declare let Swiper: any;
declare let echarts: any;
@Component({
  selector: 'app-custom-template',
  templateUrl: './custom-template.component.html',
  styleUrls: ['./custom-template.component.scss'],
  imports: [MatPaginatorModule],
})
export class CustomTemplateComponent implements AfterViewInit {
  @Input() content: ICustomTemplate;
  public pager = signal<IPager | null>(null);
  private ele = inject(ElementRef);
  private screenService = inject(ScreenService);
  private nodeService = inject(NodeService);
  private template: Element;
  private destroyRef = inject(DestroyRef);
  private util = inject(UtilitiesService);
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private dialog = inject(MatDialog);
  private dialogClickHandler?: (event: Event) => void;

  ngAfterViewInit(): void {
    this.template = this.ele.nativeElement.querySelector('.template');
    const fontawesome = this.util.getLibraries('fontAwesome', 'cdn', 'style');
    this.util.loadStyle(fontawesome);
    this.render(this.content);
  }

  async render(content: any): Promise<void> {
    if (this.screenService.isPlatformBrowser()) {
      const { html, json, isAPI, api } = content;
      if (isAPI && api) {
        this.fetchContent('');
      } else {
        try {
          this.renderView(json, html);
          this.pager.set(null);
        } catch (e) {
          this.renderView(
            {},
            `<div class="m-5 p-5 bg-red-100 rounded-lg">意外错误，请检查配置。</div>`
          );
          this.pager.set(null);
        }
      }
      if (html.includes('data-swiper')) {
        this.loadSwiper();
      }

      if (html.includes('data-echarts')) {
        this.loadEchars();
      }
    }
  }

  async loadSwiper(): Promise<void> {
    if (this.coreConfig.librariesUseLocal) {
      await this.util.loadStyle('/assets/injects/swiper/swiper-bundle.min.css');
      await this.util.loadScript('/assets/injects/swiper/swiper-bundle.min.js');
    } else {
      const swiperStyle = this.util.getLibraries('swiper', 'cdn', 'style');
      const swiperScript = this.util.getLibraries('swiper', 'cdn', 'script');
      await this.util.loadStyle(swiperStyle);
      await this.util.loadScript(swiperScript);
      this.ele.nativeElement.querySelectorAll('.swiper').forEach((el: any) => {
        if (el) {
          const options = JSON.parse(el.getAttribute('data-swiper'));
          // tslint:disable-next-line:no-unused-expression
          new Swiper(el, options);
        }
      });
    }
  }

  async loadEchars(): Promise<void> {
    const echartsScript = this.util.getLibraries('echarts', 'cdn', 'script');
    await this.util.loadScript(echartsScript);
    this.ele.nativeElement.querySelectorAll('.chart').forEach((el: any) => {
      if (el) {
        const options = JSON.parse(el.getAttribute('data-echarts'));
        const chart = echarts.init(el);
        chart.setOption(options);
      }
    });
  }

  fetchContent(params: string): void {
    const { html, api } = this.content;
    if (api) {
      this.nodeService
        .fetch(api.trim(), params)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError(error => {
            console.log(error);
            return of({
              ok: false,
              message: error.message,
            });
          })
        )
        .subscribe(res => {
          if (res?.ok === false) {
            this.util.openSnackbar(res.message, 'ok');
            this.renderView({}, `<div class="m-5 p-5 bg-red-100 rounded-lg">${res.message}</div>`);
          } else {
            const { rows, pager } = res;
            this.renderView(res, html);
            if (rows && pager) {
              this.pager.set(this.nodeService.handlerPager(pager, rows.length));
            }
          }
        });
    }
  }

  onPageChange(pageEvent: PageEvent): void {
    const { pageIndex } = pageEvent;
    this.fetchContent(`page=${pageIndex}`);
  }

  renderView(content: any, html: string): void {
    const sanitized = DOMPurify.sanitize(html, {
      ADD_TAGS: ['style'],
      ADD_ATTR: ['data-dialog'],
      FORCE_BODY: true,
    });
    this.template.innerHTML = Mustache.render(sanitized, content);
    this.bindDialogTriggers();
  }

  private bindDialogTriggers(): void {
    if (this.dialogClickHandler) {
      this.template.removeEventListener('click', this.dialogClickHandler);
      this.dialogClickHandler = undefined;
    }
    const dialogs = this.content.dialogs;
    if (!dialogs?.length) {
      return;
    }
    const dialogMap = new Map<string, ICustomTemplateDialog>();
    dialogs.forEach(d => {
      if (d?.key) {
        dialogMap.set(d.key, d);
      }
    });
    if (dialogMap.size === 0) {
      return;
    }
    this.template.querySelectorAll<HTMLElement>('[data-dialog]').forEach(el => {
      el.style.cursor = 'pointer';
    });
    this.dialogClickHandler = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest('[data-dialog]') as HTMLElement | null;
      if (!trigger || !this.template.contains(trigger)) {
        return;
      }
      const key = trigger.getAttribute('data-dialog');
      if (!key) {
        return;
      }
      const config = dialogMap.get(key);
      if (!config) {
        console.warn(`[custom-template] dialog key "${key}" not found in content.dialogs`);
        return;
      }
      event.preventDefault();
      this.openDialog(config);
    };
    this.template.addEventListener('click', this.dialogClickHandler);
    this.destroyRef.onDestroy(() => {
      if (this.dialogClickHandler) {
        this.template.removeEventListener('click', this.dialogClickHandler);
        this.dialogClickHandler = undefined;
      }
    });
  }

  private openDialog(config: ICustomTemplateDialog): void {
    const inputData = Array.isArray(config.content) ? config.content : { content: config.content };
    const dialogData: IDialog = {
      disableActions: true,
      inputData,
    };
    const rawPanelClass = config.params?.panelClass;
    const panelClass = Array.isArray(rawPanelClass)
      ? rawPanelClass
      : typeof rawPanelClass === 'string' && rawPanelClass.trim()
        ? rawPanelClass.trim().split(/\s+/)
        : ['close-outside', 'dialog-p-0'];
    this.dialog.open(DialogComponent, {
      width: config.params?.width || '800px',
      height: config.params?.height || 'auto',
      ...config.params,
      panelClass,
      data: dialogData,
    });
  }
}
