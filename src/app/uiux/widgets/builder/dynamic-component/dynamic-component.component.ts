import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentRef,
  DestroyRef,
  ElementRef,
  EnvironmentInjector,
  Inject,
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
  signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ScreenService } from '@core/service/screen.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UtilitiesService } from '@core/service/utilities.service';
import { ComponentService } from '@core/service/component.service';
import type { IDynamicInputs } from '@core/interface/IAppConfig';
import { IS_BUILDER_MODE } from '@core/token/token-providers';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
})
export class DynamicComponentComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy, AfterContentInit
{
  @Input() inputs: IDynamicInputs;
  @Input() index: number; // just for order
  @ViewChild('componentContainer', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;
  showToolbar = signal(false);

  ele = inject(ElementRef);
  util = inject(UtilitiesService);
  screenService = inject(ScreenService);
  private destroyRef = inject(DestroyRef);
  componentService = inject(ComponentService);
  private readonly renderer = inject(Renderer2);
  private readonly environmentInjector = inject(EnvironmentInjector);
  public componentRef: ComponentRef<unknown> | ComponentRef<any> | undefined | any;
  constructor(@Inject(IS_BUILDER_MODE) public isBuilderMode$: Observable<boolean>) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    Object.keys(changes).forEach(key => {
      if (!changes[key].firstChange) {
        this.loadComponent();
      }
    });
  }

  ngAfterContentInit(): void {
    this.isBuilderMode$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(state => {
      if (state) {
        this.showToolbar.set(true);
      } else {
        this.showToolbar.set(false);
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
        this.componentRef.instance.pageIndex = this.index;
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
