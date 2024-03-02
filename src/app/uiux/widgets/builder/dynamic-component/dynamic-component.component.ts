import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { ComponentService } from '@core/service/component.service';
import { BuilderState } from '@core/state/BuilderState';
import { CORE_CONFIG, IS_BUILDER_MODE } from '@core/token/token-providers';
import { isNumber } from 'lodash-es';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScreenService } from '@core/service/screen.service';

export interface dynamicInputs {
  content?: any;
  type?: string;
  [key: string]: any;
}
@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
})
export class DynamicComponentComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy, AfterContentInit
{
  @Input() inputs: dynamicInputs;
  @Input() index: number;
  @Input() isPreview: boolean;
  @HostBinding('class.active-toolbar') activeToolbarClass: boolean;
  @ViewChild('componentContainer', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;
  uuid: string;
  destroy$: Subject<boolean> = new Subject<boolean>();

  public component: ComponentRef<unknown> | ComponentRef<any> | undefined | any;
  constructor(
    private componentService: ComponentService,
    public builder: BuilderState,
    private cd: ChangeDetectorRef,
    private ele: ElementRef,
    private screenService: ScreenService,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(IS_BUILDER_MODE) public isBuilderMode$: Observable<boolean>
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.builder.builderLayoutSetting$
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          const { value, uuid, pageIndex } = data;
          if (this.uuid === uuid) {
            this.inputs = value;
            this.loadComponent();
            if (isNumber(pageIndex)) {
              this.builder.updateComponent(pageIndex, this.inputs);
            }
          }
        });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.inputs.firstChange) {
      this.loadComponent();
    }
  }

  ngAfterContentInit(): void {
    this.isBuilderMode$.pipe(takeUntil(this.destroy$)).subscribe((state) => {
      if (!this.inputs?.showToolbar) {
        this.activeToolbarClass = false;
        return;
      }
      this.activeToolbarClass = state;
    });
  }

  ngAfterViewInit(): void {
    this.loadComponent();
  }

  onUuid(uuid: string): void {
    this.uuid = uuid;
  }

  get showToolbar(): boolean {
    return !!this.coreConfig.builder?.enable && this.inputs?.showToolbar;
  }

  async loadComponent(): Promise<void> {
    const type = this.inputs.type ? this.inputs.type : this.inputs.content.type;
    this.container.clear();
    this.component = await this.componentService.getComponent(type);
    if (!this.component) {
      console.log('无法识别该组件：', this.inputs);
      return;
    }
    if (this.component.instance && this.inputs) {
      if (!this.inputs.type && this.inputs.content) {
        Object.keys(this.inputs).forEach((key) => {
          if (this.component) {
            this.component.instance[key] = this.inputs[key];
          }
        });
      } else {
        this.component.instance['content'] = this.inputs;
      }
      this.component.instance.pageIndex = this.index;
      this.component.instance.uuid = Date.now().toString();
    }
    this.container.insert(this.component.hostView);
    this.initAnimate();
    this.component.changeDetectorRef.markForCheck();
  }

  initAnimate(): void {
    let gsapConfig;
    if (!this.inputs.type && this.inputs.content) {
      if (this.inputs?.content?.animate) {
        gsapConfig = this.inputs.content.animate;
      }
    } else {
      gsapConfig = this.inputs.animate;
    }
    if (gsapConfig) {
      const { trigger, from } = gsapConfig;
      const ele = this.ele.nativeElement.lastElementChild;
      ele.style.display = 'block';
      const tl = window.gsap.timeline({
        scrollTrigger: {
          trigger: this.ele.nativeElement,
          start: trigger?.start || 'top 85%',
          end: trigger?.end || 'bottom 30%',
          markers: trigger?.markers,
          scrub: trigger?.scrub,
          scroller: this.getScroller(),
          toggleActions: 'play none none none',
        },
      });
      if (from) {
        // 从一个状态到当前状态
        tl.from(ele, {
          ...from,
        });
      }
    }
  }

  onFilterChange(state: boolean): void {
    const { children } = this.ele.nativeElement;
    const coponentEle = children[children.length - 1];
    if (state) {
      coponentEle.style.filter = 'blur(8px)';
    } else {
      coponentEle.style.filter = '';
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

  ngOnDestroy(): void {
    this.container.clear();
    if (this.cd && !(this.cd as ViewRef).destroyed) {
      this.cd.detectChanges();
    }
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}
