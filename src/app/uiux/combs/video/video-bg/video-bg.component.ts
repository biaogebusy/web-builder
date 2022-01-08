import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
@Component({
  selector: 'app-video-bg',
  templateUrl: './video-bg.component.html',
  styleUrls: ['./video-bg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoBgComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() content: any;

  constructor(private screenService: ScreenService) {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
    }
  }

  ngOnDestroy(): void {}
}
