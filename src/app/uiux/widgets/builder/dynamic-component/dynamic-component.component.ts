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
  ViewContainerRef,
  afterNextRender,
  createComponent,
  effect,
  forwardRef,
  inject,
  input,
  signal,
  untracked,
  ChangeDetectionStrategy,
  Type,
  viewChild,
} from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { ComponentService } from '@core/service/component.service';
import type { IDynamicInputs } from '@core/interface/IAppConfig';
import { SpacerComponent } from '../../spacer/spacer.component';
import { ComponentToolbarComponent } from '../component-toolbar/component-toolbar.component';
import { BgImgComponent } from '../../bg-img/bg-img.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
  imports: [
    SpacerComponent,
    forwardRef(() => ComponentToolbarComponent),
    forwardRef(() => BgImgComponent),
  ],
  host: {
    ngSkipHydration: 'true',
    class: 'relative block',
  },
})
export class DynamicComponentComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly inputs = input.required<object>();
  private readonly container = viewChild('componentContainer', { read: ViewContainerRef });

  private ele = inject(ElementRef);
  public showToolbar = signal(false);
  private util = inject(UtilitiesService);
  private screenService = inject(ScreenService);
  private componentService = inject(ComponentService);
  private readonly renderer = inject(Renderer2);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly pendingTasks = inject(PendingTasks);
  public componentRef: ComponentRef<unknown> | undefined;
  public compContent = signal<IDynamicInputs>({});

  private initialized = false;
  private lastLoadedType: string | null = null;

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
    const inputs = this.asDynamicInputs(this.inputs());
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
      const inputContent = this.asDynamicInputs(inputs);
      const type = inputContent.type ?? inputContent.content?.type ?? null;
      if (!type) {
        return;
      }
      const content = inputContent.type ? inputContent : inputContent.content;
      if (!content) {
        return;
      }

      if (type === this.lastLoadedType && this.componentRef?.instance) {
        this.compContent.set(content);
        const declaredInputs = this.getDeclaredInputs(this.componentRef.componentType);
        const trySet = (key: string, val: unknown) => {
          if (Object.prototype.hasOwnProperty.call(declaredInputs, key)) {
            this.componentRef!.setInput(key, val);
          } else {
            Object.assign(this.componentRef!.instance as object, { [key]: val });
          }
        };
        if (!inputContent.type && inputContent.content) {
          const inputRecord = inputContent as Record<string, unknown>;
          Object.keys(inputContent).forEach(key => trySet(key, inputRecord[key]));
        } else {
          trySet('content', inputContent);
        }
        this.componentRef.changeDetectorRef.detectChanges();
        return;
      }

      this.container()!.clear();
      this.compContent.set(content);
      if (content.containerClasses) {
        const classes = content.containerClasses.split(' ');
        this.ele.nativeElement.classList.add(...classes);
      }

      let componentType: Type<unknown>;
      try {
        componentType = await this.componentService.getComponentType(type);
      } catch (error) {
        console.error(`Failed to load component type "${type}":`, error);
        // Render fallback or skip silently to prevent SSR crash
        return;
      }

      if (!componentType) {
        console.error('无法识别该组件：', inputs);
        return;
      }
      const hostElement = this.renderer.createElement('div');
      const componentRef = createComponent(componentType, {
        environmentInjector: this.environmentInjector,
        hostElement,
      });
      this.componentRef = componentRef;
      this.lastLoadedType = type;
      if (componentRef.instance) {
        // 读取组件声明的 inputs（Angular 内部元信息）以避免触发 NG0303
        const declaredInputs = this.getDeclaredInputs(componentType);
        const trySet = (key: string, value: unknown) => {
          if (Object.prototype.hasOwnProperty.call(declaredInputs, key)) {
            componentRef.setInput(key, value);
          } else {
            // 不是声明的 input，回退到直接赋值（用于普通属性或外部 Subject 之类）
            Object.assign(componentRef.instance as object, { [key]: value });
          }
        };
        if (!inputContent.type && inputContent.content) {
          const inputRecord = inputContent as Record<string, unknown>;
          Object.keys(inputContent).forEach(key => {
            trySet(key, inputRecord[key]);
          });
        } else {
          trySet('content', inputContent);
        }
      }

      this.container()!.insert(componentRef.hostView);
      componentRef.changeDetectorRef.detectChanges();
      if (this.screenService.isPlatformBrowser()) {
        this.util.initAnimate(inputContent, this.ele.nativeElement, this.ele.nativeElement);
      }
    } catch (error) {
      console.error('Error loading dynamic component:', error);
      // Ensure we don't crash the entire SSR render
    }
  }

  ngOnDestroy(): void {
    this.container()?.clear();
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  private getDeclaredInputs(componentType: Type<unknown>): Record<string, unknown> {
    const componentDef = componentType as Type<unknown> & {
      ɵcmp?: {
        inputs?: Record<string, unknown>;
      };
    };
    return componentDef.ɵcmp?.inputs ?? {};
  }

  private asDynamicInputs(value: object): IDynamicInputs {
    return value as IDynamicInputs;
  }
}
