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

  ngAfterViewInit(): void {
    this.template = this.ele.nativeElement.querySelector('.template');
    this.render(this.content);
  }

  render(content: any): void {
    if (this.screenService.isPlatformBrowser()) {
      const { html, json, isAPI, api } = content;
      if (isAPI && api) {
        this.fetchContent('');
      } else {
        if (json) {
          this.renderView(json, html);
          this.pager.set(null);
        } else {
          this.renderView(
            {},
            `<div class="m-5 p-5 bg-red-100 rounded-lg">意外错误，请检查配置。</div>`
          );
          this.pager.set(null);
        }
      }
    }
  }

  fetchContent(params: string): void {
    const { html, api } = this.content;
    if (api) {
      this.nodeService
        .fetch(api, params)
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
