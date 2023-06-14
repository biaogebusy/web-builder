import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-builder-list',
  templateUrl: './builder-list.component.html',
  styleUrls: ['./builder-list.component.scss'],
})
export class BuilderListComponent implements OnInit {
  @Input() content: any;
  @Input() isPreview: boolean;
  @Output() dropChange: EventEmitter<CdkDragDrop<string[]>> =
    new EventEmitter();
  constructor(public builder: BuilderState) {}

  ngOnInit(): void {}

  trackByFn(index: number): number {
    return index;
  }

  drop(event: CdkDragDrop<string[]>): void {
    this.dropChange.emit(event);
  }
}
