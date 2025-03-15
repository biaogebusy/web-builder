import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  inject,
} from '@angular/core';
import type { ICustomTemplate } from '@core/interface/IBuilder';
import DOMPurify from 'dompurify';
import { NodeService } from '@core/service/node.service';
import Mustache from 'mustache';
import { IPager } from '@core/interface/widgets/IWidgets';
import { PageEvent } from '@angular/material/paginator';
import { ScreenService } from '@core/service/screen.service';

@Component({
    selector: 'app-custom-template',
    templateUrl: './custom-template.component.html',
    styleUrls: ['./custom-template.component.scss'],
    standalone: false
})
export class CustomTemplateComponent implements AfterViewInit {
  @Input() content: ICustomTemplate;
  pager: IPager | null;
  ele = inject(ElementRef);
  cd = inject(ChangeDetectorRef);
  screenService = inject(ScreenService);
  nodeService = inject(NodeService);
  template: Element;

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
        this.renderView(json, html);
        this.pager = null;
        this.cd.detectChanges();
      }
    }
  }

  fetchContent(params: string): void {
    const { html, api } = this.content;
    if (api) {
      this.nodeService.fetch(api, params).subscribe(res => {
        const { rows, pager } = res;
        this.renderView(res, html);
        if (rows && pager) {
          this.pager = this.nodeService.handlerPager(pager, rows.length);
          this.cd.detectChanges();
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
