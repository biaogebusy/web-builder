import {
  Component,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentService } from '@core/service/component.service';
export interface dynamicInputs {
  content: any;
  [key: string]: any;
}
@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
})
export class DynamicComponentComponent implements OnInit, OnDestroy {
  @Input() inputs: dynamicInputs;
  @ViewChild('componentContainer', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  public component: ComponentRef<unknown> | ComponentRef<any> | undefined;
  constructor(private componentService: ComponentService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadConponent();
  }

  async loadConponent(): Promise<void> {
    this.container.clear();
    this.component = await this.componentService.getComponent(
      this.inputs.content.type
    );
    if (!this.component) {
      return;
    }
    if (this.component.instance && this.inputs) {
      Object.keys(this.inputs).map((key) => {
        if (this.component) {
          this.component.instance[key] = this.inputs[key];
        }
      });
    }
    this.container.insert(this.component.hostView);
    this.component.changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
    this.container.clear();
  }
}
