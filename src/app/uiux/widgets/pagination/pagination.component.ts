import { FormGroup } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();
  @Output() pageBoundsCorrection: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onPageChange(event: any): any {
    this.pageChange.emit(event);
  }

  onPageBoundsCorrection(event: any): any {
    this.pageBoundsCorrection.emit(event);
  }
}
