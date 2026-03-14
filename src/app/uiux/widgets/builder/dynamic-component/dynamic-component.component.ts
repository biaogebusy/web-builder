import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  EnvironmentInjector,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  afterNextRender,
  createComponent,
  inject,
  signal,
} from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { ComponentService } from '@core/service/component.service';
import type { IDynamicInputs } from '@core/interface/IAppConfig';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
  standalone: false,
  host: {
    ngSkipHydration: 'true',
  },
})
export class DynamicComponentComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() inputs: IDynamicInputs;
  @ViewChild('componentContainer', { read: ViewContainerRef, static: true })
  private container: ViewContainerRef;

  private ele = inject(ElementRef);
  public showToolbar = signal(false);
  private util = inject(UtilitiesService);
  private screenService = inject(ScreenService);
  private componentService = inject(ComponentService);
  private readonly renderer = inject(Renderer2);
  private readonly environmentInjector = inject(EnvironmentInjector);
  public componentRef: ComponentRef<unknown> | ComponentRef<any> | undefined | any;
  public compContent = signal<any>({});
  @HostBinding('class.relative') relative = true;
  @HostBinding('class.block') block = true;

  private initialized = false;

  constructor() {
    // 浏览器端：在首次渲染完成后再加载动态组件，
    // 避免与 SSR hydration 冲突导致组件渲染两次
    afterNextRender(() => {
      this.initialized = true;
      this.loadComponent();
      if (this.ele.nativeElement.closest('.component-item')) {
        this.showToolbar.set(true);
      }
    });
  }

  ngOnInit(): void {
    // 提前设置 compContent，让模板中 @if 块在客户端首帧就能正确渲染
    if (this.inputs) {
      const content = this.inputs.type ? this.inputs : this.inputs.content;
      if (content) {
        this.compContent.set(content);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    Object.keys(changes).forEach(key => {
      if (!changes[key].firstChange && this.initialized) {
        this.loadComponent();
      }
    });
  }

  ngAfterViewInit(): void {
    // 仅服务端执行：生成 SSR HTML
    if (!this.screenService.isPlatformBrowser()) {
      this.loadComponent();
      if (this.ele.nativeElement.closest('.component-item')) {
        this.showToolbar.set(true);
      }
    }
  }

  async loadComponent(): Promise<void> {
    try {
      const type = this.inputs.type ?? this.inputs.content?.type ?? null;
      if (!type) {
        return;
      }
      const content = this.inputs.type ? this.inputs : this.inputs.content;
      this.container.clear();
      this.compContent.set(content);
      if (content.containerClasses) {
        const classes = content.containerClasses.split(' ');
        this.ele.nativeElement.classList.add(...classes);
      }

      const componentType = await this.componentService.getComponentType(type);
      if (!componentType) {
        console.log('无法识别该组件：', this.inputs);
        return;
      }
      const hostElement = this.renderer.createElement('div');
      this.componentRef = createComponent(componentType, {
        environmentInjector: this.environmentInjector,
        hostElement,
      });
      if (this.componentRef?.instance && this.inputs) {
        if (!this.inputs.type && this.inputs.content) {
          Object.keys(this.inputs).forEach(key => {
            this.componentRef.instance[key] = this.inputs[key];
          });
        } else {
          this.componentRef.instance.content = this.inputs;
        }
      }

      this.container.insert(this.componentRef.hostView);
      this.componentRef.changeDetectorRef.detectChanges();
      if (this.screenService.isPlatformBrowser()) {
        this.util.initAnimate(this.inputs, this.ele.nativeElement, this.ele.nativeElement);
      }
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    this.container.clear();
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
