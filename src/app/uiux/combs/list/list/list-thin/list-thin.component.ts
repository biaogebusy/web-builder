import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import type { IListThin } from '@core/interface/combs/IList';
import { ScreenService } from '@core/service/screen.service';
@Component({
  selector: 'app-list-thin',
  templateUrl: './list-thin.component.html',
  styleUrls: ['./list-thin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListThinComponent implements OnInit {
  @Input() content: IListThin[];
  @Input() loading: boolean;
  @Input() pager: any;

  @Output() pageChange: EventEmitter<string> = new EventEmitter();
  p = 1;
  constructor(private screenService: ScreenService) {}

  ngOnInit(): void {}

  onPageChange(link: string): void {
    this.pageChange.emit(link);
    this.screenService.gotoTop();
  }

  trackByFn(index: number, item: any): number {
    return item.link.href;
  }
}
