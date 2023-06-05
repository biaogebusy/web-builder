import {
  Component,
  ComponentRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentService } from '@core/service/component.service';
import { ContentState } from '@core/state/ContentState';
import { UtilitiesService } from '@core/service/utilities.service';

export interface dynamicInputs {
  content?: any;
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
  @Input() isBuilder: boolean;
  @ViewChild('componentContainer', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  public component: ComponentRef<unknown> | ComponentRef<any> | undefined | any;
  constructor(
    private componentService: ComponentService,
    private contentState: ContentState,
    private util: UtilitiesService
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
    this.container.insert(this.component.hostView);
    this.component.changeDetectorRef.markForCheck();
  }

  addComponent(content: any): any {
    this.contentState.addComponent(content);
    this.util.openSnackbar(`已添加${content.type}到构建页面！`, 'ok');
  }

  onDelete(index: number): void {
    this.contentState.deleteComponent(index);
    this.util.openSnackbar(`已在构建页面移除组件！`, 'ok');
  }

  onCopy(content: any): void {
    this.util.copy(JSON.stringify(content));
    this.util.openSnackbar(`已复制${content.type}的JSON！`, 'ok');
  }

  ngOnDestroy(): void {
    this.container.clear();
  }
}
