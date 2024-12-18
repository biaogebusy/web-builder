import { DOCUMENT, formatDate } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { ScreenService } from './screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { IDynamicInputs } from '@core/interface/IAppConfig';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ContentState } from '@core/state/ContentState';
@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  private clipboard = inject(Clipboard);
  private snackbar = inject(MatSnackBar);
  private screenService = inject(ScreenService);
  private document = inject(DOCUMENT);
  private coreConfig = inject(CORE_CONFIG);
  private contentState = inject(ContentState);
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
    this.document.head.appendChild(script);
  }

  getFileType(href: string): string {
    if (!href) {
      return '';
    }
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

  getDatesInRange(startDate: Date, endDate: Date, formarDate: string): string[] {
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
    triggerEle: HTMLElement,
    index?: number
  ): void {
    if (this.screenService.isPlatformBrowser() && this.coreConfig.animate) {
      let content: any = {};
      if (index !== undefined) {
        this.contentState.componentCount$.next(index);
      }
      if (!inputs.type && inputs.content) {
        content = inputs.content;
      } else {
        content = inputs;
      }
      const { animate } = content;
      if (animate?.gsap?.enable && animate?.aos?.enable) {
        this.openSnackbar(`不能同时开启AOS和GSAP动画，请检查！`, 'ok', { duration: 5000 });
        setTimeout(() => {
          animateEle.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
          animateEle.parentElement?.classList.add('animate-warn');
        }, 800);
      }
      if (animate?.gsap) {
        const { enable, trigger, from } = animate.gsap;
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
              } ${trigger?.onEnterBack || 'none'} ${trigger?.onLeaveBack || 'none'}`,
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

      if (animate?.aos) {
        const { enable, animation, behaviour } = animate.aos;
        if (enable) {
          animateEle.classList.add('aos-item');
          animateEle.setAttribute('data-aos', animation);
          Object.keys(behaviour).forEach(key => {
            animateEle.setAttribute(`data-aos-${key}`, behaviour[key]);
          });
        } else {
          animateEle.classList.remove('aos-item');
          animateEle.removeAttribute('data-aos');
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
