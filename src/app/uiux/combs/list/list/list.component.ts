import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import type { IPaginationLinks } from '@core/interface/widgets/IPaginationLinks';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  @Input() content: any;
  @Input() links: IPaginationLinks;
  @Input() pager: any;
  @Input() loading: boolean;
  @Output() pageChange: EventEmitter<string> = new EventEmitter();
  p = 1;

  constructor(private screenService: ScreenService) {}

  ngOnInit(): void {}

  onPageChange(link: string): void {
    this.pageChange.emit(link);
    this.screenService.gotoTop();
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}
