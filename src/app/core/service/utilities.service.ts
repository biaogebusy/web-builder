import { formatDate } from '@angular/common';
import { Injectable, inject, DOCUMENT } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { ScreenService } from './screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { IDynamicInputs } from '@core/interface/IAppConfig';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { debounce, isNil, omitBy } from 'lodash-es';
import { Subject } from 'rxjs';
import AOS from 'aos';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  private clipboard = inject(Clipboard);
  private snackbar = inject(MatSnackBar);
  private screenService = inject(ScreenService);
  private document = inject(DOCUMENT);
  private coreConfig = inject(CORE_CONFIG);
  public animateElement$ = new Subject<Element>();
  private observer: MutationObserver;
  private debouncedRefresh: () => void;

  constructor() {
    this.debouncedRefresh = debounce(() => {
      AOS.refresh();
    }, 600);
  }

  getLibraries(library: string, from: string, type: string): any {
    const libraries: any = {
      video: {
        local: {
          style: '/assets/injects/video-js/video-js.min.css',
        },
        cdn: {
          style: 'https://cdnjs.cloudflare.com/ajax/libs/video.js/8.16.1/video-js.min.css',
        },
      },
      lightgallery: {
        local: {
          style: '/assets/injects/lightgallery/css/lightgallery-bundle.min.css',
        },
        cdn: {
          style:
            'https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.8.3/css/lightgallery-bundle.min.css',
        },
      },
      jsoneditor: {
        local: {
          style: '/assets/injects/jsoneditor/jsoneditor.min.css',
          script: '/assets/injects/jsoneditor/jsoneditor.min.js',
        },
        cdn: {
          style: 'https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/10.0.3/jsoneditor.min.css',
          script: 'https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/10.0.3/jsoneditor.min.js',
        },
      },
      quill: {
        local: {
          style: ['/assets/injects/quill/quill.core.css', '/assets/injects/quill/quill.snow.css'],
        },
        cdn: {
          style: [
            'https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.2/quill.core.css',
            'https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.2/quill.snow.min.css',
          ],
        },
      },
      swiper: {
        local: {
          style: '/assets/injects/swiper/swiper-bundle.min.css',
        },
        cdn: {
          style: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js',
        },
      },
      highlight: {
        local: {
          style: '/assets/injects/highlight.js/styles/atom-one-dark.css',
        },
        cdn: {
          style:
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/atom-one-dark.min.css',
        },
      },
      aos: {
        local: {
          style: '/assets/injects/aos/dist/aos.css',
        },
        cdn: {
          style: 'https://cdnjs.cloudflare.com/ajax/libs/aos/3.0.0-beta.6/aos.css',
        },
      },
      fontAwesome: {
        cdn: {
          style: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        },
      },
    };

    return libraries[library][from][type];
  }

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

  loadScript(src: string, id?: string, defer?: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = this.document.createElement('script');
      script.src = src;
      script.async = true;

      if (defer) script.defer = true;
      if (id) script.id = id;

      // 设置加载完成回调
      script.onload = () => {
        script.onload = null; // 清理事件处理器
        script.onerror = null;
        resolve();
      };

      // 设置错误处理
      script.onerror = error => {
        script.remove(); // 移除失败脚本
        reject(new Error(`Failed to load script: ${src}`, { cause: error }));
      };

      this.document.head.appendChild(script);
    });
  }

  loadStyle(href: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.document.querySelector(`link[href="${href}"]`)) {
        resolve();
        return;
      }
      const link = this.document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => resolve();
      link.onerror = () => reject(`Failed to load ${href}`);
      this.document.head.appendChild(link);
    });
  }

  getFileType(href: string): string {
    if (!href) {
      return '';
    }
    const url = href.toLowerCase();
    const pdfReg = /^.+(\.pdf)/;
    const svgReg = /^.+(\.svg)/;
    const txtReg = /^.+(\.txt)/;
    const wordReg = /^.+(\.doc|\.docx)/;
    const excelReg = /^.+(\.xls|\.xlsx)/;
    const jpgReg = /^.+(\.png|\.jpg|\.jpeg|\.bmp|\.gif|\.webp)/;
    if (pdfReg.test(url)) {
      return 'pdf';
    }
    if (svgReg.test(url)) {
      return 'svg';
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

  async initAnimate(
    inputs: IDynamicInputs,
    animateEle: HTMLElement,
    triggerEle: HTMLElement,
    index?: number
  ): Promise<void> {
    if (this.screenService.isPlatformBrowser() && this.coreConfig.animate) {
      let content: any = {};

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
          setTimeout(() => {
            animateEle.style.display = 'block';
            animateEle.classList.add('gsap-item');
            const tl = window.gsap.timeline({
              scrollTrigger: {
                trigger: triggerEle,
                start: trigger.start || '20px 80%',
                end: trigger.bottom || 'bottom 100px',
                markers: trigger?.markers,
                scrub: trigger?.scrub,
                scroller: this.getScroller(),
                toggleActions: `${trigger?.onEnter || 'restart'} ${
                  trigger?.onLeave || 'pause'
                } ${trigger?.onEnterBack || 'none'} ${trigger?.onLeaveBack || 'reverse'}`,
              },
            });
            if (from) {
              // 从一个状态到当前状态
              const vars = omitBy(from, value => {
                return isNil(value) || isNaN(value);
              });
              tl.from(animateEle, {
                ...vars,
              });
            }
            this.animateElement$.next(animateEle);
          }, 600);
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
          this.animateElement$.next(animateEle);
          this.refresh(animateEle);
        } else {
          animateEle.classList.remove('aos-item');
          animateEle.removeAttribute('data-aos');
        }
      }
    }
  }

  refresh(animateEle: Element): void {
    this.observer = new MutationObserver((mutations: MutationRecord[]) => {
      this.debouncedRefresh();
    });
    this.observer.observe(animateEle, {
      childList: true, // 监视子节点的添加或删除
      subtree: true, // 监视所有后代节点
      attributes: true, // 监视属性变化 (比如 style.height)
    });
  }

  getScroller(): HTMLElement | Window {
    const scroller = document.getElementById('gsap-scroller');
    if (scroller) {
      return scroller;
    } else {
      return window;
    }
  }

  generatePath(contenteditableElement: any): string {
    // 注意：get path只能在 component-item 区域使用
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

  chunkHTMLByBlocks(content: string): string[] {
    const chunks: string[] = [];
    const stack: { tag: string; startIndex: number }[] = [];
    if (!content) {
      return chunks;
    }

    // 匹配所有 HTML 标签，包括起始和结束标签
    const tagRegex = /<\/?([a-zA-Z0-9-]+)[^>]*>/g;

    let match: RegExpExecArray | null;
    let lastIndex = 0;

    while ((match = tagRegex.exec(content)) !== null) {
      const fullMatch = match[0]; // 完整的标签
      const tagName = match[1]; // 标签名
      const isClosingTag = fullMatch.startsWith('</'); // 是否是结束标签
      const currentIndex = match.index;

      if (!isClosingTag) {
        // 起始标签，压入堆栈
        stack.push({ tag: tagName, startIndex: currentIndex });
      } else {
        // 闭合标签，匹配堆栈中的起始标签
        const lastTag = stack.pop();
        if (lastTag && lastTag.tag === tagName) {
          // 提取完整块内容
          const chunk = content.slice(lastTag.startIndex, currentIndex + fullMatch.length);
          if (stack.length === 0) {
            // 只有在栈为空时，才视为一个完整块
            chunks.push(chunk);
            lastIndex = currentIndex + fullMatch.length;
          }
        }
      }
    }

    // 如果解析后有剩余内容，直接作为一个块添加
    if (lastIndex < content.length) {
      const remainingContent = content.slice(lastIndex).trim();
      if (remainingContent) {
        chunks.push(remainingContent);
      }
    }

    return chunks;
  }

  // 安全插入分块内容
  insertChunkSafely(editor: any, chunk: string): void {
    const currentLength = editor.getLength();
    editor.clipboard.dangerouslyPasteHTML(currentLength - 1, chunk);
  }

  lazyLoadContent(quillInstance: any, contentChunks: string[]): void {
    if (!quillInstance) {
      return;
    }

    let chunkIndex = 0;
    const interval = setInterval(() => {
      if (chunkIndex >= contentChunks.length) {
        clearInterval(interval);
        return;
      }

      const chunk = contentChunks[chunkIndex];
      this.insertChunkSafely(quillInstance, chunk);

      chunkIndex++;
    }, 100); // 每 100ms 加载一块内容
  }
}
