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

@Component({
  selector: 'app-custom-template',
  templateUrl: './custom-template.component.html',
  styleUrls: ['./custom-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTemplateComponent implements AfterViewInit {
  @Input() content: ICustomTemplate;

  constructor(private ele: ElementRef) { }

  ngAfterViewInit(): void {
    this.render(this.content);
  }

  render(content: any): void {
    const { html, json } = content;
    const parent = this.ele.nativeElement.querySelector('.template');
    if (parent) {
      const sanitized = DOMPurify.sanitize(html);
      const template = Handlebars.compile(sanitized);
      const component = template(json);
      parent.innerHTML = component;
    }
  }
}
