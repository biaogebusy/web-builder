import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit, AfterViewInit {
  @Input() content: any;
  @Output() treeChange = new EventEmitter();
  @ViewChild('tree') tree: any;

  // https://angular2-tree.readme.io/docs/getting-started
  default = {
    idField: 'value',
    displayField: 'label',
    childrenField: 'elements',
  };
  options: any;
  constructor(private screenService: ScreenService) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.options = Object.assign(this.default, this.content.options);
    }
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.content.expandAll) {
        this.tree.treeModel.expandAll();
      }
    }
  }

  onActivate(event: any): void {
    const obj: any = {};
    obj[`${this.content.key}`] = event.node.id;
    obj.page = 0;
    this.treeChange.emit(obj);
  }
}
