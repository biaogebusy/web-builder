import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { BuilderState } from '@core/state/BuilderState';
import { set } from 'lodash-es';
@Directive({
  selector: '[contentedit]',
})
export class ContenteditDirective {
  constructor(private el: ElementRef, private builder: BuilderState) {}

  @HostListener('blur') onBlur(event: Event) {
    console.log(this.el);
    this.el.nativeElement.contentEditable = 'false';
    const parentElement =
      this.el.nativeElement.parentNode.closest('.component-item');

    const path = this.generatePath(parentElement);
    console.log(path);
    set(this.builder.currentPage, path, this.el.nativeElement.innerText);
    this.builder.saveLocalVersions();
  }

  @HostListener('dblclick') onDbClick(event: Event) {
    this.el.nativeElement.contentEditable = 'true';
  }

  generatePath(parent: any): string {
    const elements = parent.querySelectorAll('[data-path]');
    let path: any = ['body'];

    elements.forEach((element: HTMLElement) => {
      const dataPath = element.getAttribute('data-path');
      if (dataPath) {
        path.push(dataPath);
      }
    });

    return path.join('.');
  }
}
