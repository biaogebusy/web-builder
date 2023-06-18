import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
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
import { ScreenService } from '@core/service/screen.service';
import { BuilderState } from '@core/state/BuilderState';
import { CORE_CONFIG } from '@core/token/token-providers';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @Input() inputs: dynamicInputs;
  @Input() index: number;
  @Input() isPreview: boolean;
  @HostBinding('class.active-toolbar') hostClass = false;
  @ViewChild('componentContainer', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;
  uuid: number;
  destroy$: Subject<boolean> = new Subject<boolean>();

  public component: ComponentRef<unknown> | ComponentRef<any> | undefined | any;
  constructor(
    private componentService: ComponentService,
    public builder: BuilderState,
    private cd: ChangeDetectorRef,
    private screenService: ScreenService,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig
  ) {}

  ngOnInit(): void {
    this.builder.jsoneditorContent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const { content, uuid } = data;
        if (this.uuid === uuid) {
          this.inputs = content;
          this.loadConponent();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.inputs.firstChange) {
      this.loadConponent();
    }
  }

  ngAfterViewInit(): void {
    this.loadConponent();
  }

  onUuid(uuid: number): void {
    this.uuid = uuid;
  }

  get showToolbar(): boolean {
    return !!this.coreConfig.builder?.enable && !this.inputs?.disableToolbar;
  }

  async loadConponent(): Promise<void> {
    const type = this.inputs.type ? this.inputs.type : this.inputs.content.type;
    this.container.clear();
    this.component = await this.componentService.getComponent(type);
    if (!this.component) {
      console.log('无法识别该组件：', this.inputs);
      return;
    }
    if (this.component.instance && this.inputs) {
      if (!this.inputs.type && this.inputs.content) {
        Object.keys(this.inputs).map((key) => {
          if (this.component) {
            this.component.instance[key] = this.inputs[key];
          }
        });
      } else {
        this.component.instance['content'] = this.inputs;
      }
    }
    this.checkBuilder(this.component.instance['content']);
    this.showAnimate(this.component.instance);
    this.container.insert(this.component.hostView);
    this.component.changeDetectorRef.markForCheck();
  }

  checkBuilder(content: any): void {
    if (
      this.coreConfig.builder?.enable &&
      this.inputs.activeToolBar !== false
    ) {
      this.hostClass = true;
    }
  }

  showAnimate(instance: any): void {
    if (this.screenService.isPlatformBrowser()) {
      this.builder.toolbarDisable$
        .pipe(takeUntil(this.destroy$))
        .subscribe((state) => {
          if (state && instance.showAnimate) {
            setTimeout(() => {
              instance.showAnimate();
            }, 1000);
          }
        });
      this.builder.debugeAnimate$
        .pipe(takeUntil(this.destroy$))
        .subscribe((debug) => {
          if (instance.showAnimate) {
            instance.showAnimate(debug);
          }
        });
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
