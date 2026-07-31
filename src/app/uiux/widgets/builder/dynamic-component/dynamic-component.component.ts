import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  DoCheck,
  ElementRef,
  OnDestroy,
  OnInit,
  PendingTasks,
  Type,
  afterNextRender,
  afterRenderEffect,
  effect,
  forwardRef,
  inject,
  input,
  reflectComponentType,
  signal,
} from '@angular/core';
import type { IDynamicInputs } from '@core/interface/IAppConfig';
import { ComponentService } from '@core/service/component.service';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { ComponentToolbarComponent } from '@modules/builder/toolbar/component-toolbar/component-toolbar.component';
import { BgImgComponent } from '../../bg-img/bg-img.component';
import { SpacerComponent } from '../../spacer/spacer.component';

interface DynamicRenderState {
  componentType: Type<unknown>;
  inputs: Record<string, unknown>;
  properties: Record<string, unknown>;
  source: IDynamicInputs;
}

@Directive({
  selector: '[appDynamicOutletProperties]',
})
export class DynamicOutletPropertiesDirective implements DoCheck {
  readonly properties = input<Record<string, unknown>>(
    {},
    {
      alias: 'appDynamicOutletProperties',
    }
  );

  private readonly outlet = inject(NgComponentOutlet, { self: true });

  ngDoCheck(): void {
    const instance = this.outlet.componentInstance;
    if (instance) {
      Object.assign(instance as object, this.properties());
    }
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
  imports: [
    NgComponentOutlet,
    DynamicOutletPropertiesDirective,
    SpacerComponent,
    forwardRef(() => ComponentToolbarComponent),
    forwardRef(() => BgImgComponent),
  ],
  host: {
    class: 'relative block',
  },
})
export class DynamicComponentComponent implements OnInit, OnDestroy {
  readonly inputs = input.required<object>();
  readonly renderState = signal<DynamicRenderState | null>(null);
  readonly compContent = signal<IDynamicInputs>({});
  readonly showToolbar = signal(false);

  private readonly ele = inject(ElementRef<HTMLElement>);
  private readonly util = inject(UtilitiesService);
  private readonly screenService = inject(ScreenService);
  private readonly componentService = inject(ComponentService);
  private readonly pendingTasks = inject(PendingTasks);

  private initialized = false;
  private requestVersion = 0;
  private lastProcessedInputs: object | undefined;
  private lastAnimatedState: DynamicRenderState | null = null;
  private appliedContainerClasses: string[] = [];

  constructor() {
    afterNextRender(() => {
      if (this.ele.nativeElement.closest('.component-item')) {
        this.showToolbar.set(true);
      }
    });

    afterRenderEffect(() => {
      const state = this.renderState();
      if (!state || state === this.lastAnimatedState) {
        return;
      }
      this.lastAnimatedState = state;
      this.util.initAnimate(state.source, this.ele.nativeElement, this.ele.nativeElement);
    });

    effect(() => {
      const inputs = this.inputs();
      if (this.initialized && inputs !== this.lastProcessedInputs) {
        this.prepareComponent(inputs);
      }
    });
  }

  ngOnInit(): void {
    this.initialized = true;
    this.prepareComponent(this.inputs());
  }

  ngOnDestroy(): void {
    this.requestVersion++;
  }

  private prepareComponent(inputs: object): void {
    this.lastProcessedInputs = inputs;
    const requestVersion = ++this.requestVersion;
    const inputContent = this.asDynamicInputs(inputs);
    const type = inputContent.type ?? inputContent.content?.type;
    const content = inputContent.type ? inputContent : inputContent.content;

    if (!type || !content) {
      this.renderState.set(null);
      this.compContent.set({});
      return;
    }

    const cachedComponent = this.componentService.getCachedComponentType(type);
    if (cachedComponent) {
      this.commitComponent(cachedComponent, inputContent, content);
      return;
    }

    const taskCleanup = this.screenService.isPlatformBrowser()
      ? undefined
      : this.pendingTasks.add();

    void this.componentService
      .getComponentType(type)
      .then(componentType => {
        if (requestVersion === this.requestVersion) {
          this.commitComponent(componentType, inputContent, content);
        }
      })
      .catch(error => console.error(`Failed to load component type "${type}":`, error))
      .finally(() => taskCleanup?.());
  }

  private commitComponent(
    componentType: Type<unknown>,
    inputContent: IDynamicInputs,
    content: IDynamicInputs
  ): void {
    const values = inputContent.type
      ? { content: inputContent }
      : { ...(inputContent as Record<string, unknown>) };
    const { inputs, properties } = this.partitionInputs(componentType, values);

    this.updateContainerClasses(content.containerClasses);
    this.compContent.set(content);
    this.renderState.set({ componentType, inputs, properties, source: inputContent });
  }

  private partitionInputs(
    componentType: Type<unknown>,
    values: Record<string, unknown>
  ): { inputs: Record<string, unknown>; properties: Record<string, unknown> } {
    const inputNames = new Map<string, string>();
    reflectComponentType(componentType)?.inputs.forEach(componentInput => {
      inputNames.set(componentInput.propName, componentInput.templateName);
      inputNames.set(componentInput.templateName, componentInput.templateName);
    });

    const inputs: Record<string, unknown> = {};
    const properties: Record<string, unknown> = {};
    Object.entries(values).forEach(([key, value]) => {
      const inputName = inputNames.get(key);
      if (inputName) {
        inputs[inputName] = value;
      } else {
        properties[key] = value;
      }
    });
    return { inputs, properties };
  }

  private updateContainerClasses(classes?: string): void {
    if (this.appliedContainerClasses.length > 0) {
      this.ele.nativeElement.classList.remove(...this.appliedContainerClasses);
    }
    this.appliedContainerClasses = classes?.split(' ').filter(Boolean) ?? [];
    if (this.appliedContainerClasses.length > 0) {
      this.ele.nativeElement.classList.add(...this.appliedContainerClasses);
    }
  }

  private asDynamicInputs(value: object): IDynamicInputs {
    return value as IDynamicInputs;
  }
}
