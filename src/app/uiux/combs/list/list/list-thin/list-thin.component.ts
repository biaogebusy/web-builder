import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { ScreenService } from 'src/app/service/screen.service';
declare var window: any;
@Component({
  selector: 'app-list-thin',
  templateUrl: './list-thin.component.html',
  styleUrls: ['./list-thin.component.scss'],
})
export class ListThinComponent implements OnInit, AfterViewInit {
  @Input() content: any;
  @Input() loading: boolean;
  @Input() pager: any;

  @Output() pageChange: EventEmitter<string> = new EventEmitter();
  p = 1;
  constructor(private screenService: ScreenService) {}

  ngOnInit(): void {}

  open(): void {
    window.socialShare('.share-components');
  }

  onPageChange(link: string): void {
    this.pageChange.emit(link);
    this.screenService.gotoTop();
  }
}
