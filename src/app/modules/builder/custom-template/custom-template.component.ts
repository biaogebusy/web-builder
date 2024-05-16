import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
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
export class CustomTemplateComponent implements OnInit, AfterViewInit {
  @Input() content: ICustomTemplate;
  constructor(private ele: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.render(this.content);
  }

  render(content: ICustomTemplate): void {
    const { html, data } = content;
    const parent = this.ele.nativeElement.querySelector('.custom-template');
    if (parent) {
      const sanitized = DOMPurify.sanitize(html);
      const template = Handlebars.compile(sanitized);
      const component = template(data);
      parent.innerHTML = component;
    }
  }
}
