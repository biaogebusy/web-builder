import { Injectable, inject, DOCUMENT } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { ScreenService } from './screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { IDynamicInputs } from '@core/interface/IAppConfig';
import type { JsonObject } from '@core/interface/common';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { isNil, omitBy } from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  private doc = inject(DOCUMENT);
  private clipboard = inject(Clipboard);
  private snackbar = inject(MatSnackBar);
  private screenService = inject(ScreenService);
  private document = inject(DOCUMENT);
  private coreConfig = inject(CORE_CONFIG);

  getLibraries(library: string, from: string, type: string): any {
    const libraries: any = {
      video: {
        local: {
          style: '/assets/injects/video-js/video-js.min.css',
          script: '/assets/injects/video-js/video.min.js',
        },
        cdn: {
          style: 'https://cdnjs.cloudflare.com/ajax/libs/video.js/8.16.1/video-js.min.css',
          script: 'https://cdnjs.cloudflare.com/ajax/libs/video.js/8.16.1/video.min.js',
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
          script: '/assets/injects/swiper/swiper-bundle.min.js',
        },
        cdn: {
          style: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.css',
          script: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js',
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
      echarts: {
        cdn: {
          script: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/6.0.0/echarts.min.js',
        },
      },
    };

    return libraries[library][from][type];
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
    if (!this.screenService.isPlatformBrowser()) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const existing = this.document.querySelector(
        `script[src="${src}"]`
      ) as HTMLScriptElement | null;
      if (existing) {
        if (existing.dataset?.loaded === 'true') {
          resolve();
          return;
        }
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener(
          'error',
          () => reject(new Error(`Failed to load script: ${src}`)),
          { once: true }
        );
        return;
      }
      const script = this.document.createElement('script');
      script.src = src;
      script.async = true;

      if (defer) {
        script.defer = true;
      }
      if (id) {
        script.id = id;
      }

      script.onload = () => {
        script.dataset.loaded = 'true';
        script.onload = null;
        script.onerror = null;
        resolve();
      };

      script.onerror = error => {
        script.remove();
        reject(new Error(`Failed to load script: ${src}`, { cause: error }));
      };

      this.document.head.appendChild(script);
    });
  }

  loadStyle(href: string): Promise<void> {
    if (!this.screenService.isPlatformBrowser()) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const existing = this.document.querySelector(
        `link[href="${href}"]`
      ) as HTMLLinkElement | null;
      if (existing) {
        if (existing.dataset?.loaded === 'true') {
          resolve();
          return;
        }
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error(`Failed to load ${href}`)), {
          once: true,
        });
        return;
      }
      const link = this.document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => {
        link.dataset.loaded = 'true';
        resolve();
      };
      link.onerror = () => reject(new Error(`Failed to load ${href}`));
      this.document.head.appendChild(link);
    });
  }

  // Load a UMD script while suppressing AMD's `define` so the bundle falls
  // through to the global-export branch. Needed when Monaco's loader.js has
  // already installed an AMD `define` on the page.
  async loadScriptWithoutAmd(src: string, id?: string, defer?: boolean): Promise<void> {
    const win = window as any;
    const prevDefine = win.define;
    if (prevDefine?.amd) {
      win.define = undefined;
    }
    try {
      await this.loadScript(src, id, defer);
    } finally {
      if (prevDefine?.amd) {
        win.define = prevDefine;
      }
    }
  }

  copy(content: any): void {
    this.clipboard.copy(content);
  }

  async initAnimate(inputs: AnimatableInput, animateEle: HTMLElement, triggerEle: HTMLElement): Promise<void> {
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
              const vars = omitBy(from, value => {
                return isNil(value) || isNaN(value);
              });
              tl.from(animateEle, {
                ...vars,
              });
            }
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
        } else {
          animateEle.classList.remove('aos-item');
          animateEle.removeAttribute('data-aos');
        }
      }
    }
  }

  private getScroller(): HTMLElement | Window {
    const scroller = this.document.getElementById('gsap-scroller');
    if (scroller) {
      return scroller;
    } else {
      return window;
    }
  }

  intersectionObserver(selecter: string, root: Element | Document): void {
    const animateElement = this.doc.querySelectorAll(selecter);
    if (animateElement.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry: any) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
          } else {
            entry.target.classList.remove('aos-animate');
          }
        });
      },
      {
        root,
        threshold: 0.1,
        rootMargin: '70px 0px -100px 0px',
      }
    );

    animateElement.forEach((el: any) => observer.observe(el));
  }
}

type AnimatableInput = IDynamicInputs | {
  type?: string;
  content?: {
    animate?: JsonObject;
  };
  animate?: JsonObject;
};
