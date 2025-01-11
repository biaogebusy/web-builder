import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  EnvironmentInjector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  createComponent,
  inject,
} from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { ComponentService } from '@core/service/component.service';
import type { IDynamicInputs } from '@core/interface/IAppConfig';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
})
export class DynamicComponentComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() inputs: IDynamicInputs;
  @Input() index: number; // just for animate count
  @Input() showToolbar = false;
  @ViewChild('componentContainer', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  ele = inject(ElementRef);
  util = inject(UtilitiesService);
  screenService = inject(ScreenService);
  componentService = inject(ComponentService);
  private readonly renderer = inject(Renderer2);
  private readonly environmentInjector = inject(EnvironmentInjector);
  public componentRef: ComponentRef<unknown> | ComponentRef<any> | undefined | any;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    Object.keys(changes).forEach(key => {
      if (!changes[key].firstChange) {
        this.loadComponent();
      }
    });
  }

  ngAfterViewInit(): void {
    this.loadComponent();
  }

  async loadComponent(): Promise<void> {
    if (this.screenService.isPlatformBrowser()) {
      const type = this.inputs.type ?? this.inputs.content?.type ?? null;
      if (!type) {
        return;
      }
      this.container.clear();

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
        this.componentRef.instance.showToolbar = this.showToolbar;
      }

      this.container.insert(this.componentRef.hostView);
      this.componentRef.changeDetectorRef.detectChanges();
      this.util.initAnimate(
        this.inputs,
        this.ele.nativeElement.lastElementChild,
        this.ele.nativeElement,
        this.index
      );
    }
  }

  ngOnDestroy(): void {
    this.container.clear();
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
