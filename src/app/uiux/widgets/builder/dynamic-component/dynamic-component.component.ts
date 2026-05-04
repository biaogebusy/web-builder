import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  EnvironmentInjector,
  OnDestroy,
  OnInit,
  PendingTasks,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  afterNextRender,
  createComponent,
  effect,
  inject,
  input,
  signal,
  untracked,
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
    class: 'relative block',
  },
})
export class DynamicComponentComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly inputs = input<IDynamicInputs>();
  @ViewChild('componentContainer', { read: ViewContainerRef, static: true })
  private container: ViewContainerRef;

  private ele = inject(ElementRef);
  public showToolbar = signal(false);
  private util = inject(UtilitiesService);
  private screenService = inject(ScreenService);
  private componentService = inject(ComponentService);
  private readonly renderer = inject(Renderer2);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly pendingTasks = inject(PendingTasks);
  public componentRef: ComponentRef<unknown> | ComponentRef<any> | undefined | any;
  public compContent = signal<any>({});

  private initialized = false;

  constructor() {
    afterNextRender(() => {
      this.initialized = true;
      this.loadComponent();
      if (this.ele.nativeElement.closest('.component-item')) {
        this.showToolbar.set(true);
      }
    });

    effect(() => {
      this.inputs();
      if (this.initialized) {
        untracked(() => this.loadComponent());
      }
    });
  }

  ngOnInit(): void {
    const inputs = this.inputs();
    if (inputs) {
      const content = inputs.type ? inputs : inputs.content;
      if (content) {
        this.compContent.set(content);
      }
    }
  }

  ngAfterViewInit(): void {
    if (!this.screenService.isPlatformBrowser()) {
      const taskCleanup = this.pendingTasks.add();
      this.loadComponent().finally(() => taskCleanup());
      if (this.ele.nativeElement.closest('.component-item')) {
        this.showToolbar.set(true);
      }
    }
  }

  async loadComponent(): Promise<void> {
    try {
      const inputs = this.inputs();
      if (!inputs) {
        return;
      }
      const type = inputs.type ?? inputs.content?.type ?? null;
      if (!type) {
        return;
      }
      const content = inputs.type ? inputs : inputs.content;
      this.container.clear();
      this.compContent.set(content);
      if (content.containerClasses) {
        const classes = content.containerClasses.split(' ');
        this.ele.nativeElement.classList.add(...classes);
      }

      const componentType = await this.componentService.getComponentType(type);
      if (!componentType) {
        console.log('无法识别该组件：', inputs);
        return;
      }
      const hostElement = this.renderer.createElement('div');
      this.componentRef = createComponent(componentType, {
        environmentInjector: this.environmentInjector,
        hostElement,
      });
      if (this.componentRef?.instance) {
        // 读取组件声明的 inputs（Angular 内部元信息）以避免触发 NG0303
        const declaredInputs: Record<string, unknown> =
          (componentType as any)?.ɵcmp?.inputs ?? {};
        const trySet = (key: string, value: any) => {
          if (Object.prototype.hasOwnProperty.call(declaredInputs, key)) {
            this.componentRef.setInput(key, value);
          } else {
            // 不是声明的 input，回退到直接赋值（用于普通属性或外部 Subject 之类）
            this.componentRef.instance[key] = value;
          }
        };
        if (!inputs.type && inputs.content) {
          Object.keys(inputs).forEach(key => {
            trySet(key, (inputs as any)[key]);
          });
        } else {
          trySet('content', inputs);
        }
      }

      this.container.insert(this.componentRef.hostView);
      this.componentRef.changeDetectorRef.detectChanges();
      if (this.screenService.isPlatformBrowser()) {
        this.util.initAnimate(inputs, this.ele.nativeElement, this.ele.nativeElement);
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
