import {
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
} from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
import { ComponentService } from '@core/service/component.service';
import { UserService } from '@core/service/user.service';
import { ContentState } from '@core/state/ContentState';
import { CORE_CONFIG, USER } from '@core/token/token-providers';

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
export class DynamicComponentComponent implements OnInit, OnChanges, OnDestroy {
  @Input() inputs: dynamicInputs;
  @Input() index: number;
  @Input() isPreview: boolean;
  @Input() activeToolBar = true;
  @HostBinding('class.active-toolbar') hostClass = false;
  @ViewChild('componentContainer', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;
  uuid: number;

  public component: ComponentRef<unknown> | ComponentRef<any> | undefined | any;
  constructor(
    private componentService: ComponentService,
    private contentState: ContentState,
    private userService: UserService,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(USER) private user: IUser
  ) {}

  ngOnInit(): void {
    this.contentState.jsoneditorContent$.subscribe((data) => {
      const { index, content, uuid } = data;
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

  async loadConponent(): Promise<void> {
    const type = this.inputs.type ? this.inputs.type : this.inputs.content.type;
    this.container.clear();
    this.component = await this.componentService.getComponent(type);
    if (!this.component) {
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
    this.container.insert(this.component.hostView);
    this.component.changeDetectorRef.markForCheck();
  }

  checkBuilder(content: any): void {
    if (this.coreConfig.builder?.enable && this.activeToolBar) {
      this.hostClass = true;
    }
  }

  ngOnDestroy(): void {
    this.container.clear();
  }
}
