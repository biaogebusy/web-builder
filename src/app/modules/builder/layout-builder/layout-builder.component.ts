import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import type { ILayoutBlock, ILayoutBuilder } from '@core/interface/IBuilder';
import { IS_BUILDER_MODE } from '@core/token/token-providers';
import { Observable } from 'rxjs';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderService } from '@core/service/builder.service';

@Component({
  selector: 'app-layout-builder',
  templateUrl: './layout-builder.component.html',
  styleUrls: ['./layout-builder.component.scss'],
})
export class LayoutBuilderComponent implements OnInit, AfterViewInit {
  @Input() content: ILayoutBuilder;
  @Input() pageIndex: number;
  @Input() uuid: string;

  util = inject(UtilitiesService);
  ele = inject(ElementRef);
  builderSerivce = inject(BuilderService);
  constructor(
    @Inject(IS_BUILDER_MODE) public isBuilderMode$: Observable<boolean>,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.layoutAnimate();
  }

  addBlock(addType: string, content: any, target: any): void {
    this.builderSerivce.addBlock(addType, content, target);
  }

  layoutAnimate(): void {
    this.content.elements.map((item: ILayoutBlock, index) => {
      if (item.animate) {
        const animateEle = this.ele.nativeElement.querySelectorAll(
          `.layout-${index} .for-animate`,
        )[0];
        this.util.initAnimate(item, animateEle, this.ele.nativeElement);
      }
    });
  }
}
