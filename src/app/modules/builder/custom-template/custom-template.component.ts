import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ICustomTemplate } from '@core/interface/IBuilder';
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
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.render(this.content);
  }

  render(content: ICustomTemplate): void {
    const { html, data } = content;
    const parent = document.querySelector('.custom-template');
    if (parent) {
      const sanitized = DOMPurify.sanitize(html);
      const template = Handlebars.compile(sanitized);
      const component = template(data);
      parent.innerHTML = component;
    }
  }
}
