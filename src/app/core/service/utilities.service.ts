import { DOCUMENT, formatDate } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { ScreenService } from './screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig, IDynamicInputs } from '@core/interface/IAppConfig';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(
    private clipboard: Clipboard,
    private snackbar: MatSnackBar,
    private screenService: ScreenService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig
  ) {}

  getIndexTitle(title: string): string {
    return title.substring(0, 1);
  }

  get fullYear(): number {
    return new Date().getFullYear();
  }

  openSnackbar(message: string, action = '', config?: MatSnackBarConfig): void {
    this.snackbar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
      ...config,
    });
  }

  loadScript(src: string, id?: any, defer?: boolean): any {
    const script = this.document.createElement('script');
    script.src = src;
    script.async = true;
    if (defer) {
      script.defer = true;
    }
    if (id) {
      script.id = id;
    }
    this.document.body.appendChild(script);
  }

  getFileType(href: string): string {
    const url = href.toLowerCase();
    const pdfReg = /^.+(\.pdf)/;
    const txtReg = /^.+(\.txt)/;
    const wordReg = /^.+(\.doc|\.docx)/;
    const excelReg = /^.+(\.xls|\.xlsx)/;
    const jpgReg = /^.+(\.png|\.jpg|\.jpeg|\.bmp|\.gif|\.webp|\.svg)/;
    if (pdfReg.test(url)) {
      return 'pdf';
    }
    if (txtReg.test(url)) {
      return 'txt';
    }
    if (wordReg.test(url)) {
      return 'word';
    }
    if (excelReg.test(url)) {
      return 'excel';
    }
    if (jpgReg.test(url)) {
      return 'picture';
    }
    return '';
  }

  getDatesInRange(
    startDate: Date,
    endDate: Date,
    formarDate: string
  ): string[] {
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
      dates.push(formatDate(date, formarDate, 'en-US'));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }

  copy(content: any): void {
    this.clipboard.copy(content);
  }

  initAnimate(
    inputs: IDynamicInputs,
    animateEle: HTMLElement,
    triggerEle: HTMLElement
  ): void {
    if (this.screenService.isPlatformBrowser() && this.coreConfig.animate) {
      let gsapConfig;
      if (!inputs.type && inputs.content) {
        if (inputs?.content?.animate) {
          gsapConfig = inputs.content.animate;
        }
      } else {
        gsapConfig = inputs.animate;
      }
      if (gsapConfig) {
        const { enable, trigger, from } = gsapConfig;
        if (enable) {
          animateEle.style.display = 'block';
          const tl = window.gsap.timeline({
            scrollTrigger: {
              trigger: triggerEle,
              start: trigger?.start || 'top 85%',
              end: trigger?.end || 'bottom 30%',
              markers: trigger?.markers,
              scrub: trigger?.scrub,
              scroller: this.getScroller(),
              toggleActions: `${trigger?.onEnter || 'paly'} ${
                trigger?.onLeave || 'none'
              } ${trigger?.onEnterBack || 'none'} ${
                trigger?.onLeaveBack || 'none'
              }`,
            },
          });
          if (from) {
            // 从一个状态到当前状态
            tl.from(animateEle, {
              ...from,
            });
          }
        }
      }
    }
  }

  getScroller(): HTMLElement | Window {
    const scroller = document.getElementById('builder-list');
    if (scroller) {
      return scroller;
    } else {
      return window;
    }
  }

  generatePath(contenteditableElement: any): string {
    let path = contenteditableElement.getAttribute('data-path') || '';
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
    // 如果尾部为"."则去除，builder layout的场景
    return path.replace(/[.]*$/, '');
  }
}
