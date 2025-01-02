import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  DestroyRef,
  ElementRef,
  EnvironmentInjector,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  ViewRef,
  createComponent,
  inject,
  signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenService } from '@core/service/screen.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UtilitiesService } from '@core/service/utilities.service';
import { ComponentService } from '@core/service/component.service';
import type { ICoreConfig, IDynamicInputs } from '@core/interface/IAppConfig';
import { CORE_CONFIG, IS_BUILDER_MODE } from '@core/token/token-providers';

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
  cd = inject(ChangeDetectorRef);
  builder = inject(BuilderState);
  util = inject(UtilitiesService);
  screenService = inject(ScreenService);
  private destroyRef = inject(DestroyRef);
  componentService = inject(ComponentService);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly renderer = inject(Renderer2);
  public componentRef: ComponentRef<unknown> | ComponentRef<any> | undefined | any;
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(IS_BUILDER_MODE) public isBuilderMode$: Observable<boolean>
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.inputs.firstChange) {
      this.loadComponent();
    }
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
    const type = this.inputs.type
      ? this.inputs.type
      : this.inputs.content
        ? this.inputs.content.type
        : null;
    if (!type) {
      return;
    }

    this.container.clear();

    const componentType = await this.componentService.getComponentType(type);
    const hostElement = this.renderer.createElement('div');
    this.componentRef = createComponent(componentType, {
      environmentInjector: this.environmentInjector,
      hostElement,
    });
    if (!componentType) {
      console.log('无法识别该组件：', this.inputs);
      return;
    }
    if (this.componentRef.instance && this.inputs) {
      if (!this.inputs.type && this.inputs.content) {
        Object.keys(this.inputs).forEach(key => {
          if (this.componentRef) {
            this.componentRef.instance[key] = this.inputs[key];
          }
        });
      } else {
        this.componentRef.instance.content = this.inputs;
      }
      this.componentRef.instance.pageIndex = this.index;
    }

    this.container.insert(this.componentRef.hostView);
    this.componentRef.changeDetectorRef.detectChanges();
    if (this.screenService.isPlatformBrowser()) {
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
    if (this.cd && !(this.cd as ViewRef).destroyed) {
      this.cd.detectChanges();
    }
  }
}
