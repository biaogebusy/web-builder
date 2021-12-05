import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
@Component({
  selector: 'app-list-thin',
  templateUrl: './list-thin.component.html',
  styleUrls: ['./list-thin.component.scss'],
})
export class ListThinComponent implements OnInit {
  @Input() content: any;
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
    return index;
  }
}
