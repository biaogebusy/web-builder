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
  @Input() disableToolbar: boolean;
  @HostBinding('class.builder-item') hostClass = false;
  @ViewChild('componentContainer', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  public component: ComponentRef<unknown> | ComponentRef<any> | undefined | any;
  constructor(
    private componentService: ComponentService,
    private userService: UserService,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(USER) private user: IUser
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.inputs.firstChange) {
      this.loadConponent();
    }
  }

  ngAfterViewInit(): void {
    this.loadConponent();
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
    if (
      this.coreConfig.builder?.enable &&
      this.userService.checkShow(content, this.user)
    ) {
      this.hostClass = true;
    }
  }

  ngOnDestroy(): void {
    this.container.clear();
  }
}
