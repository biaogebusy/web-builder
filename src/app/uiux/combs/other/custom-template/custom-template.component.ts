import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import type { ICustomTemplate } from '@core/interface/IBuilder';
import Handlebars from 'handlebars';
import DOMPurify from 'dompurify';
import { NodeService } from '@core/service/node.service';

@Component({
  selector: 'app-custom-template',
  templateUrl: './custom-template.component.html',
  styleUrls: ['./custom-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTemplateComponent implements AfterViewInit {
  @Input() content: ICustomTemplate;

  constructor(private ele: ElementRef, private nodeService: NodeService) {}

  ngAfterViewInit(): void {
    this.render(this.content);
  }

  render(content: any): void {
    const { html, json, isAPI, api } = content;
    const parent = this.ele.nativeElement.querySelector('.template');
    if (isAPI && api) {
      this.nodeService.fetch(api, 'noCache=true').subscribe((res) => {
        this.renderView(res, parent, html);
      });
    } else {
      this.renderView(json, parent, html);
    }
  }

  renderView(content: any, parent: Element, html: string): void {
    const sanitized = DOMPurify.sanitize(html);
    const template = Handlebars.compile(sanitized);
    const component = template(content);
    parent.innerHTML = component;
  }
}
