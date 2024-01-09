import {
  AfterContentInit,
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
import { BuilderState } from '@core/state/BuilderState';
import {
  CORE_CONFIG,
  ENABLE_BUILDER_TOOLBAR,
} from '@core/token/token-providers';
import { Observable, Subject } from 'rxjs';
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
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(ENABLE_BUILDER_TOOLBAR) public enable_toolbar$: Observable<boolean>
  ) {}

  ngOnInit(): void {
    this.builder.jsoneditorContent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const { content, uuid } = data;
        if (this.uuid === uuid) {
          this.inputs = content;
          this.loadComponent();
        }
      });

    this.builder.builderLayoutSetting$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const { value, uuid, index } = data;
        if (this.uuid === uuid) {
          console.log(data);
          let bgColor = {};
          if (value.bgColor) {
            bgColor = {
              bg: {
                classes: value.bgColor,
              },
            };
            delete value.bgColor;
          }
          this.inputs = { ...this.inputs.content, ...value, ...bgColor };
          this.loadComponent();
          this.builder.updateComponent(index, this.inputs);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.inputs.firstChange) {
      this.loadComponent();
    }
  }

  ngAfterContentInit(): void {
    this.enable_toolbar$.pipe(takeUntil(this.destroy$)).subscribe((state) => {
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
    this.component.changeDetectorRef.markForCheck();
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
