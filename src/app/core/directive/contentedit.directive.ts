import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { BuilderState } from '@core/state/BuilderState';
import { set } from 'lodash-es';
@Directive({
  selector: '[contentedit]',
})
export class ContenteditDirective implements AfterViewInit {
  constructor(private el: ElementRef, private builder: BuilderState) {}

  @HostListener('blur') onBlur(event: Event) {
    const ele = this.el.nativeElement;
    if (ele.closest('.component-item')) {
      ele.contentEditable = 'false';

      const path = this.generatePath(ele);
      set(this.builder.currentPage.body, path, ele.innerHTML);
      this.builder.saveLocalVersions();
    }
  }

  @HostListener('dblclick') onDbClick(event: Event) {
    const ele = this.el.nativeElement;
    if (ele.closest('.component-item')) {
      ele.contentEditable = 'true';
    }
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    const ele = this.el.nativeElement;
    if (ele.closest('.component-item')) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }

  @Input() set contentedit(key: string) {
    const ele = this.el.nativeElement;
    ele.setAttribute('data-path', key);
  }

  ngAfterViewInit(): void {
    const ele = this.el.nativeElement;
    if (ele.closest('.component-item')) {
      ele.contentEditable = 'false';
    }
  }

  generatePath(contenteditableElement: any): string {
    let path = contenteditableElement.getAttribute('data-path');
    let element = contenteditableElement;
    while (
      element &&
      element.parentNode &&
      !element.parentNode.classList.contains('component-item')
    ) {
      const dataPath = element.parentNode.getAttribute('data-path');
      if (dataPath) {
        path = `${dataPath}.${path}`;
      }
      element = element.parentNode;
    }
    return path;
  }
}
