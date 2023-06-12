import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-drag-preview',
  templateUrl: './drag-preview.component.html',
  styleUrls: ['./drag-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragPreviewComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
