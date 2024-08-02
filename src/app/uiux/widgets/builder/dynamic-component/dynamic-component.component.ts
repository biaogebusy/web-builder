import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  DestroyRef,
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
  inject,
} from '@angular/core';
import type { ICoreConfig, IDynamicInputs } from '@core/interface/IAppConfig';
import { ComponentService } from '@core/service/component.service';
import { BuilderState } from '@core/state/BuilderState';
import { CORE_CONFIG, IS_BUILDER_MODE } from '@core/token/token-providers';
import { Observable } from 'rxjs';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
})
export class DynamicComponentComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy, AfterContentInit
{
  @Input() inputs: IDynamicInputs;
  @Input() index: number;
  @Input() isPreview: boolean;
  @HostBinding('class.active-toolbar') activeToolbarClass: boolean;
  @ViewChild('componentContainer', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;
  showToolbar: boolean;

  ele = inject(ElementRef);
  cd = inject(ChangeDetectorRef);
  builder = inject(BuilderState);
  util = inject(UtilitiesService);
  screenService = inject(ScreenService);
  private destroyRef = inject(DestroyRef);
  componentService = inject(ComponentService);
  public component: ComponentRef<unknown> | ComponentRef<any> | undefined | any;
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(IS_BUILDER_MODE) public isBuilderMode$: Observable<boolean>,
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.showToolbar =
        !!this.coreConfig.builder?.enable && this.inputs?.showToolbar;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.inputs.firstChange) {
      this.loadComponent();
    }
  }

  ngAfterContentInit(): void {
    this.isBuilderMode$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
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

  async loadComponent(): Promise<void> {
    const type = this.inputs.type ? this.inputs.type : this.inputs.content.type;
    this.container.clear();
    this.container.remove();
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
        this.component.instance.content = this.inputs;
      }
      this.component.instance.pageIndex = this.index;
    }
    this.container.insert(this.component.hostView);
    this.util.initAnimate(
      this.inputs,
      this.ele.nativeElement.lastElementChild,
      this.ele.nativeElement,
    );
    this.component.changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
    this.container.clear();
    this.container.remove();
    if (this.cd && !(this.cd as ViewRef).destroyed) {
      this.cd.detectChanges();
    }
  }
}
