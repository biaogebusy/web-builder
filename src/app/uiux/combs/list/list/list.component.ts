import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() content: any;
  @Input() links: any;
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
}
