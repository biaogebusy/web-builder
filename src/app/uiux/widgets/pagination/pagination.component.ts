import {
  ChangeDetectionStrategy,
  Component,
  Input,
  output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, NgxPaginationModule],
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
