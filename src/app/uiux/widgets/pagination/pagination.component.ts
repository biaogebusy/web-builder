import {
  ChangeDetectionStrategy,
  Component,
  Input,
  output
} from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PaginationComponent {
  @Input() id: string;
  @Input() maxSize: number;
  readonly pageChange = output<number>();
  readonly pageBoundsCorrection = output<number>();
  constructor() {}


  onPageChange(event: any): any {
    this.pageChange.emit(event);
  }

  onPageBoundsCorrection(event: any): any {
    this.pageBoundsCorrection.emit(event);
  }
}
