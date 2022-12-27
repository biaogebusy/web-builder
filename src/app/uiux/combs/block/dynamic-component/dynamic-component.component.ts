import {
  Component,
  ComponentRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentService } from '@core/service/component.service';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
})
export class DynamicComponentComponent implements OnInit {
  @Input() content: any;

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
      this.content.type
    );
    if (!this.component) {
      return;
    }
    this.component.instance.content = this.content;
    this.container.insert(this.component.hostView);
    this.component.changeDetectorRef.markForCheck();
  }
}
