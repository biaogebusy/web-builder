import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  inject,
  signal,
} from '@angular/core';
import type { ICustomTemplate } from '@core/interface/IBuilder';
import DOMPurify from 'dompurify';
import { NodeService } from '@core/service/node.service';
import Mustache from 'mustache';
import { IPager } from '@core/interface/widgets/IWidgets';
import { PageEvent } from '@angular/material/paginator';
import { ScreenService } from '@core/service/screen.service';
import { catchError, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UtilitiesService } from '@core/service/utilities.service';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { CORE_CONFIG } from '@core/token/token-providers';
declare let Swiper: any;
declare let echarts: any;
@Component({
  selector: 'app-custom-template',
  templateUrl: './custom-template.component.html',
  styleUrls: ['./custom-template.component.scss'],
  standalone: false,
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
    const sanitized = DOMPurify.sanitize(html);
    this.template.innerHTML = Mustache.render(sanitized, content);
  }
}
